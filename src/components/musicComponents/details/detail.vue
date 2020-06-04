<template>
  <div class="detail" v-loading="loading"
    element-loading-background="rgba(0,0,0,0.2)">
      <publicMusicList :musicList="musicList" @handelDelete = 'handelDelete'></publicMusicList>
  </div>
</template>

<script>
import { getSpecificRecommend } from "../../../api";
import { filterData }  from '../../../utils/util'//数据加工整理函数
import publicMusicList from "../publicList/publicMusicList"
export default {
  name: 'detail',
  components:{
    publicMusicList
  },
  data() { 
    return {
      loading: true,
      musicList:[],
    }
  },
  activated(){
      const { id } = this.$route.params
      getSpecificRecommend(id).then((res)=>{
            let tracks = res.playlist.tracks;
            let result;
            if(tracks.length > 10){
                result = tracks.slice(0.100)
            }else{
              result = tracks
            }
            let data = filterData(result);
            data.forEach(item => {
              let URL = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
              item.url = URL;
            });
            this.musicList = data
      }).then(()=>{
        setTimeout(()=>{
          this.loading = false
        },500)
      })
  },
  deactivated(){
    this.loading = true
    this.musicList = []
  },
  methods:{
   handelDelete(){
     this.musicList = []
   }
  }
}
</script>

<style lang="less" scoped>
.detail{
   height: calc(100vh - 310px);
}
</style>