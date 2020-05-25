<template>
  <div class="wrap">
    <div class="swiper-box">
      <!-- swiper1 -->
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="(item,index) in banner" :key='index'>
          <img :src="item.pic" alt="">
          <span>{{item.name}}</span>
        </swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="(item,index) in banner" :key='index'>
          <img :src="item.pic" alt="">
        </swiper-slide>
      </swiper>
    </div>
    <span class="menu" @click="shutDown"></span>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props:['banner'],
  name: "swiper-box",
  data() {
    return {
      swiperOptionTop: {
        effect : 'cube',
        // fadeEffect: {
        //   crossFade: true,
        // },
        // orderType: 0,
        spaceBetween: 10,
          loop: true,
          loopedSlides: 4, //looped slides should be the same
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0,
          loop: true,
          loopedSlides: 4, //looped slides should be the same
          autoplay: {
            delay: 4000,
            speed: 1500,
            disableOnInteraction: true	//点击小图之后停止自动轮播
        },
        slideToClickedSlide: true,
        centeredSlides: true,
        freeMode: true
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  methods:{
    shutDown(){
      this.$emit("shutDown")
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  position: fixed;
  display:flex;
  align-items: center;
  width:100%;
  height:100vh;
  padding-top:60px;
  top:0;
  left:0;
  background-color: rgba(0,0,0,.7);
  z-index: 10;
  .swiper-box {
    margin: 0 auto;
    .swiper-container {
      background-color: #000;
      &.gallery-top {
        height: 500px;
        width: 100%;
        .swiper-slide {
          position:relative;
          img{
            width:100%;
            height:100%;
          }
          span{
            position:absolute;
            top:10px;
            left:0;
            right:0;
            height:20px;
            color:#FFD700;
            line-height: 20px;
            text-align: center;
            font-size:16px;
            font-weight: 600;
          }
        }
        .swiper-button-next.swiper-button-white,
        .swiper-button-prev.swiper-button-white {
          color: #fff;
        }
      }
      &.gallery-thumbs {
        box-sizing: border-box;
        padding: 10px;
        .swiper-slide {
          width: 25% !important;
          height: 100px;
          opacity: 0.4;
          margin-right: 10px;
          img{
            width:100%;
            height:100%;
          }
        }
        .swiper-slide-active {
          opacity: 1;
        }
      }
    }
  }
  .menu{
    position:absolute;
    width:40px;
    height:40px;
    top:90px;
    right:90px;
    background-color:rgba(0,0,0,.2);
    border-radius: 50%;
    border:2px solid #fff;
    cursor: pointer;
    transition: background-color 0.5s ease-out;
    z-index: 20;
    &::before{
      position:absolute;
      content:"";
      top:19px;
      left:8px;
      height:3px;
      width:25px;
      background-color: #fff;
      border-radius: 1px;
      transform: rotate(-50deg);
    }
    &::after{
      position:absolute;
      content:"";
      top:19px;
      left:8px;
      height:3px;
      width:25px;
      background-color: #fff;
      border-radius: 1px;
      transform: rotate(50deg);
    }
    &:hover{
      background-color: #6bc30d;
    }
  }
}
@media screen and (max-width: 767px) {
  .wrap{
    .swiper-box{
      width:100%;
      .swiper-container{
        &.gallery-top{
          height: 200px;
        }
      }
    }
    .menu{
      width:25px;
      height:25px;
      top:70px;
      right:20px;
      &::before,&::after{
        height:1px;
        width:20px;
        top:12px;
        left:3px;
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .swiper-box {
    width: 750px;
  }
}
@media screen and (min-width: 992px) {
  .swiper-box {
    width: 970px;
  }
}
@media screen and (min-width: 1200px) {
  .swiper-box {
    width: 1170px;
  }
}
</style>
