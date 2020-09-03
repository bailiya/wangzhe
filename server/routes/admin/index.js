module.exports = app => {
	const express = require('express')
	const assert = require('http-assert')	/* assert(判断第一个参数是否存在，不存在抛出错误状态码，message是什么) */
	//引入管理员模型
	const AdminUser = require('../../models/AdminUser')
	
	//token
	const jwt = require('jsonwebtoken')
	
	//定义子路由
	const router = express.Router({
		mergeParams: true
	})
	
	//校验用户是否登录，中间键
	const authMiddleware = require('../../middleware/auth')
	//把小写的负数形式转成大写单数形式，中间键
	const resourceMiddleware = require('../../middleware/resource')
	
	
	
	
	//登录
	app.post('/admin/api/login', async (req, res) => {
		const { username, password } = req.body
		//根据用户名找用户
		const user = await AdminUser.findOne({
			username: username
		}).select('+password')	/* 定义数据库模型时，select: false，会导致password获取不到，所以这里需要加select */
		//判断用户存不存在
		assert(user, 422, "用户不存在")/* assert(判断第一个参数是否存在，不存在抛出错误状态码，message是什么) */
		/* if(!user){
			return res.status(422).send({
				message: "用户不存在",
			})
		} */
		//比对密码，compareSync(明文，密文)比对明文和密文是否一致
		const isValue =  require('bcrypt').compareSync(password, user.password)/* 返回的是布尔值 */
		assert(isValue, 422, "密码错误")
		//返回token
		const token = jwt.sign({ id: user._id }, app.get('secret'))
		res.send({token})
	})
	
	
	
	
	//传图片
	const multer = require('multer')
	const upload = multer({dest: __dirname + '/../../uploads'})
	//上传图片，把客户端存的图片的内容file发送给服务端，在添加上图片的url返回给客户端
	app.post('/admin/api/upload',upload.single('file'), authMiddleware(), async (req, res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	})
	
	

	
	
	
	
	//总的路由
	app.use('/admin/api/rest/:resourse', authMiddleware(), resourceMiddleware(), router)
	
	
	
	//新建
	router.post('/', async (req, res) => {
		const model =  await req.Model.create(req.body)
		res.send(model)
	})
	
	
	
	
	//展示
	router.get('/', async (req, res) => {
		const queryOptions = {}
		if(req.Model.modelName === 'Category'){
			queryOptions.populate = 'parent'
		}
		
		const items =  await req.Model.find().setOptions(queryOptions)
		res.send(items)
	})
	
	
	
	
	//编辑时，把要编辑的内容显示在input框里
	router.get('/:id', async (req, res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})
	
	
	
	
	//用编辑后的内容替换原有内容
	router.put('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})
	
	
	
	
	//删除
	router.delete('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndDelete(req.params.id)
		res.send({
			success: true
		})
	})
	
	
	
	
	//错误处理函数，捕获异常
	app.use(async (err, req, res, next) => {
		res.status(err.statusCode || 500).send({
			message: err.message
		})
	})
}