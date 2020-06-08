<template>
  <div class="music-history">
      <publicMusicList :musicList = 'musicList' v-show="isShow" @deleteList="deleteList"></publicMusicList>
      <div class="delete-mask" v-show="musicList.length > 0? false : true">
        <transition name="fade">
          <p v-if="display">您还没听过一首歌呢，赶紧去听吧！！！</p>
        </transition>
      </div>
  </div>
</template>

<script>
import publicMusicList from "../publicList/publicMusicList"
export default {
  name: 'music-history',
  components:{
      publicMusicList
  },
  data() { 
    return {
        musicList:[],
        isShow:false,
        display:false
    }
  },
  activated(){
      let songsList = JSON.parse(window.localStorage.getItem('songsList'))
          if(songsList){
            this.musicList = songsList
            this.isShow = true
          }
          if(this.musicList.length == 0){
            this.display = true;
          }
  },
  deactivated() {
    this.display = false;
  },
  methods:{
    deleteList() {//清空播放历史记录
      this.musicList = []
      this.isShow = false;
      this.display = true;
      window.localStorage.removeItem('songsList')
    }
  }
 }
</script>

<style lang="less" scoped>
.music-history{
  position: relative;
  height:100%;
  color: hsla(0, 0%, 100%, 0.6);
  .delete-mask {
      display: flex;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      // background-color: #000;
    }
    .fade-enter {
      transform: translateY(-200px);
      opacity: 0;
    }
    .fade-enter-active {
      transition: all 0.5s ease-in;
    }
}

</style>