import { User } from "../models"
import CustomErrorHandler from "../services/CustomErrorHandler"

const userController = {
  userList: async (req, res, next) => {
    let users;
    try{
      users = await User.find().select("-password -__v")
    } catch(err) {
      return next(CustomErrorHandler.serverError())
    }
    return res.json({data: users})
  },
  singleUser: (req, res, next) => {
    
  },
  updateUser: (req, res, next) => {
    
  }
}

export default userController