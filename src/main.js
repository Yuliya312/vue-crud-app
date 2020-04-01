import Vue from 'vue'
import Vuelidate from 'vuelidate';
import store from './vuex/store'
import router from './router/router'
import App from './App.vue'
import 'material-design-icons-iconfont'
import 'materialize-css/dist/css/materialize.css'

Vue.config.productionTip = false
Vue.use(Vuelidate);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
