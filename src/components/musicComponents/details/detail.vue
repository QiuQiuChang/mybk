<template>
  <div class="detail" v-loading="loading"
    element-loading-background="rgba(0,0,0,0.2)">
      <publicMusicList :originalData="originalData" @changeNum = 'changeNum'></publicMusicList>
  </div>
</template>

<script>
import { getSpecificRecommend } from "../../../api";
import publicMusicList from "../publicList/publicMusicList"
export default {
  name: 'detail',
  components:{
    publicMusicList
  },
  data() { 
    return {
      loading: true,
      originalData: {},
    }
  },
  
  activated(){
      const { id } = this.$route.params
      getSpecificRecommend(id).then((res)=>{
            this.originalData = res
      }).then(()=>{
        setTimeout(()=>{
          this.loading = false
        },500)
      })
  },
  deactivated(){
    this.loading = true
  },
  methods:{
    changeNum(value){
        this.$emit('changeNum',value)
    }
  }
}
</script>

<style lang="less" scoped>
.detail{
   height: calc(100vh - 310px);
}
</style>