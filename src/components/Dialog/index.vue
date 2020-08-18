<template>
  <el-dialog
      v-draggable
      :visible.sync="visibleDialog"
      v-bind="$attrs"
      :title="title"
      v-on="$listeners"
      @close="onCancel"
      class="dialog"
  >
    <!--内容区域的默认插槽-->
    <slot></slot>

    <template #footer>
      <slot name="footer">
        <span>
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onConfirm" :loading="loading">确 定</el-button>
        </span>
      </slot>
    </template>

  </el-dialog>
</template>

<script>
export default {
  name: 'dialog',
  inheritAttrs: false, // 不会把未被注册的props属性渲染为组件的的属性
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      top: 0,
      left: 0,
      outOfWindow: false
    };
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit('update:visible');
      }
    }
  },
  methods: {
    /**
     * 对外抛出cancel事件
     */
    onCancel() {
      this.$emit('cancel');
    },
    /**
     * 对外抛出 confirm事件
     */
    onConfirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="less">
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  //height: 100%;
  //width: 100%;
  background: rgba(0, 0, 0, 0.55);
  z-index: 2;

  .el-dialog__footer {
    height: 50px;
    padding-right: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .el-dialog__header {
    background: #2c3749;
    display: flex;
    justify-content: space-between;
    padding: 16px 10px 16px 20px;
    align-items: center;
    font-size: 14px;
  }

  .el-dialog__body {
    padding: 20px;
  }

  .el-dialog__title {
    color: #fff;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #4F8AFC;
  }

  .el-input--small .el-input__inner {
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    color: #606266;
    height: 32px;
    line-height: 32px;
    width: 225px;
  }
}
</style>