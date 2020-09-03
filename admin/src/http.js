//引用axios
import axios from 'axios'
import Vue from 'vue'
import router from './router'


const http = axios.create({
	baseURL: 'http://localhost:3000/admin/api'
})


//给所有请求加一个请求头，附上token
http.interceptors.request.use(config => {
	if(localStorage.token){
		config.headers.Authorization = 'Bearer ' + localStorage.token
	}
	return config
})


//前端通用的错误处理
http.interceptors.response.use(res => {
	return res
}, err => {
	if(err.response.data.message){
		
		//用vue弹出一个错误警告
		Vue.prototype.$message({
			type: 'error',
			message: err.response.data.message
		})
		
		if(err.response.status === 401){
			router.push('/login')
		}
	}

	return Promise.reject(err)
})

export default http