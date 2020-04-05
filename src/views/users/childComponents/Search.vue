<!--搜索与添加组件-->
<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <!--  搜索框   -->
      <el-input
              placeholder="请输入内容"
              v-model="query"
              clearable
              @clear="onQueryGetUserList"
      >
        <el-button
                slot="append"
                icon="el-icon-search"
                @click="onQueryGetUserList"
        />
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="handleIsShowAddUserDialog">添加用户</el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        query:'' // 搜索查询
      }
    },
    methods: {
      /**
       * 通过搜索框查询，从后台获取展示的数据
       * @author zcy
       */
      onQueryGetUserList() {
        this.$emit('getUserListByQuery',this.query)
      },
      /**
       * 点击添加用户按钮通知父组件开启弹框
       */
      handleIsShowAddUserDialog() {
        this.$emit('handleIsShowAddUserDialog')
      }
    }
  }
</script>

<style scoped>

</style>
