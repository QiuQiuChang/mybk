import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from "js-cookie"
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const Root = () => import('../views/Root')
//根路由主页下的二级路由
const Home = () => import('../components/pageViews/Home')
      //home下面的子路由
      const articleList = () => import('../components/musicComponents/body-home/articleList.vue')
      const ArticleInfo = () => import('../components/musicComponents/body-home/articleInfo.vue')
//根路由主页下的二级路由
const User = () => import('../components/pageViews/User')
const Music = () => import('../components/pageViews/Music')
const Login = () => import('../components/pageViews/Login')
const Register = () => import('../components/pageViews/Register')

//music页面下的二级路由
const playList = () =>import('../components/musicComponents/playList/playList.vue')
const topList = () =>import('../components/musicComponents/topList/topList.vue')
const search = () =>import('../components/musicComponents/search/search.vue')
const myList = () =>import('../components/musicComponents/myList/myList.vue')
const historyList = () =>import('../components/musicComponents/historyList/historyList.vue')
const detail = () =>import('../components/musicComponents/details/detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Root,
    redirect:'home',
    children: [
      { path: 'home', name: 'home', component: Home, meta: { id: 1 },redirect: 'home/article',
          children:[
            { path: 'article', name: 'articleList', component: articleList},
            { path: 'article/:id', name: 'articleinfo', component: ArticleInfo},
          ] 
      },
      { path: 'user', name: 'user', component: User, meta: { id: 2 }},
      { path: 'music', name: 'music', component: Music, meta: { id: 3 },redirect: 'music/playList',
          children:[
            {path:"playList",name:'playList',component:playList},
            {path:"topList",name:'topList',component:topList},
            {path:"details/:id",name:'details',component:detail},
            {path:"search",name:'search',component:search},
            {path:"myList",name:'myList',component:myList},
            {path:"historyList",name:'historyList',component:historyList},
          ] 
      },
      {
        path:"login",
        name: 'login',
        component: Login,
        meta: { id: 4 }
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: { id: 5 }
      },
    ]
  },
]
const router = new VueRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

export default router
