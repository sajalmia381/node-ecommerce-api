import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const authorizationHandler = (req, res, next) => {
  const headerAuthorization = req.headers.authorization;
  if (!headerAuthorization) {
    return next(CustomErrorHandler.unAuthorization())
  }
  const token = headerAuthorization.split(' ')[1]
  try {
    const { _id, name, email, role } = JwtService.verify(token);
    const user = { _id, name, email, role }
    req.user = user;
    return next()
  } catch (err) {
    return next(CustomErrorHandler.unAuthorization())
  }
}

export default authorizationHandler