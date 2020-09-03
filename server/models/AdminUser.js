const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	username: {type: String},
	password: {
		type: String,
		select: false,/* 查数据时不显示 */
		set(val){
			return require('bcrypt').hashSync(val, 10)/* 指数越高加密程度越高，一般是10 */
		} 
	},
})

module.exports = mongoose.model('AdminUser', schema)