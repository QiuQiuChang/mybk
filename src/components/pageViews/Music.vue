<template>
  <div class="musicView">
    <div class="bg-wrap">
      <Header></Header>
      <Main></Main>
      <Footer @changePic="changePic"></Footer>
      <div class="bg-player"></div>
      <div class="bg-mask"></div>
    </div>
  </div>
</template>

<script>
import Header from "../musicComponents/body-music/Header";
import Main from "../musicComponents/body-music/Main";
import Footer from "../musicComponents/body-music/Footer";
import Cookies from "js-cookie";
export default {
  name: "musicView",
  components: {
    Header,
    Main,
    Footer
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    let bgPlayer = document.getElementsByClassName("bg-player")[0];
    bgPlayer.style.backgroundImage =
      'url("http://qiuchang.xyz:9875/imgs/bg.jpg")';
  },
  methods: {
    changePic(value) {
      let bgPlayer = document.getElementsByClassName("bg-player")[0];
      bgPlayer.style.backgroundImage = `url(${value}?param=200y200)`;
    }
  },
  beforeRouteEnter(to, from, next) {
    const token = Cookies.get("token");
    if (token) {
      next();
    } else {
      next(vm => {
        vm.$mmToast("你还没登录，请先登录！");
        setTimeout(() => {
          vm.$router.replace({ path: "/login" });
        }, 800);
      });
    }
  },
  beforeRouteLeave (to, from, next) {
    const token = Cookies.get("token");
    if (token && to.path == '/login') {
      this.$mmToast("你已经登录过了，不需要重复登录！");
      return
    }
    if(token && to.path == '/register'){
      this.$mmToast("你已经登录过，不需要再注册了！");
      return
    }
    next()
  },
};
</script>

<style lang="less" scoped>
.bg-wrap {
  position: relative;
  height: calc(100vh - 60px);
  margin: auto;
  padding: 0 15px;
  box-sizing: border-box;

  .bg-player {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    filter: blur(15px);
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    transition: all 0.8s;
  }
  .bg-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
@media screen and (min-width: 768px) {
  .bg-wrap {
    width: 768px;
  }
}
@media screen and (min-width: 992px) {
  .bg-wrap {
    width: 100%;
  }
}
@media screen and (min-width: 1200px) {
  .bg-wrap {
    width: 90%;
  }
}
</style>