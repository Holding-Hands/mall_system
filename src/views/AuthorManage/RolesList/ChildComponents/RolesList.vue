<template>
  <div id="roles-list">
    <el-table :data="aRolesList" border>
      <!--  展开列  -->
      <el-table-column type="expand">
        <template v-slot="scope">
          <!--  一级权限 -->
          <el-row
                  v-for="(itemX,index) in scope.row.children"
                  :key="itemX.id"
                  :class="[ 'bd-bottom', index === 0 ? 'bd-top' : '' ]"
                  class="v-center"
          >
            <el-col :span="6">
              <el-tag
                      closable
                      @close="handleRemoveAuthorById(scope.row,itemX.id)"
              >
                {{ itemX.authName }}
                <i class="el-icon-caret-right"/>
              </el-tag>
            </el-col>
            <!--  二级权限 -->
            <el-col :span="18">
              <el-row
                      v-for="(itemY, indey) in itemX.children"
                      :key="itemY.id"
                      :class="[ indey === 0 ? '' : 'bd-top' ]"
                      class="v-center"
              >
                <el-col :span="6">
                  <el-tag
                          type="success"
                          closable
                          @close="handleRemoveAuthorById(scope.row,itemY.id)"
                  >
                    {{itemY.authName}}
                  </el-tag>
                  <i class="el-icon-caret-right"/>
                </el-col>
                <!--  三级权限  -->
                <el-col :span="18">
                  <el-tag
                          closable
                          type="warning"
                          v-for="itemZ in itemY.children"
                          :key=itemZ.id
                          @close="handleRemoveAuthorById(scope.row,itemZ.id)"
                  >
                    {{itemZ.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!--  索引列  -->
      <el-table-column type="index" label="#"/>
      <el-table-column label="角色名称" prop="roleName"/>
      <el-table-column label="角色描述" prop="roleDesc"/>
      <el-table-column label="操作" width="150">
        <template v-slot="scope">
          <!-- 修改按钮 -->
          <EditRoleList :rowData="scope.row" @handleRefreshRolesList="handleRefreshRolesList" />
          <!-- 删除按钮 -->
          <RemoveRole :rowData="scope.row" @handleRefreshRolesList="handleRefreshRolesList"/>
          <!-- 分配角色按钮 -->
          <AssignAuthor :rowData="scope.row" @handleRefreshRolesList="handleRefreshRolesList"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // 分配权限按钮组件
  import AssignAuthor from "./AssignAuthor";
  // 删除组件
  import RemoveRole from "./RemoveRole";
  import EditRoleList from "./EditRoleList";
  export default {
    name: "RolesList",
    props: {
      aRolesList: {
        type: Array,
        require: true
      }
    },
    components: {
      AssignAuthor,
      RemoveRole,
      EditRoleList
    },
    methods: {
      /**
       * 请求父组件刷新数据
       */
      handleRefreshRolesList(){
          this.$emit('handleRefreshRolesList')
      },
      /**
       * 删除权限
       * @param {Number} role - 删除的角色
       * @param {Number} rightId - 删除的权限id
       */
      handleRemoveAuthorById(role,rightId) {
        this.$confirm('是否确定永久删除此条权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.$axios.delete(`/roles/${role.id}/rights/${rightId}`)
        }).then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error('删除失败')
          }
          // 删除成功
          this.$message({ type: 'success', message: '删除成功!' });
          // 直接将对象赋值新返回的数据
          role.children = res.data.data
          // this.$emit('handleRefreshRolesList') 此处不建议全部刷新那么会造成整个页面全部刷新
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        })
      }
    }
  }
</script>

<style lang="less">
  #roles-list {
    // 表格标题居中
    .el-table th > .cell {
      text-align: center;
    }

    // 表格body居中
    /*.el-table--border td {*/
    /*    text-align: center;*/
    /*  }*/

    .el-tag {
      margin: 15px 10px;
    }
    // 底部边框
    .bd-bottom {
      border-bottom: 1px solid #eee;
    }

    // 顶部边框
    .bd-top {
      border-top: 1px solid #eee;
    }

    .bd-top-none {
      border-top: none;
    }
    .v-center {
      display: flex;
      align-items: center;
    }
    .cell {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>
