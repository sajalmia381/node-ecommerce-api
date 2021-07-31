import Joi from 'joi';
import bcrypt from 'bcrypt';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { REFRESH_KEY } from '../../config';

const registerController = {
    register: async (req, res, next) => {
        const registerSchema = Joi.object({
            name: Joi.string().min(4).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            password_repeat: Joi.ref('password')
        })
        const { error } = registerSchema.validate(req.body);
        
        if (error) {
            return next(error)
        }
        // Check database user exists
        try {
            const isUserExists = await User.exists({ email: req.body.email })
            if (isUserExists) {
                return next(CustomErrorHandler.alreadyExists('This email is already taken'))
            }
        } catch (err) {
            return next(err)
        }
        
        // prepare model
        const { name, email, password } = req.body;
        
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);
    
        const user = new User({
            name,
            email,
            password: hashPassword
        })
        
        let access_token;
        let refresh_token;
        try{
            const obj = await user.save()
            const payload = {_id: obj._id, role: obj.role, email: obj.email};
            console.log(payload)
            // JsonWebToken
            access_token = JwtService.sign(payload);
            refresh_token = JwtService.sign(payload, '30d', REFRESH_KEY);
            await RefreshToken.create({ token: refresh_token });
            res.status(201).json({access_token, refresh_token});
        } catch (err) {
            return next(err)
        }
        
    }
}

export default registerController