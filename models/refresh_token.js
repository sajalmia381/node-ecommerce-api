import mongoose from 'mongoose';


const refreshSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true}
})

export default mongoose.model('RefreshToken', refreshSchema);