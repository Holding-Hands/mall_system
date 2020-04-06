<!--分配权限-->
<template>
  <div>
    <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
      <el-button type="warning" icon="el-icon-setting" circle @click="getRightList"/>
    </el-tooltip>
    <!-- 分配权限弹框 -->
    <el-dialog
            title="提示"
            :visible.sync="toggle"
            width="50%"
    >
      <!--  树形控件  node-key="id"选中节点就是选中id值-->
      <el-tree
              :data="aRightList"
              :props="treeProps"
              show-checkbox
              node-key="id"
              default-expand-all
              :default-checked-keys="aDefaultSelect"
              ref="tree"
      />
      <span slot="footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AssignAuthor",
    props: {
      rowData: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        toggle: false, // 权限分配的开关
        aRightList: [], // 权限列表数据
        // 属性控件属性绑定对象
        treeProps: {
          children: 'children', // 父子嵌套的属性
          label: 'authName' // 父子名称
        },
        aDefaultSelect: [] // 默认选中的节点,数组为id值
      }
    },
    methods: {
      /**
       * 点击权限分配按钮
       */
      getRightList() {
        // 获取所有权限的数据
        this.$axios.get('/rights/tree').then((res) => {
          this.aRightList = res.data.data;
        })
        // 每次点击权限分配按钮清空默认选中列表
        this.aDefaultSelect = [];
        // 获取所有三级权限id
        this.getAllRightId(this.rowData, this.aDefaultSelect);
        // 开启权限弹框
        this.onIsShowDialog();
      },
      /**
       * 是否显示弹框1
       */
      onIsShowDialog() {
        this.toggle = !this.toggle;
      },
      /**
       * 取消按钮关闭弹框
       */
      onCancel() {
        this.onIsShowDialog()
      },
      /**
       * 确定按钮关闭弹框
       */
      onConfirm() {
        // 获取所有选中节点和半选中节点
        const keysArr = [
          ...this.$refs.tree.getHalfCheckedKeys(),
          ...this.$refs.tree.getCheckedKeys()
        ]
        const keysArrStr = keysArr.join(',')
        this.$axios.post(`/roles/${this.rowData.id}/rights`, {
          rids: keysArrStr
        }).then(res => {
          if (res.data.meta.status !==200) {
            return this.$message.error('分配角色权限失败')
          }
          this.$message.success('分配角色权限成功')
        })
        // 刷新数据
        this.$emit('handleRefreshRolesList')
        // 关闭弹框
        this.onIsShowDialog()
      },
      getAllRightId(node, arr) {
        // 如果没用children属性说明是三级权限
        if (!node.children) {
          return arr.push(node.id)
        }
        node.children.forEach((item) => {
          this.getAllRightId(item, arr)
        })
      }
    }
  }
</script>

<style scoped>

</style>
