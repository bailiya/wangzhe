import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'


Vue.config.productionTip = false


//引用幻灯片样式
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


//引用组件
import Card from './components/Card.vue'
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import Card1 from './components/Card1.vue'
Vue.component('m-card-1', Card1)



import axios from 'axios'
Vue.prototype.$http = axios.create({
	baseURL: 'http://localhost:3000/web/api'
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
