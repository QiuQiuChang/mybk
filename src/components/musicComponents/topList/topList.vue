<template>
  <div class="wrap" v-loading="loading" element-loading-background="rgba(0,0,0,0.2)">
    <div class="topList" v-show="!loading">
      <div class="topList-heade">云音乐特色榜</div>
      <div class="topList-content">
        <div
          class="list-item"
          v-for="item in featuresData"
          :key="item.id"
          :title="item.description"
        >
          <router-link :to="{path:`/music/details/${item.id}`}" tag="div" class="topList-item">
            <div class="topList-img">
              <img v-lazy="`${item.coverImgUrl}?param=300y300`" class="cover-img" />
            </div>
            <h3 class="name">{{item.name}}</h3>
          </router-link>
        </div>
      </div>
      <div class="topList-heade">推荐歌单</div>
      <div class="topList-content">
        <div class="list-item" v-for="item in recommendData" :key="item.id" :title="item.name">
          <router-link :to="{path:`/music/details/${item.id}`}" tag="div" class="topList-item">
            <div class="topList-img">
              <img v-lazy="`${item.picUrl}?param=300y300`" class="cover-img" />
            </div>
            <h3 class="name">{{item.name}}</h3>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFeatures, getRecommend } from "../../../api";
export default {
  name: "",
  data() {
    return {
      loading: true,
      featuresData: [],
      recommendData: []
    };
  },
  mounted() {
    getFeatures()
      .then(res => {
        let featuresArr = res.list.slice(0, 4);
        this.featuresData = featuresArr;
      })
      .then(() => {
        getRecommend()
          .then(res => {
            this.recommendData = res.result;
          })
          .then(() => {
            setTimeout(() => {
              this.loading = false;
            }, 300);
          });
      });
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  .topList {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &-heade {
      width: 100%;
      height: 34px;
      line-height: 34px;
      padding: 20px 0;
      font-size: 18px;
      color: #fff;
    }
    &-content {
      overflow: hidden;
    }
    .list-item {
      float: left;
      width: calc(~"100% / 7");
      .topList-item {
        width: 130px;
        text-align: center;
        cursor: pointer;
        margin: 0 auto 20px;
        &:hover {
          color: #fff;
        }
        .name {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      @media (max-width: 1100px) {
          width: 80%;
        }
      }
      @media (max-width: 1500px) {
        width: calc(~"100% / 6");
      }
      @media (max-width: 1400px), (max-width: 960px) {
        width: calc(~"100% / 5");
      }
      @media (max-width: 1280px), (max-width: 768px) {
        width: calc(~"100% / 4");
      }
      @media (max-width: 540px) {
        width: calc(~"100% / 3");
      }
      .topList-img {
        position: relative;
        padding-top: 100%;
        width: 100%;
        height: 0;
        .cover-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
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
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-corner {
  border-radius: 10px;
}

::-webkit-resizer {
  /*定义右下角拖动块的样式*/
  border-radius: 10px;
}
</style>