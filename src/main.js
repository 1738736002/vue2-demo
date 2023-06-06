import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import '@/assets/dncss/element-variables.scss'
// import '@dn/dongni-ui/packages/theme-chalk/element-variables.scss'
// import '@dn/dongni-ui/packages/theme-chalk/vars.styl'
// import '@dn/dongni-ui/packages/theme-chalk/index.styl'
// import './assets/dncss/dn-variables.styl'
Vue.config.productionTip = false
// 全局配置懂你UI
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
