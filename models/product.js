import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const productSchema = new Schema({
  title: {type: String, required: true}
}, { timestamps: true})

export default mongoose.model('Product', productSchema)