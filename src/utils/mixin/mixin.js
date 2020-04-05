export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: 'blur' }, // message错误消息  required必须传*
          { min: 4, max: 10, message: "用户名的长度在4-10之间" }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: "请输入6-15位的密码" }
        ],
        email: [
          { required: true, trigger: 'blur', message: '邮箱不能为空' }, // 校验邮箱是否为空
          { validator: this.checkEmailRule } // 校验输入的邮箱是否合法
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '手机号不能为空' }, // 校验手机号是否为空
          { validator: this.checkMobileRule, trigger: 'blur' } // 校验手机号是否合法
        ]
      }, // 表单验证规则对象
    }
  },
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
    },
    /**
     * 电话验证
     * @param {Object} rule - 验证规则
     * @param {String} val - 输入的值
     * @param {Function} cb - 验证成功的的回调函数
     * @author zcy
     */
    checkMobileRule(rule, val, cb) {
      if ((/^1[3456789]\d{9}$/.test(val))) {
        return cb()
      }
      cb(new Error('请输入正确手机号'))
    },
    /**
     * 邮箱验证
     * @param {Object} rule - 验证规则
     * @param {String} val - 输入的值
     * @param {Function} cb - 验证成功的的回调函数,如果失败传new Error('失败信息')
     * @author zcy
     */
    checkEmailRule(rule, val, cb) {
      if ((/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).test(val)) {
        return cb()
      }
      cb(new Error('请输入正确的邮箱'))
    },
  }
}
