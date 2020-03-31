<!--登录Login组件-->
<template>
  <div id="login">
    <h1 class="title">电商后台管理系统</h1>
    <div class="content">
      <el-form class="el-form" :rules="rules" :model="form" ref="loginForm" >

        <!--  账号-->
        <el-form-item label="账 号" prop="username">
          <el-input
                  v-model="form.username"
                  prefix-icon="iconfont icon-yonghuming"
                  placeholder="请输入账号"
          />
        </el-form-item>

        <!--   密码-->
        <el-form-item label="密 码" prop="password" style="margin-top: 45px;">
          <el-input
                  v-model="form.password"
                  show-password
                  prefix-icon="iconfont icon-mima1"
                  placeholder="请输入密码"
          />
        </el-form-item>

        <!--   按钮-->
        <el-form-item class="footer-btn">
          <el-button type="primary" @click="handleLogin">登 录</el-button>
          <el-button type="info" @click="handleResetForm">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '', // 账号
          password: '' // 密码
        },
        // 验证规则
        rules: {
          username: [{ validator: this.validate('请输入账号'), trigger: 'blur' }],
          password: [{ validator: this.validate('请输入密码'), trigger: 'blur' }]
        }
      }
    },
    methods: {
      /**
       * 验证规则 - input 框必填
       * @author zcy
       * @param {String} msg 传入的报错文字
       * @returns {Function} validator - 验证函数
       */
      validate: msg => (rule, value, callback) => callback(value === '' ? new Error(msg) : ''),
      /**
       * 重置表单 - 这里的this指向form表单实例 console.log(this)
       * @author zcy
       */
      handleResetForm() {
        this.$refs.loginForm.resetFields();
      },
      /**
       * 登录之前的表单预验证 - 表单实例的validate方法
       * @author zcy
       */
      handleLogin() {
        this.$refs.loginForm.validate(value => { // value 为校验的结果布尔值
          if (value) {
            this.$axios.post('/login', this.form).then(res => {
              const msg = res.data.meta.msg;
              if (res.data.meta.status !== 200) {
                this.$message.error(msg);
                return
              }
              console.log(res)
              this.$message.success(msg);
              // 保存token
              window.sessionStorage.setItem('token', res.data.data.token)
              // 登录成功跳转首页
              this.$router.push('/home')
            })
          }
        })
      }
    }
  }
</script>

<style lang="less">
  #login {
    position: relative;
    background: #1A1B1D;
    height: 100vh;

    .title {
      padding: 10px 0;
      text-align: center;
      color: #3b85ff;
      font-size: 36px;
      transform: translateY(47px);
    }

    .content {
      background: #fff;
      width: 600px;
      height: 488px;
      position: absolute;
      border-radius: 6px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }

    .el-form {
      height: 288px;
      width: 396px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;

      // 设置绑定的文字字体大小(账号，密码)
      label {
        font-size: 20px;
        color: #939393;
        margin-bottom: 15px;
      }
    }

    // 设置输入框的样式
    .el-input--small .el-input__inner {
      border: none;
      border-bottom: 1px solid #e0e0e0;
      color: #383838;
      font-size: 22px;
      padding: 0 0 0 35px;
    }

    // 按钮样式
    .el-button--mini, .el-button--small {
      font-size: 20px;
    }

    .footer-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 64px;
      font-size: 20px;
    }
  }
</style>
