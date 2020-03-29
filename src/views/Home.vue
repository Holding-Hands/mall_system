<template>
  <div>
    <el-button type="info" @click="onSignOut">退出</el-button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      /**
       * 退出 - 清除token，跳转login页面
       * @author zcy
       */
      onSignOut() {
        this.$message.success('退出成功');
        window.sessionStorage.clear();
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

</style>
