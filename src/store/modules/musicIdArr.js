const state = {
    musicArr: [],//存放歌曲数组
    playMenu:false//播放状态
}
const getters = {
    musicArr: state => state.musicArr,
    playMenu: state => state.playMenu
}
const mutations = {
    commitData(state, value) {
        state.musicArr = value
    },
    commitConcat(state,value){
        state.musicArr.push(...value)
    },
    commitUnshift(state,value){
        state.musicArr.unshift(value)
    },
    commitMenu(state,value){
        state.playMenu = value
    }
}
const actions = {
}
export default {
    state, getters, mutations, actions
}