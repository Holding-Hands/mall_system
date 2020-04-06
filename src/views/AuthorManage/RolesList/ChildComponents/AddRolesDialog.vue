<!--  添加角色按钮  -->
<template>
  <div id="add-roles-dialogs">
    <el-row>
      <el-col>
        <el-button type="primary" @click="onAddRoles">添加角色</el-button>
      </el-col>
    </el-row>
    <!--  添加角色的弹框  -->
    <el-dialog title="添加角色" :visible.sync="isShowAddRolesDialog" width="50%" :rules="rules" @close="handleCloseDialog">
      <el-form :model="oRolesForm" :rules="rules" ref="rolesForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="oRolesForm.roleName"/>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="oRolesForm.roleDesc"/>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AddRolesDialog",
    data() {
      return {
        isShowAddRolesDialog: false, // 是否显示添加角色弹框
        oRolesForm: {
          roleName: '', // 角色名称
          roleDesc: '' // 角色描述
        },
        rules: {
          roleName: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { min: 4, max: 10, message: '长度为4-10' }
          ],
          roleDesc: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { min: 4, max: 10, message: '长度为4-10' }
          ]
        }
      }
    },
    methods: {
      onAddRoles() {
        this.isShowAddRolesDialog = !this.isShowAddRolesDialog
      },
      /**
       * 确定按钮关闭弹框
       */
      onConfirm() {
        this.$refs.rolesForm.validate(res => {
          if (res) {
            this.$axios.post('/roles', this.oRolesForm).then(res => {
              this.isShowAddRolesDialog = !this.isShowAddRolesDialog
              if (res.data.meta.status !== 201) {
                return this.$message.error('添加用户信息失败')
              }
              this.$message.success('添加用户信息成功')
              this.$emit('handleRefreshRolesList')
            })
          }
        })
      },
      /**
       * 点击【取消】关闭弹框
       */
      onCancel() {
        this.isShowAddRolesDialog = !this.isShowAddRolesDialog
      },
      handleCloseDialog() {
        this.$refs.rolesForm.resetFields()
      }
    }
  }
</script>

<style scoped>
  #add-roles-dialogs {
    margin-bottom: 20px;
  }
</style>
