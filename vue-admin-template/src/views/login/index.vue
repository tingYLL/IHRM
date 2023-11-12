<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单--> 
    <!-- el-form > el-form-item > el-input -->
    <el-form ref="form" :model="loginForm" :rules="loginRules">
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="loginForm.mobile" />
      </el-form-item>
     
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="loginForm.password" show-password />
      </el-form-item>
      <el-form-item prop="isAgree">
        <el-checkbox v-model="loginForm.isAgree">
          用户平台使用协议
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button style="width:350px" type="primary" @click="login">登录</el-button>
   </el-form-item>
   <el-form-item>
        <el-button style="width:350px" type="primary" @click="testAjax">test</el-button>
   </el-form-item>
</el-form>
      </el-card>  
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name : "Login",
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
        isAgree: false
      },
      loginRules: {
        mobile: [
        //规则1  
        {
          required: true,
          message: '请输入手机号',
          //表示焦点离开的时候触发
          trigger: 'blur'
        },
        //规则2
         {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'

        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度应该为6-16位之间',
          trigger: 'blur'

        }],
        // required只能检查 null "" undefined
        isAgree: [{
          //自定义校验规则 规定有rule、value、callback这三个参数
          //value的值有ture 或者 false 两种
          //callback函数有点像js中的Promise ， 它成功时执行resolve，失败时执行reject
          validator: (rule, value, callback) => {
            // rule规则(这边没有使用到rule)
            // value检查的数据  true/false
            // callback 函数 执行这个函数
            // 成功执行callback 失败也执行callback(错误对象 new Error(错误信息))
            value ? callback() : callback(new Error('没有勾选用户平台协议'))
          }
        }]
      }
    }
  },
  methods:{
    login() {
      this.$refs.form.validate((isOK) => {
        if (isOK) {
          this.$store.dispatch("user/login", this.loginForm)
        }
      })
    },
    testAjax(){
        axios({
          // url:'https://heimahr.itheima.net/api/sys/login',
          //URL只要像下面这样写，然后http://localhost:9528就会自动拼接上，然后根据vue.config.js中配置的代理，因为访问路径带有api，便会转发到https://heimahr.itheima.net/api/sys/login
          url:'api/sys/login',
          method:'post',
          data:{
            mobile:'13912345678',
            password:'123456'
          }
        })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
