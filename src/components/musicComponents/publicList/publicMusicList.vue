<template>
  <div class="publicMusicList" ref="myScrollbar" v-show="isTrue">
    <div class="list-content">
      <div
        v-for="(item,index) in musicList"
        :key="item.id"
        class="list-item"
        ref="list-item"
      >
        <span class="list-num">{{index+1}}</span>
        <div class="list-name">
          <span>{{item.name}}</span>
          <div class="list-menu">
            <i class="iconfont hover icon-bofang" @click.stop="play(index)" ref="changeClass"></i>
          </div>
        </div>
        <span class="list-artist">{{item.ar}}</span>
        <span class="list-time">
          {{'0' + parseInt(Math.floor(item.dt/1000)/60)+':'+(Math.floor(item.dt/1000)%60>=10?Math.floor(item.dt/1000)%60:'0'+Math.floor(item.dt/1000)%60)}}
          <i></i>
        </span>
      </div>
    </div>
    <div class="loading" v-show="show">
      <span>{{loadingText}}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { filterData }  from '../../../utils/util'
export default {
  name: "publicMusicList",
  props:['originalData'],
  data() {
    return {
      musicList: [],
      show: false,
      isTrue:false,
      data:[],
      count:'',
      barMenu:false,
      loadingText: "加载更多...",
    }; 
  },
  methods: {
    play(num) {
      let classArr = this.$refs['changeClass']
      let playNum = classArr[num].className
      
      this.$emit('changeNum',num)
      this.count = num
      //提交状态
        this.commitMenu();
        this.barMenu = true;
      if (/icon-bofang/.test(playNum)) {
        this.commitData(this.musicList);
        this.commitData(this.data);
        this.commitConvert(this.originalData)
      }
    },
    handleScroll() {
      let sh = this.$refs["myScrollbar"].scrollHeight;
      let st = this.$refs["myScrollbar"].scrollTop;
      let ct = this.$refs["myScrollbar"].clientHeight;

      if (st >= sh - ct) {
        this.show = true;

        this.$refs["myScrollbar"].removeEventListener(
          "scroll",
          this.handleScroll
        );
        setTimeout(() => {
          let data1 = this.originalData.playlist.tracks.slice(50, 100);
          let resultList = filterData(data1);
          resultList.forEach(item => {
            this.musicList.push(item);
          });
          this.loadingText = "没有更多啦~";
        }, 500);
      }
    },
    menu(value){
      //按钮状态切换
      let classArr = this.$refs.changeClass;
      let listItem = this.$refs['list-item'];
      let playNum  = classArr[value].className
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
    ...mapMutations(["commitData", "commitMenu","commitConvert"])
  },
  mounted() {},
  activated(){
    let ele = this.$refs["myScrollbar"];
    ele.addEventListener("scroll", this.handleScroll);
    if(this.count != ''){
        this.menu(this.count)
      }
  },
  deactivated(){
    this.barMenu = false;
    this.isTrue = false
    this.loadingText = "加载更多...";
  },
  watch: {
    originalData(now, old) {
      let data1 = now.playlist.tracks.slice(0, 50);
      //调用方法
        this.musicList = filterData(data1)
        setTimeout(()=>{
          this.isTrue = true
        },300)
      let result = now.playlist.tracks.slice(0, 100);
      let data = filterData(result);
      data.forEach(item => {
        let URL = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
        item.url = URL;
      });
      this.data = data
      // this.commitData(data);
    },
    playMenu(now,old) {
      if(this.count != ''){
        this.menu(this.count)
      }
    },
    playNum(now,old){
      console.log(1)
      if(this.barMenu){
        
          
      }
      this.count = now
          this.menu(now)
    },
  },
  computed: {
    ...mapGetters(["playMenu", "playNum"]),
    
  }
};
</script>

<style lang="less" scoped>
.publicMusicList {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  color: hsla(0, 0%, 100%, 0.6);
  .list-content {
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
          font-size:35px;
          &:hover {
            color: #fff;
            cursor: pointer;
          }
        }
      }
      .list-artist {
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
  }
  .loading {
    height: 40px;
    line-height: 40px;
    text-align: center;
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
    .list-content {
      .list-item {
        .list-artist {
          width: 200px;
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .publicMusicList {
    .list-content {
      .list-item {
        .list-artist {
          width: 150px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .publicMusicList {
    .list-content {
      .list-item {
        .list-artist {
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
    .list-content {
      .list-item {
        .list-artist {
          width: 80px;
        }
        .list-time {
          display: none;
        }
      }
    }
  }
}
</style>