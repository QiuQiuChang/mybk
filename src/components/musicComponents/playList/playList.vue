<template>
  <div class="playList" v-loading="loading" element-loading-background="rgba(0,0,0,0.2)">
    <publicMusicList :musicList="musicList" @deleteList="deleteList"></publicMusicList>
  </div>
</template>

<script>
import { getData } from "../../../api";
import publicMusicList from "../publicList/publicMusicList";
import { filterData } from "../../../utils/util"; //数据加工整理函数
import { mapGetters } from "vuex";
export default {
  name: "playList",
  components: {
    publicMusicList
  },
  data() {
    return {
      loading: true,
      musicList: [],
      musicList1: []
    };
  },
  activated() {
    const { id } = this.playNum;
    if (id) {
      this.musicList = this.musicArr;
    } else {
      this.musicList = this.musicList1;
    }
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },
  created() {
    if (this.musicArr.length > 0) {
      return;
    } else {
      getData()
        .then(res => {
          let result = res.playlist.tracks.slice(0, 100);
          let data = filterData(result);
          data.forEach(item => {
            let URL = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
            item.url = URL;
          });
          this.musicList = data;
          this.musicList1 = data;
        })
        .then(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    }
  },

  deactivated() {
    this.loading = true;
    this.musicList = [];
  },
  methods: {
    deleteList() {
      this.musicList = [];
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["playNum", "musicArr"])
  }
};
</script>

<style lang="less" scoped>
.playList {
  height: calc(100vh - 310px);
}
</style>