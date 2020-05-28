const state = {
    musicArr: []//存放歌曲数组
}
const getters = {
    musicArr: state => state.musicArr,
}
const mutations = {
    commitData(state, value) {
        state.musicArr = value
    }
}
const actions = {
}
export default {
    state, getters, mutations, actions
}