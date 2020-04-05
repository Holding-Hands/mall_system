<!--添加用户弹框-->
<template>
  <el-dialog
          title="添加用户"
          :visible.sync="toggle"
          width="50%"
          @close="handleCloseAddFormDialog"
  >
    <el-form
            :model="oAddForm"
            :rules="rules"
            ref="addForm"
            label-width="70"
    >
      <!-- prop 验证规则的属性，v-modle绑定到username上-->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="oAddForm.username"/>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input v-model="oAddForm.password"/>
      </el-form-item>
      <el-form-item label="邮 箱" prop="email">
        <el-input v-model="oAddForm.email"/>
      </el-form-item>
      <el-form-item label="电 话" prop="mobile">
        <el-input v-model="oAddForm.mobile"/>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import mixin from "utils/mixin/mixin";
  export default {
    name: "AddUserDialog",
    mixins: [mixin],
    data() {
      return {
        toggle: true, // 是否显示添加用户弹框
        oAddForm: {
          username: '', // 添加表单绑定的用户名
          password: '', // 添加表单绑定的密码
          email: '', // 添加表单绑定的邮箱
          mobile: '' // 添加表单绑定的电话
        }, // 添加的表单数据对象
      }
    },
    methods: {
      /**
       * 关闭添加表单弹框重置数据
       * @author zcy
       */
      handleCloseAddFormDialog() {
        this.$refs.addForm.resetFields()
      },
      onConfirm() {
        this.$refs.addForm.validate((res) => {
          if (res) {
            // 校验成功发送添加请求并且关闭弹框
            this.$axios.post('/users', this.oAddForm).then(res => {
              this.onCancel();
              if (res.data.meta.status !== 201) {
                return this.$message.error('添加用户信息失败')
              }
              this.$message.success('添加用户信息成功')
            })
            // 重新刷新列表
            this.$emit('onRefreshUserList')
          }
        })
      },
      /**
       * 点击取消按钮关闭弹框
       * @author zcy
       */
      onCancel() {
        this.toggle = !this.toggle;
      },
    }
  }
</script>

<style scoped>
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #67C23A
  }

  .el-form-item.is-success .el-input-group__append .el-input__inner, .el-form-item.is-success .el-input-group__prepend .el-input__inner {
    border-color: transparent
  }

  .el-form-item.is-success .el-input__validateIcon {
    color: #67C23A
  }
</style>
