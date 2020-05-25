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
  

