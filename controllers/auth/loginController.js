import Joi from 'joi';
import bcrypt from 'bcrypt';
import { RefreshToken, User } from '../../models';

import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { REFRESH_KEY } from '../../config';

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
      const user = await User.findOne({email: req.body.email}).select("-updateAt -__v");
      if (!user) {
        return next(CustomErrorHandler.invalidCredentials());
      }
      
      // Check password
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordMatch) {
        return next(CustomErrorHandler.invalidCredentials('Your password is wrong'));
      }
      
      // Generate token
      const payload = {_id: user._id, role: user.role, email: user.email}
      const access_token = JwtService.sign(payload);
      const refresh_token = JwtService.sign(payload, '30d', REFRESH_KEY)
      await RefreshToken.create({ token: refresh_token });
      res.json({access_token, refresh_token, user: user })
      res.end();
    } catch (err) {
      return next(err)
    }
  }
}

export default loginController