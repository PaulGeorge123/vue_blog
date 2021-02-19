import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './assets/iconfont/iconfont.css';
import 'babel-polyfill';
import Moment from 'moment';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
// use
Vue.use(mavonEditor);
Vue.use(Vuex);
Vue.prototype.$moment = Moment;
// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
    return Moment(value).format('YYYY-MM-DD HH:mm:ss');
});
Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
import { setCookie, getCookie, removeCookie } from './utils/cookie';

Vue.prototype.$cookieStore = { setCookie, getCookie, removeCookie };

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
