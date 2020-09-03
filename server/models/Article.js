const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	categories: [{type: mongoose.SchemaTypes.ObjectID, ref: 'Category'}],/* 分类 */
	title: {type: String},
	body: {type: String},/* 详情 */
},{
	timestamps: true,
})

module.exports = mongoose.model('Article', schema)