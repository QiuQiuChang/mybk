const state = {
    playNum: {},//存储播放音乐的id值以对象形式
}
const getters = {
    playNum: state => state.playNum,
}
const mutations = {
    commitNum(state, payload) {
        state.playNum = payload
    }
}
const actions = {
}
export default {
    state, getters, mutations, actions
}