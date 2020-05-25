<template>
  <div class="music-btn">
    <router-link to="/music/playList" tag="span">正在播放</router-link>
    <router-link to="/music/topList" tag="span">推荐</router-link>
    <router-link to="/music/search" tag="span">搜索</router-link>
    <router-link class="none-414" to="/music/mylist" tag="span">我的歌单</router-link>
    <router-link to="/music/historylist" tag="span">我听过的</router-link>
  </div>
</template>

<script>
export default {
  name: "music-btn",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.music-btn {
  display: flex;
  width: 100%;
  font-size: 0;
  height: 60px;
  span {
    display: inline-block;
    height: 40px;
    box-sizing: border-box;
    margin-right: 8px;
    padding: 0 23px;
    border: 1px solid hsla(0, 0%, 100%, 0.6);
    color: hsla(0, 0%, 100%, 0.6);
    border-radius: 2px;
    font-size: 14px;
    line-height: 40px;
    overflow: hidden;
    cursor: pointer;
  }
  span:hover {
    color: #fff;
    border-color: #ffff;
  }
  .active {
    color: #fff;
    border-color: #ffff;
  }
}
@media screen and (max-width: 768px) {
  .music-btn {
    height: 50px;
    span {
      height: 35px;
      padding: 0 10px;
      margin-right: 6px;
      line-height: 35px;
    }
  }
}
@media screen and (max-width: 413px){
  .music-btn .none-414 {
    display: none;
  }
}
</style>