<template>
  <div class="footer-wrap">
    <el-row class="footer">
      <el-col>
        <div class="music-bar">
          <div class="music-bar-btns">
            <i class="iconfont icon-shangyiqu" title="上一曲" @click="prve"></i>
            <div class="control-play">
              <i class="iconfont icon-play" title="播放暂停" ref="iconPlay" @click="menuControl"></i>
            </div>
            <i class="iconfont icon-xiayiqu" title="下一曲" @click="next"></i>
          </div>
          <div class="music-scroll">
            <div class="tost" v-show="!musicName">欢迎使用QiuQiuPlayer在线音乐播放器</div>
            <div class="bar-info" v-show="musicName">
              {{musicName}} -
              <span>{{musicArtist}}</span>
              <span class="bar-time">{{nowTime}}/{{fullTime}}</span>
            </div>
            <mmProgress :percent="percentage" @percentChange="percentChange"></mmProgress>
          </div>
          <i class="iconfont icon-shunxubofangtubiao"></i>
          <i class="iconfont icon-weibiaoti-"></i>
          <div class="music-bar-volume" title="音量加减">
            <div class="volume">
              <i class="iconfont icon-yinliang" @click="changeMute" ref="iconVolume"></i>
              <mmProgress class="volume-bar" @percentChange='changeVolume' :percent='volume'></mmProgress>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <audio ref="setAduio" @ended="ended"></audio>
    <div></div>
  </div>
</template>

