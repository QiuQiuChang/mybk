const state = {
    musicArr:[],
   playNum:'',//存储播放音乐的下标
   playMenu: false,//暂停播放开关1
   barMenu:false//暂停播放开关2,
}
const getters = {
    musicArr:state =>state.musicArr,
    playNum:state =>state.playNum,
    playMenu: state => state.playMenu,
    barMenu: state => state.barMenu
}
const mutations = {
    commitNum(state,num){
        state.playNum = num 
    },
    commitMenu(state){
        state.playMenu = !state.playMenu
    },
    commitBarMenu(state){
        state.barMenu = !state.barMenu
    },
    commitPrve(state){
        state.playNum = state.playNum == 0? (state.musicArr.length) - 1 : state.playNum - 1
        // state.playMenu = !state.playMenu
    },
    commitNext(state){
        state.playNum = state.playNum == (state.musicArr.length - 1)? 0 : state.playNum + 1
        // state.playMenu = !state.playMenu
    },
    commitData(state,value){
        state.musicArr = value
    },
}
const actions = {
}
export default {
    state,getters,mutations,actions
}