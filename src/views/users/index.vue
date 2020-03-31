<!-- 用户列表组件 -->
<template>
  <div id="user-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜素与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添 加</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table
              :data="userList"
              style="width: 100%"
              border
              :cell-class-name="tableRowClassName"
              highlight-current-row
      >
        <el-table-column type="index" label="#"/>

        <el-table-column prop="username" label="姓名"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="mobile" label="电话"/>
        <el-table-column prop="role_name" label="角色"/>

        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state"/>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle/>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle/>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" circle/>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
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
  import mixin from "utils/mixin/mixin";

  export default {
    name: "Users",
    data() {
      return {
        paramsInfo: {
          query: '',
          pagenum: 1, // 当前的页数
          pagesize: 5 // 当前每页显示多少条数据
        }, //请求用户列表数据的参数
        userList: [], // 用户列表数据
        total: 0
      }
    },
    created() {
      // 获取用户列表的数据
      this.getUserList();
    },
    mixins: [mixin],
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
      }
    }
  }
</script>

<style lang="less">
  #user-list {
    .el-breadcrumb {
      margin-bottom: 20px;
    }

    .el-card {
      box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    }

    .success-row {
      background: #333744;
      color: white;
    }

    .warning-row {
      background: #E8EAE7;
    }

    .el-table {
      margin-top: 20px;
      font-size: 12px;
    }
    .el-pagination {
      margin-top: 20px;
    }
    /* 用来设置当前页面element全局table 选中某行时的背景色*/
    .el-table__body tr.current-row>td{
      background-color: #f19944 !important;
    }
    /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
    .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #f19944;
    }
  }
</style>
