<template lang="html">
    <div class="login">
      <div class="login-container">
        <div class="login-box-warp">
          <div class="login-box">
            <h2>密码登录</h2>
            <!-- <el-form ref="form" :model="form"> -->
            <span class="input-group">
              <input type="text" v-model="form.account">
              <span class="input-icon">
                <i class="iconfont icon-people"></i>
              </span>
            </span>
            <span class="input-group">
              <input type="password" v-model="form.password" onkeydown='if(event.keyCode==13){this.onSubmit}'>
              <span class="input-icon">
                <i class="iconfont icon-lock"></i>
              </span>
            </span>
  
            <span class="input-group">
              <input type="text" id="input">
              <input type="button" id="code" @click="createCode()" />
            </span>
  
            <button class="login-submit" id="login-btn" type="submit" @click="onSubmit" style="width:100%">登录</button>
  
            <p class="login-box-link">
              <a href='#/register'>免费注册</a>
              <a href="#/forgetPassword">忘记密码</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
    import Vue from 'vue';

  
    export default {
      name: 'login',
      data() {
        return {
          form: {
            account: '',
            password: '',
            code: ''
          }
        };
      },
      methods: {
        onSubmit() {
          let inputCode = document.getElementById("input").value.toUpperCase();
          if(inputCode != this.code){
            this.$notify.error({
              title: "验证码输入错误！",
              duration: 1500
            });
            this.createCode(); //刷新验证码  
            document.getElementById("input").value = ""; //清空文本框  
          }
          else {
            if(this.form.account=='human'&&this.form.password=='human'){
              this.$router.push('/admin');
            }
            else{
              this.$notify.error({
                title: "登录信息错误,请输入正确信息",
                duration: 1500
              });
              this.createCode(); //刷新验证码  
              document.getElementById("input").value = ""; //清空文本框  
            }
          }
        },
        createCode() {
          this.code = "";
          var codeLength = 4; //验证码的长度  
          var checkCode = document.getElementById("code");
          var random = new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
          for (var i = 0; i < codeLength; i++) { //循环操作  
            var index = Math.floor(Math.random() * 34); //取得随机数的索引（0~35）  
            this.code += random[index]; //根据索引取得随机数加到code上  
          }
          checkCode.value = this.code; //把code值赋给验证码  
        }
      },
      created() {
        document.onkeydown = function (e) {
          if (!e) e = window.event;
          if ((e.keyCode || e.which) == 13) {
            document.getElementById('login-btn').click();
          }
        }
      },
      mounted() {
        this.createCode();      
      }
    }
  
  </script>
  
  <style lang="scss">
  
  
  </style>
  