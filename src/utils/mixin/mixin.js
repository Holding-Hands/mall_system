export default {
  methods: {
    /**
     * table表格隔行变色
     * @author zcy
     * @param {Object} row 当前行的数据
     * @param {Number} rowIndex 当前行的索引
     * @returns {String} 给奇偶行添加不同的class名，实现隔行变色
     */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 1) {
        return 'success-row';
      }
      return 'warning-row';
    }
  }
}
