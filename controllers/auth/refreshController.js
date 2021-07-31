import Joi from 'joi';
import { REFRESH_KEY } from '../../config';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';

const refreshController = async (req, res, next) => {
  
  const tokenSchema = Joi.object({
    refresh_token: Joi.string().required()
  })
  const { error } = tokenSchema.validate(req.body)
  if (error) {
    return next(error)
  }
  
  try {
    const refreshTokenObj = await RefreshToken.findOne({ token: req.body.refresh_token });
    if (!refreshTokenObj) {
      return next(CustomErrorHandler.unAuthorization('Invalid refresh token'))
    }
    let userId;
    try {
      const { _id } = JwtService.verify(refreshTokenObj.token, REFRESH_KEY);
      console.log(_id)
      userId = _id
    } catch (err) {
      return next(CustomErrorHandler.unAuthorization('Invalid refresh token'))
    }
    
    const user = await User.findOne({_id: userId }).select("-password -updatedAt -__v")
    
    if (!user) {
      return next(CustomErrorHandler.unAuthorization('No user found!'))
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    const access_token = JwtService.sign(payload);
    const refresh_token = JwtService.sign(payload, '30d', REFRESH_KEY)
    await RefreshToken.create({token: refresh_token})
    
    res.status(201).json({ access_token, refresh_token })
  } catch (err) {
    return next(CustomErrorHandler.serverError())
  }
}

export default refreshController