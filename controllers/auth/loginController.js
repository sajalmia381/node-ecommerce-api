import Joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../../models';

import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';

const loginController = {
  login: async (req, res, next) => {
    // Start request validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error)
    }
    // End request validation
    
    // Start database query
    try {
      const user = await User.findOne({email: req.body.email});
      if (!user) {
        return next(CustomErrorHandler.invalidCredentials());
      }
      
      // Check password
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordMatch) {
        return next(CustomErrorHandler.invalidCredentials('Your password is wrong'));
      }
      
      // Generate token
      
      const access_token = JwtService.sign({_id: user._id, role: user.role, email: user.email});
      const responseData = {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      }
      res.json({access_token, user: responseData })
      res.end();
    } catch (err) {
      return next(err)
    }
  }
}

export default loginController