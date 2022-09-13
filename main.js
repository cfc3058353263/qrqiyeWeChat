import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import {router,RouterMount} from './router/router.js';
import { refreshT,getRefresh,refreshF } from "./utils/refresh.js"
import store from './store'

//用于返回刷新
Vue.prototype.refreshT = refreshT 
Vue.prototype.getRefresh = getRefresh 
Vue.prototype.refreshF = refreshF 

//时间格式化操作
import moment from "moment"
Vue.prototype.moment = moment 

//组件式导航
import Mylink from './node_modules/uni-simple-router/dist/link.vue'
Vue.component('my-link', Mylink)

App.mpType = 'app'
Vue.use(router);
Vue.use(uView);
Vue.use(store);
const app = new Vue({
    ...App,
    store
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif