<template>
  <div class="search">
    <div class="search-header">
      <span
        v-for="(item,index) in hotArr"
        :key="index"
        @click="handelClick(item.first)"
      >{{item.first}}</span>
      <input
        type="text"
        placeholder="音乐/歌手"
        class="search-input"
        ref="search-input"
        @keyup.enter="onChange"
      />
    </div>
    <div class="search-content" v-loading="loading" element-loading-background="rgba(0,0,0,0.2)">
      <publicMusicList :musicList="musicList" :value="value" v-show="isShow"></publicMusicList>
      <div class="delete-mask" v-show="display">
        <transition name="fade">
          <p v-if="display">弄啥呢，啥也没有呢！！！</p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { searchHot, searchKeyWords } from "../../../api";
import { workingData } from "../../../utils/util";
import publicMusicList from "../publicList/publicMusicList";
export default {
  name: "search",
  components: {
    publicMusicList
  },
  data() {
    return {
      isShow: false,
      loading: false,
      display: false,
      hotArr: [],
      musicList: [],
      value: ""
    };
  },
  activated() {
    searchHot().then(res => {
      const { code, result } = res;
      if (code == 200) {
        let hotArr = result.hots.slice(0, 5);
        this.hotArr = hotArr;
      }
    });
    if (this.musicList.length == 0) {
      this.display = true;
    }
  },
  deactivated() {
    this.display = false;
  },
  methods: {
    handelClick(value) {
      let searchInput = this.$refs["search-input"];
      this.loading = true;
      searchInput.value = value;
      this.value = value;
      searchKeyWords(value, 0)
        .then(res => {
          const { songs } = res.result;
          let resultData = workingData(songs);
          this.musicList = resultData;
        })
        .then(() => {
          this.isShow = true;
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    },
    onChange(e) {
      let key = e.target.value;
      if (key) {
        this.loading = true;
        this.value = key;
        searchKeyWords(key, 0)
          .then(res => {
            const { songs } = res.result;
            let resultData = workingData(songs);
            this.musicList = resultData;
          })
          .then(() => {
            this.isShow = true;
            setTimeout(() => {
              this.loading = false;
            }, 300);
          });
      } else {
        this.$mmToast("搜索内容不能为空！");
      }
    }
  },
  watch: {
    musicList() {
      this.display = false;
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 100%;
  color: hsla(0, 0%, 100%, 0.6);
  .search-header {
    display: flex;
    height: 40px;
    padding: 10px 15px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
    span {
      line-height: 40px;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .search-input {
      flex: 1;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid hsla(0, 0%, 100%, 0.6);
      outline: 0;
      background: transparent;
      color: #fff;
      font-size: 14px;
      -webkit-box-shadow: 0 0 1px 0 #fff inset;
      box-shadow: inset 0 0 1px 0 #fff;
      &::-webkit-input-placeholder {
        color: hsla(0, 0%, 100%, 0.6);
      }
    }
  }
  .search-content {
    position: relative;
    height: calc(100% - 60px);
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
    .fade-enter{
      transform: translateY(-200px);
      opacity: 0;
    }
    .fade-enter-active {
      transition: all 0.5s ease-in;
    }
  }
  @media screen and (max-width: 640px) {
    .search-header {
      span {
        display: none;
      }
    }
  }
}
</style>