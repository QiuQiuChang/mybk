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
      <el-col :md="6" class="hidden-sm-and-down">myPlayer</el-col>
    </el-row>
  </div>
</template>

<script>
import musicBtn from "../music-btn/music-btn";
export default {
  name: "musicMain",
  components: {
    musicBtn
  },
  data() {
    return {};
  },
  created(){},
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
    // .list-title {
    //   display: flex;
    //   height: 50px;
    //   text-align: left;
    //   border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    //   line-height: 50px;
    //   overflow: hidden;
    //   .list-name {
    //     flex: 1;
    //     padding-left: 40px;
    //     user-select: none;
    //   }
    //   .list-time {
    //     width: 60px;
    //   }
    // }
  }
  .el-col:nth-child(2) {
    height: calc(100vh - 200px);
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