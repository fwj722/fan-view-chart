import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'

import "./styles/index.scss";

// element-ui 局部引用
Vue.use(ElementUI)
Vue.use(VCharts)

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$base = process.env.NODE_ENV === 'production' ? '/bin-data-site' : ''

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
