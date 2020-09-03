const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: {type: String},
	items: [{
		image: {type: String},
		url: {type: String},/* 点击后跳转到广告页面 */
	}]
})

module.exports = mongoose.model('Ad', schema)