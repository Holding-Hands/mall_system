<!-- 用户列表组件 -->
<template>
  <div id="user-list">
    <BreadCrumb/>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜素与添加区域 -->
      <Search @handleIsShowAddUserDialog="handleIsShowAddUserDialog" @getUserListByQuery="getUserListByQuery"/>
      <!--   点击添加用户出现的弹框   -->
      <AddUserDialog v-if="isShowAddUserDialog" @onRefreshUserList="getUserList"/>
      <!-- 用户列表区 -->
      <UserList :userList="userList" :isShowEditDialog.sync="isShowEditDialog" @onRefreshUserList="getUserList"/>
      <!-- 分页器 -->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paramsInfo.pagenum"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="paramsInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  // 公共组件
  import BreadCrumb from "components/content/BreadCrumb";
  // 子组件
  import AddUserDialog from "./childComponents/AddUserDialog";
  import UserList from "./childComponents/UserList";
  import Search from "./childComponents/Search";
  export default {
    name: "Users",
    data() {
      return {
        paramsInfo: {
          query: '', // 通过搜索框输入的内容进行搜索，请求数据
          pagenum: 1, // 当前的页数
          pagesize: 5 // 当前每页显示多少条数据
        }, //请求用户列表数据的参数
        userList: [], // 用户列表数据
        total: 0,
        toggle: false, // 是否显示添加用户弹框
        isShowAddUserDialog: false, // 是否显示添加用户弹框
        isShowEditDialog:false // 是否显示编辑弹框
      }
    },
    created() {
      // 获取用户列表的数据
      this.getUserList();
    },
    methods: {
      /**
       * 获取用户列表数据
       * @author zcy
       */
      getUserList() {
        this.$axios.get('/users', {
          params: this.paramsInfo
        }).then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('获取用户列表失败')
          }
          this.userList = res.data.data.users;
          this.total = res.data.data.total;
        })
      },
      /**
       * 监听page-sizes改变重新请求数据 page-sizes="[5,10, 20, 30]" 显示5,10，20，30
       * @param {String} nVal - 改变的值
       * @author zcy
       */
      handleSizeChange(nVal) {
        this.paramsInfo.pagesize = nVal;
        this.getUserList()
      },
      /**
       * 监听页码值发生变化重新请求数据 1,2,3,4
       * @author zcy
       * @param {Number} nVal - 最新的页码值 1,2,3,4
       */
      handleCurrentChange(nVal) {
        this.paramsInfo.pagenum = nVal;
        this.getUserList();
      },
      /**
       * 是否显示添加用户弹框
       */
      handleIsShowAddUserDialog() {
        this.isShowAddUserDialog = !this.isShowAddUserDialog
      },
      /**
       * 通过查询得到数据
       * @param {String} val - 子组件传来的查询参数
       */
      getUserListByQuery(val) {
        this.paramsInfo.pagenum = 1;
        this.paramsInfo.query = val;
        this.getUserList()
      },
    },
    components: {
      BreadCrumb,
      AddUserDialog,
      UserList,
      Search,
    }
  }
</script>

<style lang="less">
  #user-list {
    .el-card {
      box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    }

    .el-table {
      margin-top: 20px;
      font-size: 12px;
    }

    .el-pagination {
      margin-top: 20px;
    }

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
