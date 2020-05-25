const state = {
    convertData:[],
}
const getters = {
    convertData:state=>state.convertData,
}
const mutations = {
    commitConvert(state,value){
        state.convertData = value
    },
}
const actions = {
}
export default {
    state, getters, mutations, actions
}