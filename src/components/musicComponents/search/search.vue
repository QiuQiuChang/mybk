<template>
  <div class="search">
    <div class="search-header">
        <span v-for="(item,index) in hotArr" :key="index" @click="handelClick(item.first)">{{item.first}}</span>
        <input type="text" placeholder="音乐/歌手" class="search-input" ref="search-input">
    </div>
  </div>
</template>

<script>
import { searchHot , searchKeyWords } from '../../../api'
export default {
  name: 'search',
  data() { 
    return {
      hotArr:[]
    }
  },
  activated(){
    searchHot().then((res)=>{
      const {code,result} = res
      if(code == 200){
       let hotArr = result.hots.slice(0,5)
           this.hotArr = hotArr
      }
    })
  },
  methods:{
    handelClick(value){
      let searchInput = this.$refs['search-input']
          searchInput.value = value
          searchKeyWords(value).then((res)=>{
            const { songs } = res.result
            console.log(songs)
            let arr = []
            songs.forEach((item)=>{
              let obj = {}
              for(let key in item){
                  if(key == 'album'){
                      obj.al = item[key]
                  }else if(key == 'artists'){
                    obj.ar = item[key]
                  }else if(key == 'duration'){
                    obj.dt = item[key]
                  }else if(key == 'id'){
                    obj.id = item[key]
                  }else if(key == 'name'){
                    obj.name = item[key]
                  }
              }
              arr.push(obj)
            })
            console.log(arr)
          })
    }
  }
 }
</script>

<style lang="less" scoped>
.search{
  width:100%;
  height:100%;
  color: hsla(0,0%,100%,.6);
  // background-color: #fff;
  .search-header{
    display: flex;
    height: 40px;
    padding: 10px 15px;
    overflow: hidden;
    background: rgba(0,0,0,.2);
    span{
      line-height: 40px;
      margin-right: 15px;
      cursor: pointer;
      &:hover{
        color:#fff;
      }
    }
    .search-input{
      flex: 1;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid hsla(0,0%,100%,.6);
      outline: 0;
      background: transparent;
      color: #fff;
      font-size: 14px;
      -webkit-box-shadow: 0 0 1px 0 #fff inset;
      box-shadow: inset 0 0 1px 0 #fff;
      &::-webkit-input-placeholder{
        color: hsla(0,0%,100%,.6);
      }
    }
  }
}

</style>