<template>
  <div class="playList" v-loading="loading"
    element-loading-background="rgba(0,0,0,0.2)">
      <publicMusicList :musicList = 'musicList' @deleteList = 'deleteList'></publicMusicList>
  </div>
</template>

<script>
import { getData } from "../../../api";
import publicMusicList from "../publicList/publicMusicList"
import { filterData }  from '../../../utils/util'//数据加工整理函数
import { mapGetters } from "vuex";
export default {
  name: 'playList',
  components:{
    publicMusicList
  },
  data() { 
    return {
      loading: true,
      musicList:[] ,
    }
  },
  activated(){
    setTimeout(()=>{
        this.loading = false
        },200)
  },
  created(){
      getData().then((res)=>{
        let result = res.playlist.tracks.slice(0, 100);
        let data = filterData(result);
            data.forEach(item => {
              let URL = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
              item.url = URL;
            });
            this.musicList = data
      }).then(()=>{
        setTimeout(()=>{
          this.loading = false
        },300)
      })
  },
  
  deactivated(){
    this.loading = true
  },
  methods:{
    deleteList(){
      this.musicList = []
    }
  },
  watch:{
    musicArr(now,old){
      this.musicList = now
    }
  },
  computed:{
    ...mapGetters(['playNum','musicArr'])
  }
}
</script>

<style lang="less" scoped>
.playList{
   height: calc(100vh - 310px);
}
</style>