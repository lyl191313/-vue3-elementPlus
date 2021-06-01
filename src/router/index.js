import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "errors-404" */ "../views/auth/Login.vue")
  },
  {
    path: "/index",
    name: 'Dashboard',
    component: Dashboard,
    // redirect:'/about',
    children:[
      {
        path: '/workbench',
        name: '工作台',
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/Workbench.vue')
      },
      {
        path: '/analysis',
        name: '分析页',
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/AnalysisPage.vue')
      }
    ],
  },
  {
    path: "/formPage",
    name: '表单页',
    component: Dashboard,
    // redirect:'/about',
    children:[
      {
        path: '/baseForm',
        name: '基础表单',
        component: () => import(/* webpackChunkName: "about" */ '../views/FormPage/baseForm.vue')
      },
      {
        path: '/distributionForm',
        name: '分布表单',
        component: () => import(/* webpackChunkName: "about" */ '../views/FormPage/distributionForm.vue')
      },
      {
        path: '/advancedForm',
        name: '高级表单',
        component: () => import(/* webpackChunkName: "about" */ '../views/FormPage/advancedForm.vue')
      }
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name:'404',
    component: () => import(/* webpackChunkName: "errors-404" */ "../views/error/NotFound.vue")
  },
  

  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const getToken = ()=>{
  return localStorage.getItem('token')
}
const deleteToken = ()=>{
  return localStorage.removeItem('token')
}
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !getToken()) {next('/login')} // 如果用户不是访问登录页且没有登录，则强制跳转到登录页
  else if(to.name === 'login' && getToken()){
    deleteToken()
    next()
  } else
  {  next()}
})
export default router
