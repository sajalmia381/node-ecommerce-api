import CustomErrorHandler from "../services/CustomErrorHandler";

const superAdmin = (req, res, next) => {
  const user = req.user;
  console.log(user)
  if (user.role !== 'ROLE_SUPER_ADMIN') {
    return next(CustomErrorHandler.notAllow('Your role is not allow'))
  }
  next()
}

export default superAdmin