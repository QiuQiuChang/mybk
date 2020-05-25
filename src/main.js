import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//移动端300ms点击延迟问题
import fastClick from 'fastclick'
//引入自定义toast组件
import mmToast from './components/Toast'
//引入全局样式重置
import './assets/style/reset.css'
//引入图标
import './assets/font_class/iconfont.css'
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
//引入隐藏类样式
import 'element-ui/lib/theme-chalk/display.css';
//引入过渡动画样式
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)
//引入懒加载
import VueLazyload from 'vue-lazyload'
//按需引入组件
import { Button,Row, Menu,Submenu, MenuItem,Col,Icon,Container,
  Header,Aside,Main,Footer,Dropdown,DropdownMenu,DropdownItem,Loading,Form,
  FormItem,Input,Image,Upload,Dialog,Table,
  TableColumn,Popover,Tag,} from 'element-ui';
Vue.use(Button).use(Row).use(Menu).use(Submenu).use(MenuItem).use(Col)
.use(Icon).use(Container).use(Header).use(Aside).use(Main).use(Footer)
.use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Loading).use(Form)
.use(FormItem).use(Input).use(Image).use(Upload).use(Dialog).use(Table).use(TableColumn).use(Popover)
.use(Tag)

// 弹出层
Vue.use(mmToast)

// 优化移动端300ms点击延迟
fastClick.attach(document.body)

// 懒加载
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('./assets/imges/default.png')
})



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
