export const filterData = (data) =>{
      //封装函数方法，将请求回来的进行数据处理
    let musicList1 = [];
    let arr = [];
    let result = data[0];
    for (let key in result) {
      if (
        key == "name" ||
        key == "id" ||
        key == "ar" ||
        key == "al" ||
        key == "dt"
      ) {
        arr.push(key);
      }
    }
    data.forEach(item => {
      let obj = {};
      arr.forEach(item1 => {
        obj[item1] = item[item1];
      });
      musicList1.push(obj);
    });
    musicList1.forEach(value => {
      let ar = [];

      for (let a of value.ar.values()) {
        ar.push(a.name);
      }
      value.ar = ar.join("/");
    });
    return musicList1;
    }
export const workingData = (data) =>{
    let arr = []
    data.forEach((item)=>{
      let obj = {}
      for(let key in item){
          if(key == 'album'){
              obj.al = item[key]
          }else if(key == 'artists'){
            if(item[key].length>=2){
                obj.ar = item[key][0].name + '/' + item[key][1].name
            }else{
                obj.ar = item[key][0].name
            }
          }else if(key == 'duration'){
            obj.dt = item[key]
          }else if(key == 'id'){
            obj.id = item[key]
          }else if(key == 'name'){
            obj.name = item[key]
          }
      }
      let URL = `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`;
          obj.url = URL
          arr.push(obj)
    })
    return arr
}
  

