<!--角色列表组件-->
<template>
  <div id="roles-list">
    <!--  面包屑导航  -->
    <BreadCrumb :SecondTitle="SecondTitle"/>
    <!--  卡片视图  -->
    <el-card>
      <!--  添加角色按钮  -->
      <AddRolesDialog @handleRefreshRolesList="getRolesList"/>
      <!--  角色列表  -->
      <RolesList :aRolesList="aRolesList" @handleRefreshRolesList="getRolesList"/>
    </el-card>
  </div>
</template>

<script>
  // 导入公共组件
  import BreadCrumb from "components/content/BreadCrumb";
  // 导入子组件
  import RolesList from "./ChildComponents/RolesList";
  import AddRolesDialog from "./ChildComponents/AddRolesDialog";

  export default {
    name: "index",
    data() {
      return {
        SecondTitle: ['权限管理', '角色列表'], // 面包屑导航标题
        aRolesList: [],// 角色数据 后台获取的
        isShowAddRolesDialog: false // 是否显示添加角色弹框
      }
    },
    methods: {
      getRolesList() {
        this.$axios.get('/roles').then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('获取角色列表失败');
          }
          this.aRolesList = res.data.data;
        })
      }
    },
    created() {
      this.getRolesList();
    },
    components: {
      BreadCrumb,
      RolesList,
      AddRolesDialog
    }
  }
</script>

<style lang="less">
  #roles-list {
    // dialog头部颜色
    .el-dialog__header {
      background: #383838;
      padding: 15px 20px;
      > span {
        color: #FFFFFF;
        font-size: 16px;
      }
    }
  }
</style>
