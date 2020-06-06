<template>
  <div class="publicMusicList">
    <div class="list-title" v-if="display1">
      <span class="list-name">歌曲</span>
      <span class="list-artist">歌手</span>
      <span class="list-time" v-if="isDisplay">时长</span>
      <span class="list-album" v-else>专辑</span>
    </div>
    <div class="list-content" ref="myScrollbar">
      <div v-for="(item,index) in musicList1" :key="index" class="list-item" ref="list-item">
        <span class="list-num">{{index+1}}</span>
        <div class="list-name">
          <span>{{item.name}}</span>
          <div class="list-menu">
            <i class="iconfont hover icon-bofang" @click.stop="play(item.id)" ref="changeClass"></i>
          </div>
        </div>
        <span class="list-artist">{{item.ar}}</span>
        <span class="list-time" v-if="isDisplay">
          {{'0' + parseInt(Math.floor(item.dt/1000)/60)+':'+(Math.floor(item.dt/1000)%60>=10?Math.floor(item.dt/1000)%60:'0'+Math.floor(item.dt/1000)%60)}}
          <i></i>
        </span>
        <span class="list-album" v-else>{{item.al.name}}</span>
      </div>
      <div class="loading" v-show="show">
        <span @click="deleteList">{{loadingText}}</span>
      </div>
    </div>
    <div class="delete-mask" v-show="display">
      <transition name="fade">
        <p v-if="display">弄啥呢，啥都没有啦！！！</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { searchKeyWords, getData } from "../../../api";
