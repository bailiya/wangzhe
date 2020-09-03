module.exports = options => {
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const AdminUser = require('../models/AdminUser')
	
	
	return async (req, res, next) => {
		//校验用户是否登录，获取token
		const token = String(req.headers.authorization || '').split(' ').pop()/* pop()提取最后一个元素 */
		assert(token, 401, "请先登录")
		//解析token，获取用户id
		const {id} = jwt.verify(token, req.app.get('secret'))
		assert(id, 401, "请先登录")
		//通过id找查用户，然后挂载到req.user上
		req.user = await AdminUser.findById(id)
		assert(req.user, 401, "请先登录")
		await next()
	}
}