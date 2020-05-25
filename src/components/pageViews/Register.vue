<template>
  <div class="register-Wrap" v-loading="loading"
    element-loading-background="#fff">
    <el-row>
      <el-col :xs="19">
        <div class="ms-register">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="0px"
            class="demo-ruleForm"
          >
            <el-form-item prop="nick_name">
              <el-input v-model="ruleForm.nick_name" placeholder="用户名/昵称" @blur="blur"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="ruleForm.email" placeholder="邮箱" @blur="blur1"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                v-model="ruleForm.password"
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="re_password">
              <el-input
                type="password"
                placeholder="确认密码"
                v-model="ruleForm.re_password"
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <div class="register-btn">
              <el-button type="primary" @click.stop="submitForm('ruleForm')">注册</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { register } from "../../api";
import Cookies from 'js-cookie'
export default {
  name: "Register",
  data() {
    let validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        const nickNameReg = /^(?!_)(?!.*?_$)[\u4E00-\u9FA5A-Za-z0-9_]{6,18}$/;
        if (!nickNameReg.test(value)) {
          callback(
            new Error(
              "包含有汉字、数字、字母、下划线(6-18之间),不能以下划线或特殊字符开头和结尾"
            )
          );
          return;
        }
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!emailReg.test(value)) {
          callback(new Error("请输入正确定的邮箱地址"));
          return;
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const passwordReg = /^[a-zA-Z]\w{6,17}$/;
        if (!passwordReg.test(value)) {
          callback(
            new Error("以字母开头，长度在6~17 之间，只能包含字符、数字和下划线")
          );
          return;
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        nick_name: "",
        email: "",
        password: "",
        re_password: ""
      },
      rules: {
        nick_name: [
          {
            required: true,
            validator: validateName,
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: ["blur", "change"]
          }
        ],
        re_password: [
          {
            required: true,
            validator: validatePass2,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          register(this.ruleForm).then(res => {
            switch (res.code) {
              case 200:
                this.$mmToast(res.message);
                new Promise((res,rej)=>{
                  setTimeout(()=>{
                      this.loading = true
                      res()
                   },500)
                }).then(()=>{
                    setTimeout(()=>{
                      this.$router.replace("/login")
                    },1000)
                })
                break;
              case 204:
                this.$mmToast(res.message);
                break;
              case 500:
                this.$mmToast(res.message);
                break;
            }
          });
        } else {
          return false;
        }
      });
    },
    blur() {
      if(this.ruleForm.nick_name == ""){
        return
      }else{
          register({ nick_name: this.ruleForm.nick_name }).then(res => {
          //console.log(res)
          switch (res.code) {
            case 200:
              this.$mmToast(res.message);
              break;
            case 204:
              this.$mmToast(res.message);
            case 500:
              this.$mmToast(res.message);
              break;
          }
        });
      }
    },
    blur1() {
      if(this.ruleForm.email == ""){
        //console.log(1)
        return
      }else{
          register({ email: this.ruleForm.email }).then(res => {
            //console.log(res)
          switch (res.code) {
            case 200:
              this.$mmToast(res.message);
              break;
            case 204:
              this.$mmToast(res.message);
            case 500:
              this.$mmToast(res.message);
              break;
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register-Wrap {
  height: calc(100vh - 60px);
  .el-row {
    position: relative;
    height: 100%;
    margin: auto;
    background-color: rgba(51, 66, 88, 0.8);
    .el-col {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-color: #fff;
      border-radius: 5px;
      .ms-register {
        width: 100%;
        height: 100%;
        padding: 15px;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
        .register-btn {
          text-align: center;
          button {
            width: 100%;
            height: 36px;
          }
          .el-button {
            padding: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 600px) {
  .register-Wrap {
    .el-row {
      .el-col {
        width: 300px;
        height: 340px;
        .ms-register {
          padding: 18px;
          .el-form-item:nth-child(1),
          .el-form-item:nth-child(3) {
            margin-bottom: 29px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .register-Wrap {
    .el-row {
      .el-col {
        height: 345px;
        .ms-register {
          .el-form-item:nth-child(3),
          .el-form-item:nth-child(1) {
            margin-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>