<template>
  <div class="headerTop">
    <el-container>
      <el-header>
        <el-row>
          <el-col :xs="9" :sm="6">
            <el-menu background-color="#545c64">
              <el-menu-item>
                <a href="https://element.eleme.cn/">
                  <img src="../assets/imges/logo.png" alt />
                </a>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :xs="15" :sm="18">
            <div class="downMenu hidden-sm-and-up">
                <el-button @click="show3 = !show3">
                  <i class="iconfont icon-fenlei"></i>
                </el-button>
                <el-collapse-transition>
                  <div v-show="show3" class="downMenu-wrap">
                    <div
                      class="transition-box"
                      v-for="(item,key) in itemList"
                      :key="key"
                      @click="handleClick(key)"
                    >{{item.menu}}</div>
                  </div>
                </el-collapse-transition>
            </div>
            <ul class="el-menu-demo hidden-xs-only">
              <router-link v-for="(item,index) in itemList" :to="item.path" :key="index" tag="li">
                  <i :class="['iconfont',item.icon]"></i>{{item.menu}}
              </router-link>
            </ul>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>
    <script>
// @ is an alias to /src
export default {
  name: "headerTop",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      show3: false,
      itemList: [
        { menu: "首页",path:'/home' },
        { menu: "个人中心",path:'/user',icon:'icon-gerenzhongxin' },
        { menu: "Music",path:'/music',icon:'icon-yinle' },
        { menu: "登录",path:'/login',icon:'icon-denglu' },
        { menu: "注册",path:'/register',icon:'icon-zhucehuiyuan' }
      ]
    };
  },
  created() {},
  methods: {
    handleClick(key) {
      let value = key + 1;
      switch (value) {
        case 1:
          this.$router.push({ name: "home" });
          this.show3 = !this.show3;
          break;
        case 2:
          this.$router.push({ path: "/user" });
          this.show3 = !this.show3;
          break;
        case 3:
          this.$router.push({ path: "/music" });
          this.show3 = !this.show3;
          break;
        case 4:
          this.$router.push({ path: "/login" });
          this.show3 = !this.show3;
          break;
        case 5:
          this.$router.push({ path: "/register" });
          this.show3 = !this.show3;
          break;
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.headerTop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(84, 92, 100);
  z-index: 100;
  .el-container {
    margin: 0 auto;
    box-sizing: border-box;
    .el-header {
      padding: 0;
      .el-row {
        .el-col{
          height:60px;
          .iconfont {
            margin-right: 2px;
            font-size: 25px;
          }
          .el-menu {
            display: flex;
            justify-content: start;
            height: 100%;
            border: none;
            .el-menu-item {
              height: 100%;
              img{
                width:100%;
              }
            }
          }
          .downMenu {
            text-align: right;
            .el-button {
              padding: 17px 20px;
              border: 0;
              background-color: rgb(84, 92, 100);
              color: #fff;
              border-radius: 0;
              &:hover {
                background-color: rgb(64, 72, 80);
                color: blueviolet;
              }
            }
            .downMenu-wrap {
              position: absolute;
              top: 70px;
              right: 10px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              .transition-box {
                padding: 10px;
                line-height: 15px;
                background-color: #fff;
                text-align: center;
                color: #606266;
                box-sizing: border-box;
              }
              .transition-box:hover {
                background-color: #ecf5ff;
                color: #66b1ff;
              }
            }
            .downMenu-wrap::before {
              position: absolute;
              top: -13px;
              left: 60%;
              display: block;
              content: "";
              border-bottom: 8px solid #eee;
              border-top: 5px solid transparent;
              border-right: 5px solid transparent;
              border-left: 5px solid transparent;
            }
          }
          .el-menu-demo {
            display: flex;
            justify-content: flex-end;
            height: 100%;
            border: none;
            li{
              width:95px;
              color: rgb(255, 255, 255);
              text-align: center;
              line-height: 60px;
              user-select: none;
              &:hover{
                background-color:rgb(67,74,80);
                cursor: pointer;
              }
              i{
                vertical-align: middle;
              }
            }
            .active{
              color: rgb(255, 208, 75);
              border-bottom-width: 2px;
              border-bottom-color: rgb(255, 208, 75);
              border-bottom-style: solid;
              background-color: rgb(84, 92, 100);
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .el-container {
    width: 750px;
  }
}
@media screen and (min-width: 992px) {
  .el-container {
    width: 970px;
  }
}
@media screen and (min-width: 1200px) {
  .el-container {
    width: 1170px;
  }
}
</style>
