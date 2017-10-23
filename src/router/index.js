import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginForm from '@/components/Login'
import RoomCalendar from '@/components/RoomCalendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Login',
      component: LoginForm
      
    },
    {
      path:'/calendar',
      name: 'RoomCalendar',
      component: RoomCalendar
    }
  ]
})
