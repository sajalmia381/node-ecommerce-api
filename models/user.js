import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const userSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, default: 'ROLE_CUSTOMER' }
}, { timestamps: true })

export default mongoose.model('User', userSchema, 'users') // User: Model name, users: database table name