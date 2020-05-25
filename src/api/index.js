
//引入axios
import Axios from "axios"
//引入qs模块
import qs from "qs"
// //请求数据拦截器
// Axios.interceptors.request.use(request => {
//   startLoading();
//   return request
// }, err => {
//   return Promise.reject(err);
// });
//接收响应拦截器
Axios.interceptors.response.use(response => {//设置数据返回格式
  return response.data
}, err => {
  return Promise.reject(err);
});
//跨域允许携带cookie
Axios.defaults.withCredentials = true;

//music页面数据获取api
export const getData = () => {
    return Axios.get('http://qiuchang.xyz:3000/top/list?idx=1')
}
//music 推荐页面特色榜获取数据
export const getFeatures = () => {
  return Axios.get('http://qiuchang.xyz:3000/toplist/detail')
}
//music 推荐页面推荐歌单获取数据
export const getRecommend = () => {
  return Axios.get('http://qiuchang.xyz:3000/personalized')
}
//music 推荐页面推荐歌单中具体获数据的获取
export const getSpecificRecommend = (id) => {
  return Axios.get('http://qiuchang.xyz:3000/playlist/detail?id=' + id)
}

//注册api
export const register = (obj) =>{
    return Axios.post('http://localhost:9875/register',qs.stringify(obj))
}
//登录api
export const login = (obj) =>{
    return Axios.post('http://localhost:9875/login',qs.stringify(obj))
}
//获取文章
export const getArticle = () =>{
   return Axios.get ('http://localhost:9875/article')
}
//获取文章信息
export const getArticleInfo = (id) =>{
  return Axios.get ('http://localhost:9875/articleInfo/' + id)
}
//获取个人信息
export const profile = (token) =>{
  return Axios.get('http://localhost:9875/profile',{
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
}
//更新个人信息
export const postProfile = (obj) =>{
  return Axios.post ('http://localhost:9875/profile',qs.stringify(obj))
}