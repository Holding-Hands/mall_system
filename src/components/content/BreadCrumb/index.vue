<!--面包屑导航-->
<template>
  <div id="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="path">{{FirstTitle}}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in SecondTitle" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      path: {
        type: String,
        default: () => '/home'
      },
      FirstTitle: {
        type: String,
        default: () => '首页'
      },
      SecondTitle: {
        type: Array,
        default: () => ['用户管理', '用户列表']
      }
    }
  }
</script>

<style lang="less">
  #breadcrumb {
    .el-breadcrumb {
      margin-bottom: 20px;
    }
  }
</style>
