<!--编辑修改角色列表-->
<template>
    <div>
      <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
        <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(oFormData)"/>
      </el-tooltip>
      <!-- 修改按钮弹框 -->
      <el-dialog title="修改用户信息" :visible.sync="isShowEditDialog" width="50%" @close="handleResetFiled">
        <el-form ref="editForm" :model="oEditForm" :rules="rules">
          <el-form-item prop="roleName">
            <el-input v-model="oEditForm.roleName"/>
          </el-form-item>
          <el-form-item prop="roleDesc">
            <el-input v-model="oEditForm.roleDesc"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "EditRoleList",
    props: {
      rowData: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        isShowEditDialog: false, // 是否显示编辑弹框
        oFormData: this.rowData,
        rules: {
          roleName: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { min: 4, max: 10, message: '长度为4-10' }
          ],
          roleDesc: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { min: 4, max: 10, message: '长度为4-10' }
          ]
        },
        oEditForm: {
          roleName: '',
          roleDesc: ''
        },
      }
    },
    methods: {
      handleEdit(row) {
        this.oEditForm = row
        this.isShowEditDialog = !this.isShowEditDialog
      },
      /**
       * 点击【取消】按钮关闭弹框
       */
      onCancel() {
        this.isShowEditDialog = !this.isShowEditDialog
      },
      /**
       * 点击【确定】按钮关闭弹框
       */
      onConfirm() {
        this.$refs.editForm.validate(res => {
          if (res) {
            this.$axios.put(`/roles/${this.oEditForm.id}`, {
              roleName: this.oEditForm.roleName,
              roleDesc: this.oEditForm.roleDesc
            }).then(res => {
              if (res.data.meta.status !== 200) {
                return this.$message.error('修改用户信息失败')
              }
            })
            this.$message.success('修改用户信息成功')
            this.$emit('handleRefreshRolesList')
            this.isShowEditDialog = !this.isShowEditDialog
            this.$emit('update:isShowEditDialog', false)
          }
        })
      },
      /**
       * 弹框关闭重置表单
       */
      handleResetFiled() {
        this.$refs.editForm.resetFields()
      },
    }
  }
</script>

<style scoped>

</style>
