<!--Created by jessie on 2019/01/03-->
<template>
  <div class="login_container">
    <div class="login_box">
      <div class="logo">
        <img src="../assets/logo.png"/>
      </div>
      <el-form label-width="0px" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!--username-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"><i slot="prefix" class="iconfont icon-user"></i></el-input>
        </el-form-item>
        <!--password-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password"><i slot="prefix" class="iconfont icon-lock_fill"></i></el-input>
        </el-form-item>
        <!--button-->
        <el-form-item class="btn-group">
          <el-button type="primary" @click="login">Sign in</el-button>
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // Default login data
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // add the rules for login
      loginFormRules: {
        username: [
          { required: true, message: 'Please input the username', trigger: 'blur' },
          { min: 3, max: 10, message: 'The length is between 3 and 10 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input the password', trigger: 'blur' },
          { min: 6, max: 15, message: 'The length is between 6 and 15 characters', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // Add a method to reset the form
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // Methods to add validation form, Returns true if the check is successful
    login () {
      // click on login, first call the validate method to verify the contents of the form
      this.$refs.loginFormRef.validate(async valid => {
        // if the valid parameter is ture , it passes
        if (!valid) return
        // Send a request to log in
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('Login failed')
        this.$message.success('Login Success')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang ="less" scoped>
.login_container{
  background-color: #333333;
  height:100%;
}
.login_box{
  width:500px;
  height:300px;
  background-color:#ffffff;
  border-radius:10px;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  .logo{
    height:130px;
    width:130px;
    border:1px solid #eeeeee;
    border-radius:50%;
    padding:10px;
    box-shadow: 0 0 10px #dddddd;
    position:absolute;
    left:50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    img{
      width:100%;
      height:100%;
      border-radius: 150px;
    }
  }
  .btn-group{
    display: flex;
    justify-content: flex-end;
  }
  .login_form{
    position:absolute;
    bottom:0px;
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
}
</style>
