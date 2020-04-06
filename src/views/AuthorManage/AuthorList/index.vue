<!--权限列表主页组件-->
<template>
  <div>
    <!--  面包屑导航  -->
    <BreadCrumb :SecondTitle="aSecondTitle"/>
    <!--  卡片区域  -->
    <el-card>
      <!--  权限列表区域  -->
      <AuthorList :authorList="aAuthorList"/>
    </el-card>
  </div>
</template>

<script>
  // 导入公共组件
  import BreadCrumb from "components/content/BreadCrumb";
  import AuthorList from "./ChildComponents/AuthorList";

  export default {
    name: "index",
    data() {
      return {
        aSecondTitle: ['权限管理', '权限列表'], // 面包屑导航二级标题
        aAuthorList: [] // 权限列表数据 请求的
      }
    },
    created() {
      this.getAuthorList()
    },
    methods: {
      getAuthorList() {
        this.$axios('/rights/list').then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('获取权限列表失败')
          }
          this.aAuthorList = res.data.data;
        })
      }
    },
    components: {
      BreadCrumb,
      AuthorList
    }
  }
</script>

<style scoped>

</style>
