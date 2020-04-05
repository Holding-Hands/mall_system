<!--面包屑导航-->
<template>
  <div id="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "BreadCrumb"
  }
</script>

<style lang="less">
  #breadcrumb {
    .el-breadcrumb {
      margin-bottom: 20px;
    }
  }
</style>
