import Joi from 'joi';

let productList = [
	{
			id: 1,
			title: 'This is product title one'
	},
	{
		id: 2,
		title: 'This is product title two'
	},
	{
		id: 3,
		title: 'This is product title three'
	}
]

const productController = {
	productList: (req, res, next) => {
		res.status(200).json(productList);
		res.end();
	},
	
	productCreate: (req, res, next) => {
		const productSchema = Joi.object({
			title: Joi.string().min(30).max(300).required(),
			description: Joi.string(),
		});
		const { error } = productSchema.validate(req.body);
		if (error) {
			console.log("err", error)
			return next(error);
		}
		const ids = productList.map(item => item.id);
		const maxProductId = Math.max(ids)
		console.log(ids, maxProductId)
		res.status(201)
		res.json({})
	},
	
	productDetails: (req, res, next) => {
		const id = Number(req.params.id);
		const product = productList.find((obj => {
			return obj.id === id
		}))
		if (product) {
			console.log(product)
			res.status(200)
			res.json(product)
			return
		}
		res.status(404)
		res.end()
	},
	
}

export default productController