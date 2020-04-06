<template>
  <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
    <el-button type="danger" icon="el-icon-delete" circle @click="handleRemoveEditForm(rowData)"/>
  </el-tooltip>
</template>

<script>
  export default {
    name: "RemoveRole",
    props: {
      rowData: {
        type: Object,
        require: true
      }
    },
    methods: {
      /**
       * 点击【删除按钮】
       */
      handleRemoveEditForm(row) {
        this.$confirm('是否确定删除此条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$axios.delete(`/roles/${row.id}`)
        }).then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('删除失败')
          }
          // 删除成功
          this.$message({ type: 'success', message: '删除成功!' });
          this.$emit('handleRefreshRolesList')
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        })
      },
    }
  }
</script>

<style scoped>

</style>
