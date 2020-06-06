<template>
  <div class="main-wrap">
    <el-row class="main">
      <el-col :md="18">
        <musicBtn></musicBtn>
        <div class="music">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </el-col>
      <el-col :md="6" class="hidden-sm-and-down">
        <dl class="music-info">
          <dt>
            <img :src="pic || require(`@/assets/imges/player_cover.png`)" alt="">
          </dt>
          <dd v-if="!pic">QiuQiuPlayer在线音乐播放器</dd>
          <dd v-if="pic">歌曲名：{{name}}</dd>
          <dd v-if="pic">歌手名：{{ar}}</dd>
        </dl>
        <div class="music-lyrics">
          <transition name="fade">
            <p v-if="display">暂无歌词</p>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import musicBtn from "../music-btn/music-btn";
import { EventBus } from "../../../eventBus/eventBus"
export default {
  name: "musicMain",
  components: {
    musicBtn
  },
  data() {
    return {
      display:false,
      ar:'',
      name:'',
      pic:'',
    };
  },
  created(){
    
  },
  mounted(){
    EventBus.$on('changePic',(msg)=>{
      this.ar = msg.ar
      this.name = msg.name
      this.pic = msg.pic
      this.display = true
     })
  },
  methods:{},
  watch: {}
};
</script>

<style lang="less" scoped>
.main {
  height: calc(100vh - 200px);
  color: #fff;
  .music {
    height: calc(100vh - 260px);
  }
  .el-col:nth-child(2) {
    display:flex;
    flex-direction: column;
    height: calc(100vh - 200px);
    text-align: center;
  }
  .music-info{
    padding-bottom: 20px;
    font-size: 14px;
    color: hsla(0,0%,100%,.6);
    dt{
      position:relative;
      width:186px;
      height:186px;
      margin:0 auto 15px;
      img{
        width:100%;
        height:100%;
      }
      &::after{
        position:absolute;
        content:"";
        width:108%;
        height:100%;
        top:0;
        left:9px;
        background:url('../../../assets/imges/album_cover_player.png') center center no-repeat;
      }
    }
    dd{
      height: 30px;
      line-height: 30px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .music-lyrics{
    height:calc(100vh - 500px);
    color: hsla(0,0%,100%,.6);
    p{
      transform: translateY(200px);
    }
    .fade-enter-active {
      transition: all 0.5s ease-in;
    }
    .fade-leave-active {
      transition: all 0.5s ease-in;
    }
    .fade-enter,
    .fade-leave-to {
      transform: translateY(0);
      opacity: 0;
    }
  }
}
@media screen and (max-width: 960px) {
  .main .music .list-title .list-name {
    padding-right: 70px;
  }
}
@media screen and (max-width: 1440px) {
  .main .music .list-title .list-artist {
    width: 200px;
  }
}
@media screen and (max-width: 1200px) {
  .main .music .list-title .list-artist {
    width: 150px;
  }
}
@media screen and (max-width: 768px) {
  .main .music .list-title .list-artist {
    width: 20%;
  }
}
@media screen and (max-width: 640px) {
  .main .music .list-title .list-artist {
    width: 80px;
  }
  .main .music .list-title .list-time {
    display: none;
  }
}
</style>