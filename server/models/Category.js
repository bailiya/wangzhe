const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: {type: String},
	parent: {type: mongoose.SchemaTypes.ObjectID, ref: 'Category'}
})


schema.virtual('children', {
	localField: '_id',//本身的键
	foreignField: 'parent',//外键
	justOne: false,
	ref: 'Category'
})

schema.virtual('newsList', {
	localField: '_id',
	foreignField: 'categories',
	justOne: false,
	ref: 'Article'
})


module.exports = mongoose.model('Category', schema)