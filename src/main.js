/*
 * @Description: 
 * @Author: fanwenjing
 * @LastEditors: fanwenjing
 * @Date: 2020-10-16 09:32:45
 * @LastEditTime: 2020-10-16 10:30:54
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts';
import "./styles/index.scss";
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$base = process.env.NODE_ENV === 'production' ? '/bin-data-site' : ''
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