<script>
import mmProgress from "../progress/mmProgress";
import { mapState, mapGetters, mapMutations } from "vuex";
import { EventBus } from '../../../eventBus/eventBus'
export default {
  name: "footerWrap",
  components: {
    mmProgress
  },
  data() {
    return {
      musicName: "", //存歌曲名
      picUrl:'',
      fullTime: "", //转化后的歌曲总时间
      duration: "", //总时间
      musicArtist: "", //歌手
      nowTime: "00:00", //转化后当前时间
      percentage: 0, //比率
      volume:0,  //音频播放时的音量
      volume1:0,//静音之前的音量大小
      timer: 0, //定时器
      timer1: 0,
      num:'',
      // arr:[]
    };
  },
  created() {},
  mounted() {
    let musicBar = document.getElementsByClassName("music-bar")[0];
    musicBar.classList.add("disabled");
    EventBus.$on('changeNum',(value)=>{
      this.num = value
      console.log(value)
    })
  },
  methods: {
    play() {
      let audio = this.$refs["setAduio"];
          this.volume = audio.volume
      let musicBar = document.getElementsByClassName("music-bar")[0];
      let iconPlay = this.$refs["iconPlay"];
      iconPlay.classList.replace("icon-play", "icon-pause");
      if (audio.src) {
        musicBar.classList.remove("disabled");
      }
      clearTimeout(this.timer1);
      this.timer1 = setTimeout(() => {
        audio
          .play()
          .then(() => {
            clearInterval(this.timer); //每当歌曲更换时清除上一次定时器
            this.duration = audio.duration;
            let s, m;
            this.timer = setInterval(() => {
              //处理时间进度
              //刚开始播放获取当前时间为NaN处理
              audio.currentTime == NaN ? 0 : audio.currentTime;
              let ratio = audio.currentTime / this.duration;
              this.percentage = Number(ratio);
              let nowTime = audio.currentTime;
              s = parseInt(nowTime % 60);
              m = parseInt(nowTime / 60);
              if (s < 10) {
                s = "0" + s;
              }
              this.nowTime = "0" + m + ":" + s;
              if (
                nowTime == this.duration ||
                this.nowTime == this.fullTime ||
                this.barMenu
              ) {
                clearInterval(this.timer);
              }
            }, 1000);
          })
          .catch(error => {
            if (error) {
              this.$mmToast("当前音乐不可播放，自动播放下一曲");
              this.next();
            }
          });
      }, 500);
    },
    pause() {
      let audio = this.$refs["setAduio"];
      let iconPlay = this.$refs["iconPlay"];
      iconPlay.classList.replace("icon-pause", "icon-play");
      audio.pause();
    },
    menuControl() {
      // let audio = this.$refs["setAduio"];
      // audio.paused ? this.play() : this.pause();
      this.commitMenu();
      this.commitBarMenu();
    },
    prve(){
      this.commitPrve();
    },
    next(){
      this.num = this.num == (this.musicArr.length - 1)? 0 : this.num + 1
      this.commitNum(this.num);
    },
    ended() { 
      this.percentage = 0;
      this.nowTime = "00:00"
      this.commitNext();
    },
    percentChange(value){
      let audio = this.$refs["setAduio"];
      audio.currentTime = audio.duration*value
    },
    changeVolume(percent){
      let audio = this.$refs["setAduio"];
      let iconVolume = this.$refs['iconVolume']
      let jingyin = iconVolume.classList.contains('icon-jingyin')
      let yinliang = iconVolume.classList.contains('icon-yinliang')
      if(jingyin){
        iconVolume.classList.replace('icon-jingyin','icon-yinliang')
      }
      if(yinliang && percent == 0){
        iconVolume.classList.replace('icon-yinliang','icon-jingyin')
      }
      audio.volume = percent
      this.volume = percent
    },
    changeMute(){
      let audio = this.$refs["setAduio"];
      let iconVolume = this.$refs['iconVolume']
      let yinliang = iconVolume.classList.contains('icon-yinliang')
      let jingyin = iconVolume.classList.contains('icon-jingyin')
      if(yinliang){
        this.volume1 = audio.volume
        iconVolume.classList.replace('icon-yinliang','icon-jingyin')
        audio.volume = 0
        this.volume = audio.volume
      }
      if(jingyin){
        iconVolume.classList.replace('icon-jingyin','icon-yinliang')
        audio.volume = this.volume1
        this.volume = this.volume1
      }
    },
    workingData(value){
      this.musicName = this.musicArr[value].name;
      this.musicArtist = this.musicArr[value].ar;
      this.picUrl = this.musicArr[value].al.picUrl
      let time = this.musicArr[value].dt;
      let m =
        parseInt(Math.floor(time / 1000) / 60) < 10
          ? "0" + parseInt(Math.floor(time / 1000) / 60)
          : parseInt(Math.floor(time / 1000) / 60);
      let s =
        Math.floor(time / 1000) % 60 < 10
          ? "0" + (Math.floor(time / 1000) % 60)
          : Math.floor(time / 1000) % 60;
      let str = m + ":" + s;
      this.fullTime = str;
    },
    ...mapMutations(["commitNext", "commitMenu", "commitNum","commitPrve","commitBarMenu"])
  },
  watch: {
    num(now, old) {
      this.workingData(this.num)
      let audio = this.$refs["setAduio"];
      audio.src = this.musicArr[this.num].url;
      audio.paused ? this.play() : this.pause();
      this.$emit('changePic',this.picUrl)
    },
    musicArr(now,old){
      console.log(now,now==old)
    //   this.musicName = now[this.num].name;
    //   this.musicArtist = now[this.num].ar;
    //   this.picUrl = now[this.num].al.picUrl
    //   let time = now[this.num].dt;
    //   let m =
    //     parseInt(Math.floor(time / 1000) / 60) < 10
    //       ? "0" + parseInt(Math.floor(time / 1000) / 60)
    //       : parseInt(Math.floor(time / 1000) / 60);
    //   let s =
    //     Math.floor(time / 1000) % 60 < 10
    //       ? "0" + (Math.floor(time / 1000) % 60)
    //       : Math.floor(time / 1000) % 60;
    //   let str = m + ":" + s;
    //   this.fullTime = str;
    //   let audio = this.$refs["setAduio"];
    //   audio.src = now[this.num].url;
    //   audio.paused ? this.play() : this.pause();
    //  this.workingData(this.num)
    //   let audio = this.$refs["setAduio"];
    //   audio.src = this.musicArr[this.num].url;
    //   audio.paused ? this.play() : this.pause();
    //   this.$emit('changePic',this.picUrl)
    },
    // playNum(now,old){
    //   console.log(now)
    //     this.workingData(now)
    //   let audio = this.$refs["setAduio"];
    //   audio.src = this.musicArr[now].url;
    //   audio.paused ? this.play() : this.pause();
    //   this.$emit('changePic',this.picUrl)
    // },
    playMenu(now, old) {
      let audio = this.$refs["setAduio"];
      audio.paused ? this.play() : this.pause();
    }
    // arr(now,old){
    //     console.log(1)
    // }
  },
  computed: {
    ...mapGetters(["musicArr", "playNum", "playMenu","barMenu"])
  }
};
</script>

