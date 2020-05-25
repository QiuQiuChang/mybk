<template>
<div class="form-wrap">
    <table>
        <thead>
            <tr>
                <th>栏目</th>
                <th>内容</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>用户名</th>
                <th>{{userInfo.name}}</th>
                <th></th>
            </tr>
            <tr>
                <th>性别</th>
                <th>
                    <div v-show="isTrue">{{userInfo.sex || '保密'}}</div>
                    <div class="sex" v-show="!isTrue">
                        <input type="radio" name="gender" value="男" id="man" v-model="info.sex"><label for="man">男</label>
                        <input type="radio" name="gender" value="女" id="woman" v-model="info.sex"><label for="woman">女</label>
                    </div>
                </th>
                <th><el-button type="primary" @click="change">编辑</el-button></th>
            </tr>
            <tr>
                <th>年龄</th>
                <th>
                    <div v-show="isTrue1">{{userInfo.age || '保密'}}</div>
                    <div class="public" v-show="!isTrue1">
                        <input type="number" v-model.number='info.age' placeholder="请输入年龄" max="100" min="0">
                    </div>
                </th>
                <th><el-button type="primary" @click="change1">编辑</el-button></th>
            </tr>
            <tr>
                <th>邮箱</th>
                <th>{{userInfo.email}}</th>
                <th></th>
            </tr>
            <tr>
                <th>手机号</th>
                <th>
                    <div v-show="isTrue2">{{userInfo.tell || '保密'}}</div>
                    <div class="public" v-show="!isTrue2">
                        <input type="number" v-model.number='info.phoneNumber' placeholder="请输入手机号">
                    </div>
                </th>
                <th><el-button type="primary" @click="change2">编辑</el-button></th>
            </tr>
            <tr>
                <th>个性签名</th>
                <th>
                    <div v-show="isTrue3">{{userInfo.signature||'快说点什么吧......'}}</div>
                    <div class="public" v-show="!isTrue3">
                        <input type="text" v-model='info.signature' :placeholder="userInfo.signature">
                    </div>
                </th>
                <th><el-button type="primary" @click="change3">编辑</el-button></th>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th><input type="submit" value="保存修改" @click="submit"></th>
            </tr>
        </tfoot>
    </table>
</div>
</template>
<script>
import { postProfile } from '../../../api'
  export default {
    name:'',
    props:['userInfo'],
    data() {
      return {
          info:{
              sex:'',
              age:'',
              phoneNumber:'',
              signature:'',
        },
        isTrue:true,
        isTrue1:true,
        isTrue2:true,
        isTrue3:true
      }
    },
    methods: {
        change(){
            this.isTrue = !this.isTrue
        },
        change1(){
            this.isTrue1 = !this.isTrue1 
        },
        change2(){
            this.isTrue2 = !this.isTrue2 
        },
        change3(){
            this.isTrue3 = !this.isTrue3 
        },
        submit(){
            if(this.info.sex||this.info.age||this.info.phoneNumber||this.info.signature){
                this.info.email = this.userInfo.email
                postProfile(this.info).then(res=>{
                    if(res.code == 416){
                        this.$mmToast(res.message)
                    }
                    if(res.code == 200){
                        this.$emit('getData',res.message)
                        setTimeout(()=>{
                            this.isTrue = true
                            this.isTrue1 = true
                            this.isTrue2 = true
                            this.isTrue3 = true
                            this.info.sex = ""
                            this.info.age = ''
                            this.info.phoneNumber = ''
                            this.info.signature = ''
                        },1000)
                    }
                 })
            }
        }
    }
  }
</script>

<style lang="less" scoped>
.form-wrap{
    width:80%;
    margin:0 auto;
    padding:50px 50px;
    background-color: rgba(0,0,0,.2);
    table{
        margin-top:30px;
        width:100%;
        color: #666;
        thead{
            width:100%;
            background-color: #f2f2f2;
            tr{
                border-width:1px;
                border-style: solid;
                border-color:#e6e6e6;
                th{
                    width:20%;
                    padding: 9px 15px;
                    border-width:1px;
                    border-style: solid;
                    border-color:#e6e6e6;
                    &:nth-child(2){
                        width:50%;
                    }
                }
            }
        }
        tbody{
            width:100%;
            tr{
                border-width:1px;
                border-style: solid;
                border-color:#e6e6e6;
                &:hover{
                    background-color: #f2f2f2;
                }
                th{
                    width:20%;
                    padding: 9px 15px;
                    line-height:40px;
                    border-width:1px;
                    border-style: solid;
                    border-color:#e6e6e6;
                    &:nth-child(2){
                        width:50%;
                        font-weight:normal;
                    }
                    &:nth-child(1){
                        font-weight: bold;
                    }
                    
                    .sex{
                        input{
                            margin-right:2px;
                        }
                        label{
                           margin-right:10px;
                        }
                    }
                    .public{
                        input{
                         height:35px;
                         width:190px; 
                         text-indent: 8px;
                         font-size:12px;
                        }
                        input::-webkit-outer-spin-button,
                        input::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                        }
                        input[type="number"]{
                            -moz-appearance: textfield;
                        }
                    }
                    .email{
                        background-color: #ccc;
                        color:#666;
                    }
                }
            }
        }
        tfoot{
            tr{
                th{
                    padding: 9px 15px;
                    line-height: 40px;
                    input{
                        padding: 12px 30px;
                        color: #FFF;
                        background-color: #67C23A;
                        border-color: #67C23A;
                        border-radius: 4px;
                        &:hover{
                            background: #85ce61;
                            border-color: #85ce61;
                            color: #FFF;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 767px) {
    .form-wrap{
        width:100%;
        padding:10px;
        background-color: rgba(0,0,0,.2);
        box-sizing: border-box;
        table{
            width:100%;
            margin-top:0;
            color: #666;
            thead{
                tr{
                    th{
                        padding: 5px;
                        height: 30px;
                        border: 1px solid #e6e6e6;
                        font-size: 14px;
                        font-weight: bold;
                        &:nth-child(2){
                            width: 60%;
                        } 
                    }
                }
            }
            tbody{
                tr{
                    th{
                        padding: 5px;
                        height: 30px;
                        border: 1px solid #e6e6e6;
                        font-size: 14px; 
                        font-weight: normal;
                        &:nth-child(2){
                            width: 65%;
                            
                        }
                        &:nth-child(1) {
                            font-weight: bold;
                        }
                        .el-button--primary{
                            padding: 5px;
                            font-size: 13px;
                        }
                        .sex{
                            input{
                                margin-right:2px;
                            }
                            label{
                                margin-right:10px;
                            }
                        }
                        .public{
                            input{
                                height: 25px;
                                width: 170px;
                                text-indent: 8px;
                                font-size: 12px;
                            }
                            input::-webkit-outer-spin-button,
                            input::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                            }
                            input[type="number"]{
                                -moz-appearance: textfield;
                            }
                        }
                    }
                }
            }
            tfoot{
                tr{
                    th{
                      padding: 5px;
                      line-height: 40px; 
                      input{
                        padding: 8px 5px;
                        color: #FFF;
                        background-color: #67C23A;
                        border-color: #67C23A;
                        border-radius: 4px; 
                        font-size:12px;
                      } 
                    }
                }
            }
        }
    }
}
</style>