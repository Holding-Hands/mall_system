<!-- 分页器 -->
<template>
  <div id="pagination">
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
    >
    </el-pagination>
  </div>
</template>
<!--      <Pagination :pagesize="paramsInfo.pagesize" :total="total"
@getUserListByPageSize="getUserListByPageSize"
@getUserListByPageNum="getUserListByPageNum"/>-->
<!--/**-->
<!--* 通过页数查询数据-->
<!--* @param {Number} val - 页数-->
<!--*/-->
<!--getUserListByPageSize(val) {-->
<!--this.paramsInfo.pagesize = val;-->
<!--this.getUserList()-->
<!--},-->
<!--/**-->
<!--* 通过当前每页显示多少条数据查询数据-->
<!--* @param val-->
<!--*/-->
<!--getUserListByPageNum(val) {-->
<!--this.paramsInfo.pagenum = val;-->
<!--this.getUserList()-->
<!--}-->
<script>
  export default {
    name: "Pagination",
    data() {
      return {
        pagesize:1, // 当前的页数
        pagenum: 5, // 当前每页显示多少条数据
      }
    },
    props: {
      total:{
        type: Number,
        require: true
      }
    },
    methods: {
      /**
       * 监听page-sizes改变重新请求数据 page-sizes="[5,10, 20, 30]" 显示5,10，20，30
       * @param {String} nVal - 改变的值
       * @author zcy
       */
      handleSizeChange(nVal) {
        this.pagesize = nVal;
        this.$emit('getUserListByPageSize',this.pagesize)
      },
      /**
       * 监听页码值发生变化重新请求数据 1,2,3,4
       * @author zcy
       * @param {Number} nVal - 最新的页码值 1,2,3,4
       */
      handleCurrentChange(nVal) {
        this.pagenum = nVal;
        this.$emit('getUserListByPageNum',this.pagenum)
      },
    }
  }
</script>

<style scoped>

</style>
