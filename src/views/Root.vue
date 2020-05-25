<template>
  <div class="root">
    <Header></Header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
export default {
  name: "root",
  components: {
    Header
  },
  data(){
    return{
     
    }
  },
  methods:{
    
  }
};
</script>
<style lang="less" scoped>
.content {
  position:relative;
  margin-top: 60px;
}
</style>
