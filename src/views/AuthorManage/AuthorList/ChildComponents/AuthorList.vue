<template>
  <div id="author-list">
    <el-table :data="authorList" border :cell-class-name="tableRowClassName" highlight-current-row>
      <el-table-column type="index" label="#"/>
      <el-table-column prop="authName" label="权限名称"/>
      <el-table-column prop="path" label="路径"/>
      <el-table-column prop="level" label="权限等级">
        <template v-slot="scope">
          <el-tag v-if="scope.row.level==='0'">一级</el-tag>
          <el-tag v-else-if="scope.row.level==='1'" type="success">二级</el-tag>
          <el-tag v-else="scope.row.level==='2'" type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import mixin from "utils/mixin/mixin";

  export default {
    name: "AuthorList",
    props: {
      authorList: {
        type: Array,
        require: true
      }
    },
    mixins: [mixin]
  }
</script>
<style lang="less">
  #author-list {
    .success-row {
      background: #333744;
      color: white;
    }

    .warning-row {
      background: #E8EAE7;
    }
    /* 用来设置当前页面element全局table 选中某行时的背景色*/

    .el-table__body tr.current-row > td {
      background-color: #3494FD !important;
    }

    /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #3494FD;
    }
  }
</style>