import { workingData, filterData } from "../../../utils/util";
export default {
  name: "publicMusicList",
  props: ["musicList", "value"],
  data() {
    return {
      musicList1: [],
      show: false,
      isTrue: false,
      commitTrue: false,
      display: false,
      display1: true,
      isDisplay: true,
      timer: 0,
      count: 0,
      loadingText: "清空列表"
    };
  },
  mounted() {
    let ele = this.$refs["myScrollbar"];
    ele.addEventListener("scroll", this.handleScroll);
    let path = this.$route.path;
    if (path == "/music/search") {
      this.isDisplay = false;
    } else {
      this.isDisplay = true;
    }
  },
  methods: {
    play(id) {
      this.commitNum({ id });
      const key = this.playNum.id;
      let arrItem = this.musicList.find(item => {
        return item.id == key;
      });
      let num = this.musicList.indexOf(arrItem);
      let classArr = this.$refs.changeClass;
      let playNum = classArr[num].className;
      if (/icon-bofang/.test(playNum)){
        this.commitMenu(true)
      }
      if(/icon-zanting/.test(playNum)){
        this.commitMenu(false)
      }
      let path = this.$route.path;
      if (path == "/music/search") {
        const { id } = this.playNum;
        this.id = id;
        if (this.musicArr.length == 0) {
          let arrItem = this.musicList.filter(item => {
            return item.id == id;
          });
          this.commitData(arrItem);
          getData().then(res => {
            let result = res.playlist.tracks.slice(0, 100);
            let data = filterData(result);
            data.forEach(item => {
              let URL = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
              item.url = URL;
            });
            this.commitConcat(data);
          });
        } else {
          let arrItem = this.musicList.find(item => {
            return item.id == id;
          });
          let num = this.musicList.indexOf(arrItem);
          let classArr = this.$refs.changeClass;
          let playNum = classArr[num].className;
          if (/icon-bofang/.test(playNum)) {
            this.commitUnshift(arrItem);
          }
        }
      } else {
        if (this.commitTrue) {
          this.commitData(this.musicList);
          this.commitTrue = false;
        }
      }
    },
    handleScroll() {
      let sh = this.$refs["myScrollbar"].scrollHeight;
      let st = this.$refs["myScrollbar"].scrollTop;
      let ct = this.$refs["myScrollbar"].clientHeight;
      if (st >= sh - ct) {
        let path = this.$route.path;
        if (path == "/music/search") {
          if (this.musicList1.length == 30) {
            this.count = 0;
          }
          if (this.musicList1.length !== this.count + 30) {
            this.$mmToast("没有更多啦！");
            return;
          }

          this.count += 30;
          // console.log(this.count);
          searchKeyWords(this.value, this.count).then(res => {
            const { songs } = res.result;
            let resultData = workingData(songs);
            // console.log(resultData);
            resultData.forEach(item => {
              this.musicList1.push(item);
            });
          });
          return;
        }
        this.show = true;

        this.$refs["myScrollbar"].removeEventListener(
          "scroll",
          this.handleScroll
        );
      } else {
        this.show = false;
      }
    },
    menu(value) {
      //按钮状态切换
      let classArr = this.$refs.changeClass;
      let listItem = this.$refs["list-item"];
      let playNum = classArr[value].className;
      if (/icon-bofang/.test(playNum)) {
        listItem.forEach(item => {
          item.classList.remove("on");
        });
        classArr.forEach(item => {
          item.classList.replace("icon-zanting", "icon-bofang");
        });
        listItem[value].classList.add("on");
        classArr[value].classList.replace("icon-bofang", "icon-zanting");
      }
      if (/icon-zanting/.test(playNum)) {
        listItem[value].classList.remove("on");
        classArr[value].classList.replace("icon-zanting", "icon-bofang");
      }
    },
    menuClass(value) {
      let classArr = this.$refs.changeClass;
      let listItem = this.$refs["list-item"];
      let playNum = classArr[value].className;
      if (/icon-bofang/.test(playNum)) {
        listItem[value].classList.add("on");
        classArr[value].classList.replace("icon-bofang", "icon-zanting");
      }
    },
    deleteList() {
      this.$emit("deleteList");
      this.show = false;
      this.display = true;
      this.display1 = false;
    },
    ...mapMutations([
      "commitData",
      "commitNum",
      "commitConcat",
      "commitUnshift",
      "commitMenu"
    ])
  },
  activated() {
    this.timer = setTimeout(() => {
      this.isTrue = true;
    }, 200);
  },

  deactivated() {
    this.isTrue = false;
    clearTimeout(this.timer);
    this.$emit("handelDelete");
  },
  watch: {
    playNum(now, old) {
      //拿到vuex中的歌曲id值和当前页面歌曲数组musicList进行查找判断
      //如果为true就进行按钮状态和音乐动图切换
      const { id } = now;
      let arrItem = this.musicList.find(item => {
        return item.id == id;
      });

      if (arrItem) {
        let num = this.musicList.indexOf(arrItem);
        // console.log(arrItem, Math.min(num));
        this.$nextTick(() => {
          //异步获取改变
          this.menu(num);
        });
      }
    },
    musicList(now, old) {
      this.musicList1 = now;
      this.commitTrue = true;
      const { id } = this.playNum;
      if (id) {
        //拿到vuex中的歌曲id值和当前页面歌曲数组musicList进行查找判断
        let arrItem = now.find(item => {
          return item.id == id;
        });
        if (arrItem) {
          let num = now.indexOf(arrItem);
          this.$nextTick(() => {
            //调用函数异步获取里面dom
            if(this.playMenu){
              this.menuClass(num);
            }
          });
        }else{
          this.$nextTick(()=>{
            let classArr = this.$refs.changeClass;
            let listItem = this.$refs["list-item"];
            classArr.forEach(item => {
              item.classList.replace("icon-zanting", "icon-bofang");
            });
            listItem.forEach(item => {
              item.classList.remove("on");
            });
          })
        }
      }
    },
    musicArr() {
      this.display = false;
      this.display1 = true;
    },
    value() {
      this.count = 0;
    }
  },
  computed: {
    ...mapGetters(["playNum", "musicArr","playMenu"])
  }
};
</script>

