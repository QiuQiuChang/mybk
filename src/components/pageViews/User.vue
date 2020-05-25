<template>
  <div class="user-wrap">
    <div class="title">{{nickName}}</div>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:9875/picture"
      :headers="headers" 
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <Table :userInfo = 'userInfo' @getData="getData"></Table>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { profile } from "../../api";
import Table from "../musicComponents/profile/profile"
export default {
  name: "profile",
  components:{
    Table
  },
  data() {
    return {
      loading: true,
      imageUrl: "",
      i: 0,
      str: "Hi~:",
      nickName: "",
      timer: 0,
      headers:{
        Authorization: Cookies.get('token') ||''
      },
      userInfo:''   
    };
  },
 
  beforeRouteEnter(to, from, next) {
    const token = Cookies.get("token");
    if (token) {
      next();
    } else {
      next(vm => {
        vm.$mmToast("你还没登录，请先登录！");
        vm.$router.replace({ path: "/login" });
        return;
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    const token = Cookies.get("token");
    if (token && to.path == "/login") {
      this.$mmToast("你已经登录过了，不需要重复登录！");
      return;
    }
    if (token && to.path == "/register") {
      this.$mmToast("你已经登录过，不需要再注册了！");
      return;
    }
    next();
  },
  created() {
    const token = Cookies.get("token");
    if (token) {
      profile(token).then(res => {
        //console.log(res);
        this.userInfo = res
        this.str += res.name;
        this.imageUrl = res.pic
      });
    }
    return;
  },
  mounted() {
    this.typing();
  },
  methods: {
    typing() {
      if (this.i <= this.str.length) {
        this.nickName = this.str.slice(0, this.i++) + "_";
        this.timer = setTimeout(() => {
          this.typing();
        }, 200);
      } else {
        this.nickName = this.str + "!";
        clearTimeout(this.timer);
      }
    },
    handleAvatarSuccess(res, file) {
      this.$mmToast(res.message)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$mmToast("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$mmToast("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getData(message){
      const token = Cookies.get("token");
      if (token) {
        profile(token).then(res => {
          //console.log(res);
          this.userInfo = res
          this.$mmToast(message)
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-wrap {
  position:relative;
  height: calc(100vh - 60px);
  margin: 0 auto;
  background-color: #fff;
  .title {
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: yellowgreen;
    font-size: 50px;
    font-family: monospace;
    letter-spacing: 5px;
  }
  .avatar-uploader{
    position:absolute;
    top:12px;
    left:150px;
    & /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
      .avatar {
        width: 80px;
        height: 80px;
        display: block;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
  }
  }
  
}
@media screen and (max-width: 767px) {
  .user-wrap {
    .title{
      height: 80px;
      font-size:22px;
      line-height:80px;
    }
    .avatar-uploader{
      display:none;
    }
  }
}
@media screen and (min-width: 768px) {
  .user-wrap {
    width: 768px;
  }
}
@media screen and (min-width: 992px) {
  .user-wrap {
    width: 100%;
  }
}
@media screen and (min-width: 1200px) {
  .user-wrap {
    width: 90%;
  }
}
</style>