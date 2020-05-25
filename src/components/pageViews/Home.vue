<template>
  <router-view></router-view>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  name: 'home',
  data() { 
    return {

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
}
</script>

<style lang="less" scoped>


</style>