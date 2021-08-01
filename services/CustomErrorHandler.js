class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.message = msg;
    this.status = status
  }
  
  static alreadyExists(message) {
    return new CustomErrorHandler(409, message)
  }
  static invalidCredentials(message='User or Password is Wrong.') {
    return new CustomErrorHandler(401, message)
  }
  static unAuthorization(message="Access Denied") {
    return new CustomErrorHandler(401, message)
  }
  static serverError(message="Internal Server Error") {
    return new CustomErrorHandler(500, message)
  }
  static notAllow(message="Not allow") {
    return new CustomErrorHandler(405, message)
  }
}

export default CustomErrorHandler