<!--用户列表区-->
<template>
  <div id="user-list">
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
          <el-switch v-model="scope.row.mg_state" @change="onStateChange(scope.row)"/>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="scope">
          <!-- 修改按钮 -->
          <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleIsShowEditDialog(scope.row)"/>
          </el-tooltip>
          <!-- 删除按钮 -->
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleRemoveById(scope.row)"/>
          </el-tooltip>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" circle @click="onChangeToggle(scope.row)"/>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改按钮弹框 -->
    <el-dialog title="修改用户信息" :visible.sync="isShowEditDialog" width="50%" @close="handleResetFiled">
      <el-form ref="editForm" :model="oEditForm" label-width="80px" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="oEditForm.username" disabled/>
        </el-form-item>
        <el-form-item label="邮 箱" prop="email">
          <el-input v-model="oEditForm.email" prop="email"/>
        </el-form-item>
        <el-form-item label="手 机" prop="mobile">
          <el-input v-model="oEditForm.mobile"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色弹框 -->
    <el-dialog
            title="分配角色"
            :visible.sync="toggle"
            width="30%"
            @close="handleCloseAssignAuthor"
    >
      <div>当前用户：{{this.userInfo.username}}</div>
      <div class="role_name">当前角色：{{this.userInfo.role_name}}</div>
      <div>分配角色：
        <el-select v-model="nSelectRoleId" placeholder="请选择">
          <el-option
                  v-for="item in rolesList"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                  ref="assignAuthorDialog"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer">
        <el-button @click="toggle = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import mixin from "utils/mixin/mixin";

  export default {
    name: "UserLIst",
    data() {
      return {
        oEditForm: {}, // 根据id修改后返回的数据
        oEditFormRules: {}, // 编辑表单验证规则
        toggle: false, // 分配角色弹框开关
        userInfo: {}, // 用户信息
        rolesList: [], // 所有角色列表
        nSelectRoleId: '' // 选中的角色
      }
    },
    mixins: [mixin],
    props: {
      userList: {
        type: Array,
        require: true
      },
      isShowEditDialog: {
        type: Boolean,
        require: true
      }
    },
    methods: {
      /**
       * 状态改变同步到数据库
       * @param {Object} opt - 当前行的信息
       * @author zcy
       */
      onStateChange(opt) {
        this.$axios.put(`/users/${opt.id}/state/${opt.mg_state}`).then(res => {
          if (res.data.meta.status !== 200) {
            opt.mg_state = !opt.mg_state;
            return this.$message.error('更新用户状态失败');
          }
          this.$message.success('成功更新用户状态')
        })
      },
      /**
       * 点击修改按钮，通知父组件开启弹框
       * @param {Object} row - 整行数据
       */
      handleIsShowEditDialog(row) {
        this.$axios.get('/users/' + row.id).then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('修改用户信息失败')
          }
          this.$message.success('修改用户信息成功')
          this.oEditForm = res.data.data
        })
        this.$emit('update:isShowEditDialog', true);
      },
      /**
       * 点击【取消按钮】，通知父组件关闭弹框
       */
      onCancel() {
        this.$emit('update:isShowEditDialog', false)
      },
      /**
       * 点击【确定】按钮，预验证通知父组件关闭弹框
       */
      onConfirm() {
        this.$refs.editForm.validate(res => {
          // 预验证不成功return
          if (!res) return
          // 成功发送修改请求并关闭弹框
          this.$axios.put(`/users/${this.oEditForm.id}`, {
            email: this.oEditForm.email,
            mobile: this.oEditForm.mobile
          }).then(res => {
            if (res.data.meta.status !== 200) {
              return this.$message.error('修改用户信息失败')
            }
            // 关闭弹框
            this.$emit('update:isShowEditDialog', false)
            // 提示信息
            this.$message.success('修改用户信息成功')
            // 更新列表数据
            this.$emit('onRefreshUserList')
          })
        })
      },
      /**
       * 弹框关闭重置输入框
       */
      handleResetFiled() {
        this.$refs.editForm.resetFields()
      },
      /**
       * 删除数据
       * @param {Object} row 删除的数据
       * @author zcy
       */
      handleRemoveById(row) {
        this.$confirm('是否确定删除此条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确认调用删除接口
          return this.$axios.delete(`/users/${row.id}`)
        }).then(res => {
          // 删除失败
          if (res.data.meta.status !== 200) {
            return this.$message.error('删除失败')
          }
          // 删除成功
          this.$message({ type: 'success', message: '删除成功!' });
          this.$emit('onRefreshUserList')
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        });
      },
      /**
       * 点击分配角色按钮触发的弹框
       * @param {Object} row - 当前行的数据
       * @author zcy
       */
      onChangeToggle(row) {
        this.toggle = !this.toggle;
        this.userInfo = row;
        this.$axios.get('/roles').then((res) => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('获取角色列表失败');
          }
          this.rolesList = res.data.data
        })
      },
      /**
       * 点击分配角色的确定按钮
       */
      handleConfirm() {
        if (!this.nSelectRoleId) {
          return this.$message.error('请选择新角色')
        }
        this.$axios.put(`/users/${this.userInfo.id}/role`, {
          rid: this.nSelectRoleId
        }).then(res => {
          if (res.data.meta.status !== 200) {
            this.$message.error('更新角色失败')
          }
          this.$message.success('更新角色成功')
          this.$emit('onRefreshUserList')
          this.toggle = !this.toggle;
        })
      },
      /**
       * 处理关闭分配角色弹框
       */
      handleCloseAssignAuthor() {
        this.nSelectRoleId = '';
        this.userInfo = {};
      }
    }
  }
</script>

<style lang="less">
  #user-list {
    .success-row {
      background: #333744;
      color: white;
    }

    .warning-row {
      background: #E8EAE7;
    }

    /* 用来设置当前页面element全局table 选中某行时的背景色*/

    .el-table__body tr.current-row > td {
      background-color: #f19944 !important;
    }

    /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #f19944;
    }

    .role_name {
      margin: 20px 0;
    }
  }
</style>
