<template>
  <div :class="['wrap']" v-loading="loading" element-loading-background="#fff">
    <transition name="fade">
      <div v-html="renderInfo" v-if="isTrue" class="articleInfo"></div>
    </transition>
  </div>
</template>

<script>
import { getArticleInfo } from "../../../api";
export default {
  name: "articleInfo",
  data() {
    return {
      loading: true,
      isTrue: false,
      renderInfo: ""
    };
  },
  created() {
    //console.log(this.$route.params);
    const { id } = this.$route.params;
    new Promise((res, rej) => {
      setTimeout(() => {
        getArticleInfo(id).then(res => {
          this.renderInfo = res.content;
        });
        res();
      }, 800);
    })
      .then(() => {
        this.loading = false;
      })
      .then(() => {
        this.isTrue = true;
      });
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: calc(100vh - 60px);
}
.off {
  height: 0;
}
.articleInfo {
  background-color: #fff;
  & /deep/ .news_h1 {
    text-align: center;
    font-size: 24px;
    line-height: 40px;
    color: #09090c;
    padding-top: 20px;
    font-weight: 600;
  }
  & /deep/ .news_contet {
    width: 800px;
    margin: 0 auto;
    line-height: 25px;
    padding: 15px 0 0;
    font-size: 14px;
    color: #333;
    p {
      margin: 10px 0;
      &:last-child{
        margin-bottom:0;
      }
      a {
        display: block;
        text-indent: 0;
        img {
          width: 100%;
        }
      }
      strong{
        font-weight: bold;
      }
    }
  }
}
.fade-enter-active {
  transition: all 0.8s;
}
.fade-leave-active {
  transition: all 0.8s;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(0.5);
  opacity: 0;
}
@media screen and (max-width: 768px) {
  .articleInfo {
    & /deep/ .news_h1 {
      font-size: 18px;
      line-height: 20px;
    }
    & /deep/ .news_contet {
      width: 100%;
      padding: 15px 30px 0;
      box-sizing: border-box;
    }
  }
}
</style>