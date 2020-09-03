const express = require('express')

const app = express()

//全局秘钥
app.set('secret', 'zuomingshizhende')


app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))/* 表示uploads下面的文件都是静态文件，静态托管图片 */


//引用admin路由
require('./routes/admin')(app)
//连接数据库
require('./plugins/db')(app)
//引用web路由
require('./routes/web')(app)


app.listen(3000, () => {
	console.log('http://localhost:3000')
})