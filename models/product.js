import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const productSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)