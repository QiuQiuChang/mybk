import Vue from 'vue'
import Vuex from 'vuex'
import musicArr from './modules/musicIdArr'
import playNum from './modules/playNum'
import convertArr from './modules/convertArr'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    musicArr,
    playNum,
    convertArr
  }
})
