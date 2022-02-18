import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
// Vue.config.productionTip = false;
import './assets/css/reset.less';
import event from './event';

Vue.prototype.$event = event;
Vue.use(Vant);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
