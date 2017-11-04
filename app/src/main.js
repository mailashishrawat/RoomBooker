// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FullCalendar from 'vue-full-calendar';
//import RoomCalendar from './components/RoomCalendar';

Vue.config.productionTip = false
Vue.use(FullCalendar);
//Vue.use(RoomCalendar);

/* eslint-disable no-new */
var root=new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