<style lang="less" scoped>
audio {
  position: fixed;
}
.footer {
  height: 80px;
  line-height: 80px;
  color: #fff;
  // text-align: center;
  .music-bar {
    display: flex;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding-bottom: 15px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #fff;
    .music-bar-btns {
      display: flex;
      width: 180px;
      align-items: center;
      justify-content: space-between;
      .icon-shangyiqu,
      .icon-xiayiqu {
        width: 35px;
        height: 35px;
        font-size: 35px;
        line-height: 35px;
        cursor: pointer;
      }
      .control-play {
        display: flex;
        width: 40px;
        height: 40px;
        color: #fff;
        align-items: center;
        justify-content: center;
        background-color: hsla(0, 0%, 100%, 0.3);
        border-radius: 50%;
        cursor: pointer;
        .icon-play,
        .icon-pause {
          font-size: 28px;
          width: 25px;
          height: 22px;
          line-height: 22px;
        }
        .icon-pause{
          font-size: 26px;
        }
      }
    }
    .music-scroll {
      position: relative;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      padding-left: 40px;
      font-size: 12px;
      color: #fff;
      .bar-info {
        position: relative;
        height: 15px;
        padding-right: 80px;
        line-height: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        .bar-time {
          position: absolute;
          top: 0;
          right: 5px;
        }
      }
      .tost {
        position: relative;
        height: 15px;
        padding-right: 80px;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .music-progress {
        position: relative;
        padding: 5px;
        user-select: none;
        cursor: pointer;
        overflow: hidden;
        .progress-bar {
          height: 2px;
          width: 100%;
          background: hsla(0, 0%, 100%, 0.15);
        }
        .progress-inner {
          position: absolute;
          top: 50%;
          left: 5px;
          display: inline-block;
          height: 2px;
          width: 100px;
          margin-top: -1px;
          background-color: #fff;
          .progress-dot {
            position: absolute;
            top: 50%;
            right: -5px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
            transform: translateY(-50%);
          }
        }
      }
    }
    .icon-shunxubofangtubiao,
    .icon-weibiaoti- {
      width: 27px;
      height: 27px;
      margin-left: 20px;
      font-size: 27px;
      line-height: 27px;
      color: #fff;
      cursor: pointer;
    }
    .music-bar-volume {
      height: 30px;
      margin-left: 20px;
      .volume {
        display: flex;
        width: 150px;
        height: 100%;
        align-items: center;
        .icon-yinliang,.icon-jingyin{
          width: 25px;
          height: 25px;
          line-height: 25px;
          font-size: 25px;
          cursor: pointer;
          margin-right: 10px;
        }
        // .volume-wrap {
        //   flex: 1;
        //   .volume-progress {
        //     position: relative;
        //     padding: 5px;
        //     user-select: none;
        //     cursor: pointer;
        //     overflow: hidden;
        //     .progress-bar {
        //       height: 2px;
        //       width: 100%;
        //       background: hsla(0, 0%, 100%, 0.15);
        //     }
        //     .progress-inner {
        //       position: absolute;
        //       top: 50%;
        //       left: 5px;
        //       display: inline-block;
        //       width: 0;
        //       height: 2px;
        //       margin-top: -1px;
        //       background-color: #fff;
        //       .progress-dot {
        //         position: absolute;
        //         top: 50%;
        //         right: -5px;
        //         width: 10px;
        //         height: 10px;
        //         border-radius: 50%;
        //         background-color: #fff;
        //         transform: translateY(-50%);
        //       }
        //     }
        //   }
        // }
        .volume-bar{
          flex:1;
        }
      }
    }
  }
  .disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
@media screen and (max-width: 768px) {
  .footer {
    .music-bar {
      .music-bar-volume {
        .volume {
          width: 36px;
        }
      }
    }
  }
}
@media screen and (max-width: 520px) {
  .footer {
    .music-bar {
      position: relative;
      flex-direction: column;
      .music-scroll {
        padding-left: 0;
        order: 1;
      }
      .music-bar-btns {
        width: 60%;
        margin-top: 10px;
        order: 2;
      }
      .icon-shunxubofangtubiao {
        position: absolute;
        top: 40px;
        left: 5px;
        margin: 0;
      }
      .icon-weibiaoti- {
        position: absolute;
        top: 40px;
        right: 5px;
      }
      .music-bar-volume {
        display: none;
      }
    }
  }
}
</style>