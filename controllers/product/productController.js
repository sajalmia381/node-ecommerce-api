import Joi from 'joi';
import multer from 'multer';

import path from 'path';
import fs from 'fs';

import CustomErrorHandler from '../../services/CustomErrorHandler';
import { Product } from '../../models';


const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
		const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`; // 1e3 = 1000000
    cb(null, fileName)
  }
})
const handleMultiPartData = multer({
	storage,
	limits: {fileSize: 1000000 * 10}
}).single('image') // image is field name


const productController = {
	productList: async (req, res, next) => {
		try {
			const products = await Product.find()
			res.json({ status: 200, data: products})
		} catch (err) {
			return next(CustomErrorHandler.serverError())
		}
	},
	
	productCreate: (req, res, next) => {
		handleMultiPartData(req, res, async (err) => {
			if (err) {
				console.log("handleMultipartData cb,", err)
				return next(CustomErrorHandler.serverError(err.message))
			}
			console.log(req.file)
			let filePath;
			if (req.file) {
				filePath = req.file.path;
			}
			
			const productSchema = Joi.object({
				title: Joi.string().max(300).required(),
				price: Joi.number().required(),
				description: Joi.string(),
				category: Joi.string().required(),
			});
			const { error } = productSchema.validate(req.body);
			if (error) {
				if (filePath) {
					fs.unlink(`${appRoot}/${filePath}`, (err) => {
						console.log('Unlink error')
						return next(CustomErrorHandler.serverError(err.message))
					})
				}
				return next(error);
			}
			const { title, price, category, description } = req.body;
			console.log(filePath)
			try {
				const productDoc = await Product.create({
					title,
					price,
					category,
					description: description || null,
					image: filePath || null
				})
				res.status(201).json({status: 201, data: productDoc._doc })
			} catch (err) {
				return next(err)
			}
		})

	},
	
	productDetails: (req, res, next) => {
		
	},
	
}

export default productController