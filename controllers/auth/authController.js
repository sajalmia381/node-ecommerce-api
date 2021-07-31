import Joi from 'joi';
import { RefreshToken } from '../../models';

const authController = {
  logout: async (req, res, next) => {
    const logoutSchema = Joi.object({
      refresh_token: Joi.string().required()
    })
    const { error } = logoutSchema.validate({refresh_token: req.body.refresh_token})
    if (error) {
      return next(error)
    }
    
    try {
      await RefreshToken.deleteOne({token: req.body.refresh_token})
    } catch (err) {
      return next(new Error("Some thing is wrong in database"))
    }
    res.status(200).json({status: 200, message: "Logout success"})
  }
}

export default authController