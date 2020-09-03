module.exports = app => {
	const mongoose = require("mongoose")
	mongoose.connect('mongodb://localhost:27017/wangzhe', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	
	mongoose.set('useFindAndModify', false)
	
	require('require-all')(__dirname + '/../models')
}