<template>
  <div class="home-wrap">
    <div class="section">
      <div class="photo">
        <img src="http://localhost:9875/imgs/myself.jpg" alt title="Author:邱~" />
      </div>
      <span>邱~</span>
      <div class="bg-content">
        <h1>燕十三</h1>
        <p>剑气纵横三万里,一剑光寒十九洲</p>
        <el-button type="primary" @click="enterMusic">Enter Music</el-button>
      </div>
      <i class="el-icon-arrow-down" @click="scroll"></i>
    </div>
    <div class="section1">
      <h2>热门英雄</h2>
      <ul>
        <li v-for="(item,index) in Article" :key="item._id" class="itemHero">
          <h3>{{item.title}}</h3>
          <hr />
          <div class="heroContent">
            <div class="pic" @click.prevent="showBanner(index)">
              <img v-lazy="`${item.surface}?param=80y80`"/>
            </div>
            <p>{{item.content}}</p>
          </div>
          <div class="read-more">
            <span @click="read(index+1)">&lt;&lt;继续阅读</span>
          </div>
        </li>
      </ul>
    </div>
    <transition name='fade'>   
      <Swiper v-if="isTrue" @shutDown="closeDown" :banner = "bannerBox"></Swiper>
    </transition>
  </div>
</template>

<script>
import Swiper from "../../swiper/swiper";
import { getArticle } from "../../../api";

export default {
  components: {
    Swiper
  },
  name: "home",
  data() {
    return {
      isTrue: false,
      hotArticle: [],
      bannerBox:[]
    };
  },
  created() {
    getArticle().then(res => {
      this.hotArticle = res.data;
    });
  },
  methods: {
    enterMusic() {
      this.$router.push({ path: "/music" });
    },
    scroll() {
      window.scrollTo({
        top: window.innerHeight - 60,
        behavior: "smooth"
      });
    },
    showBanner(index){
      this.isTrue = !this.isTrue
      this.bannerBox = this.Article[index].banner  
    },
    closeDown(){
      this.isTrue = !this.isTrue
    },
    read(value){
      this.$router.push({name:'articleinfo',params:{id:value}})
    },
  },
  computed: {
    Article() {
      return this.hotArticle;
    }
  }
};
</script>

<style lang="less" scoped>
.section {
  position: relative;
  height: calc(100vh - 60px);
  padding: 0;
  background-color: transparent;
  background-image: url("../../../assets/imges/11.jpg");
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  &::after {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .photo {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 50px;
    height: 60px;
    background-color: #eee;
    text-align: center;
    line-height: 60px;
    border-radius: 50%;
    z-index: 3;
    img {
      width: 40px;
      height: 50px;
      border-radius: 50%;
    }
  }
  span {
    position: absolute;
    top: 30px;
    left: 70px;
    color: #fff;
    z-index: 3;
  }
  .bg-content {
    position: absolute;
    width: 100%;
    height: 154px;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    z-index: 1;
    color: #fff;
    animation: run 1s ease-out;
    h1 {
      font-size: 30px;
      font-weight: 400;
      letter-spacing: 5px;
    }
    p {
      letter-spacing: 10px;
      margin: 20px 0;
    }
    .el-button {
      margin-top: 20px;
    }
  }
  @keyframes run {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(1);
    }
  }
  .el-icon-arrow-down {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    opacity: 1;
    margin: auto;
    z-index: 1;
    width: 50px;
    height: 50px;
    color: #fff;
    font-size: 40px;
    border-radius: 50%;
    font-weight: 700;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    border: none;
    transition: background-color 0.5s ease-out;
    animation: identifier 1s ease-out;
    &:hover {
      background-color: #6bc30d;
    }
  }
  @keyframes identifier {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }
}
.section1 {
  position: relative;
  margin: auto;
  padding-top: 80px;
  h2 {
    position: relative;
    padding-bottom: 30px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    &::after {
      position: absolute;
      content: "";
      height: 2px;
      width: 50px;
      background-color: #00c2ff;
      left: 50%;
      margin-left: -25px;
      bottom: -1px;
    }
  }
  .itemHero {
    position: relative;
    padding: 20px 30px 25px 30px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    transition: top, 1s, ease-out;
    h3 {
      padding: 10px 0;
      font-size: 20px;
      font-weight: 600;
    }
    .heroContent {
      overflow: hidden;
      min-height: 180px;
      margin-top: 20px;
      .pic {
        position: relative;
        overflow: hidden;
        float: left;
        width: 300px;
        height: 155px;
        cursor: pointer;
        &::after {
          content: "";
          height: 100%;
          width: 100px;
          transform: skewX(-25deg) translateZ(0);
          background-image: linear-gradient(
            90deg,
            hsla(0, 0%, 100%, 0),
            hsla(0, 0%, 100%, 0.3) 50%,
            hsla(0, 0%, 100%, 0)
          );
          position: absolute;
          left: -160%;
          top: 0;
          z-index: 2;
        }
        &:hover:after {
          transition: left 1s ease-in-out;
          left: 160%;
        }
        img {
          width: 100%;
          height:100%;
        }
      }
      p {
        float: right;
        width: calc(100% - 300px);
        padding-left: 50px;
        line-height: 25px;
        box-sizing: border-box;
      }
    }
    .read-more {
      position: relative;
      padding: 10px;
      &::after {
        content: " ";
        display: inline-block;
        height: 1px;
        top: 20px;
        left: 100px;
        right: 0;
        position: absolute;
        background-color: #d0d0d0;
      }
      span {
        font-weight: bold;
        color: #383937;
        user-select: none;
        &:hover {
          color: #6bc30d;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    &:nth-child(6) {
      .read-more {
        top: 8px;
      }
    }
    &:hover {
      top: -3px;
      box-shadow: 0 0 10px 8px #afe;
    }
  }
}
.fade-enter-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(.5);
  opacity: 0;
}
@media screen and (max-width: 767px) {
  .home-wrap {
    background-color: #eee;
  }
  .section {
    .bg-content {
      p {
        letter-spacing: 6px;
      }
    }
  }
  .section1 {
    width: 100%;
    padding-top: 50px;
    .itemHero {
      padding: 0 30px 25px 30px;
      h3 {
        font-size: 18px;
      }
      .heroContent {
        .pic {
          float: none;
          width: 100%;
        }
        p {
          float: none;
          width: 100%;
          padding: 20px 0 0 0;
        }
      }
      .read-more {
        top: 8px;
        &::after {
          top: 18px;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .section1 {
    width: 750px;
  }
}
@media screen and (min-width: 992px) {
  .section1 {
    width: 970px;
  }
}
@media screen and (min-width: 1200px) {
  .section1 {
    width: 1170px;
  }
}
</style>