import { ValidationError } from 'joi';
import { DEBUG_MODE } from '../config';
import CustomErrorHandler from '../services/CustomErrorHandler';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    status: statusCode,
    message: 'Internal server error',
    ...(DEBUG_MODE === 'true' && {originalError: err.message} )
  }
  if (err instanceof ValidationError){
    statusCode = 422;
    data = {
      status: statusCode,
      message: err.message,
    }
  }
  if(err instanceof CustomErrorHandler) {
    statusCode = err.status
    data = {
      status: statusCode,
      message: err.message
    }
  }
  res.status(statusCode).json(data);
}

export default errorHandler