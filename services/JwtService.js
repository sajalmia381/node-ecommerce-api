import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

class JwtService {
  static sign(payload, expiry = '60s', secret=SECRET_KEY) {
    return jwt.sign(payload, secret, { expiresIn: expiry })
  }
  static verify(token, secret=SECRET_KEY) {
    return jwt.verify(token, secret)
  }
}

export default JwtService