<style lang="less" scoped>
.publicMusicList {
  position: relative;
  height: 100%;
  color: hsla(0, 0%, 100%, 0.6);
  .list-title {
    display: flex;
    height: 50px;
    text-align: left;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    line-height: 50px;
    overflow: hidden;
    color: #fff;
    .list-name {
      flex: 1;
      padding-left: 40px;
      user-select: none;
    }
    .list-artist {
      width: 300px;
    }
    .list-time {
      width: 60px;
    }
    .list-album {
      width: 300px;
    }
  }
  .list-content {
    height: calc(100% - 50px);
    overflow-x: hidden;
    overflow-y: auto;
    .list-item {
      display: flex;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
      line-height: 50px;
      overflow: hidden;
      .list-num {
        display: block;
        width: 30px;
        margin-right: 10px;
        text-align: center;
      }
      .list-name {
        position: relative;
        flex: 1;
        box-sizing: border-box;
        span {
          //display:block;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .list-menu {
          display: none;
          position: absolute;
          top: 50%;
          right: 10px;
          height: 100%;
          font-size: 0;
          transform: translateY(-50%);
          box-sizing: border-box;
        }
        .hover {
          font-size: 35px;
          &:hover {
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .list-artist,
      .list-album {
        display: block;
        width: 300px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .list-time {
        display: block;
        width: 60px;
        position: relative;
      }
    }
    .on {
      color: #fff;
      .list-num {
        font-size: 0;
        background: url("../../../assets/imges/wave.gif") no-repeat 50%;
      }
    }
    .list-item:hover .list-menu {
      display: block;
    }
    .loading {
      height: 40px;
      line-height: 40px;
      text-align: center;
      span:hover {
        color: #fff;
        cursor: pointer;
      }
    }
  }
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
  .fade-enter-active {
    transition: all 0.5s ease-in;
  }
  .fade-leave-active {
    transition: all 0.5s ease-in;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateY(-200px);
    opacity: 0;
  }
}
//滚动条
::-webkit-scrollbar {
  /*滚动条整体部分，其中的属性有width,height,background,border（就和一个块级元素一样）等*/
  background-color: rgba(0, 0, 0, 0.3);
  width: 5px; //纵向滚动条
  border-radius: 10px;
}

::-webkit-scrollbar-button {
  /*滚动条两端的按钮。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
  display: none;
}

::-webkit-scrollbar-track {
  /*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果。*/
  display: none;
  //background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-track-piece {
  /*内层轨道，滚动条中间部分（除去）。*/
  //background-color: rgba(255, 255, 255, .1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面可以拖动的那部分*/
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-corner {
  border-radius: 10px;
}

::-webkit-resizer {
  /*定义右下角拖动块的样式*/
  border-radius: 10px;
}

@media screen and (max-width: 960px) {
  .publicMusicList {
    .list-content {
      .list-item {
        .list-name {
          padding-right: 45px;
        }
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .publicMusicList {
    .list-title {
      .list-artist,
      .list-album {
        width: 200px;
      }
    }
    .list-content {
      .list-item {
        .list-artist,
        .list-album {
          width: 200px;
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .publicMusicList {
    .list-title {
      .list-artist,
      .list-album {
        width: 150px;
      }
    }
    .list-content {
      .list-item {
        .list-artist,
        .list-album {
          width: 150px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .publicMusicList {
    .list-title {
      .list-artist,
      .list-album {
        width: 20%;
      }
    }
    .list-content {
      .list-item {
        .list-artist,
        .list-album {
          width: 20%;
        }
        .list-name {
          .list-menu {
            display: block;
            right: 8px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .publicMusicList {
    .list-title {
      .list-artist {
        width: 80px;
      }
      .list-time,
      .list-album {
        display: none;
      }
    }
    .list-content {
      .list-item {
        .list-artist {
          width: 80px;
        }
        .list-time,
        .list-album {
          display: none;
        }
      }
    }
  }
}
</style>