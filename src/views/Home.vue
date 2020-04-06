<!--首页导航与侧边栏组件-->
<template>
  <el-container id="home">
    <!-- 顶部导航栏区域 -->
    <el-header>
      <div class="title">电商后台管理系统</div>
      <el-button type="info" @click="onSignOut">退出</el-button>
    </el-header>
    <!-- 侧边栏菜单区域 -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle" @click="handleIsCollapse">|||</div>
        <el-menu
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409eff"
                unique-opened
                :collapse="isCollapse"
                :collapse-transition="false"
                router
                :default-active="$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu
                  :index="String(item.id)"
                  v-for="item in aMenusList"
                  :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="oIconsClass[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
                    v-for="subItem in item.children"
                    :index="'/' + subItem.path"
                    :key="subItem.id"
            >
              <!-- 二级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        aMenusList: [], // 菜单列表 - 从后台获取的
        oIconsClass: {
          '125': 'iconfont icon-users',
          '103': 'iconfont icon-quanxianguanli',
          '101': 'iconfont icon-shangpinguanli',
          '102': 'iconfont icon-dingdanguanli',
          '145': 'iconfont icon-shujutongji'
        },
        sAsideWidth: '200px', // 侧边菜单栏宽度
        isCollapse: false // 菜单是否展开
      }
    },
    created() {
      this.getMenuList()
    },
    methods: {
      /**
       * 退出 - 清除token，跳转login页面
       * @author zcy
       */
      onSignOut() {
        this.$message.success('退出成功');
        window.sessionStorage.clear();
        this.$router.push('/login');
      },
      /**
       * 获取菜单列表数据
       * @author zcy
       */
      getMenuList() {
        this.$axios.get('/menus').then(res => {
          if (res.data.meta.status === 200) {
            this.aMenusList = res.data.data
          }
        }).catch(err => {
          this.$message.error('获取数据失败');
        })
      },
      /**
       * 点击【|||】切换菜单折叠展开
       * @author zcy
       */
      handleIsCollapse() {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped lang="less">
  #home {
    height: 100%;
    /*element-ui中标签就是类名*/

    .el-header {
      background: #373d41;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      .title {
        color: #3b85ff;
        font-size: 20px;
      }
    }

    .el-aside {
      background: #333744;
    }

    .el-main {
      background: #eaedf1;
    }

    .el-button {
      height: 30px;
    }

    .iconfont {
      margin-right: 10px;
    }

    .el-menu {
      // 此处左侧菜单展开会突起一点是因为borde-right引起的
      border-right: none;
    }

    .toggle {
      background: #4a5064;
      color: #fff;
      font-size: 10px;
      text-align: center;
      line-height: 24px;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
  }
</style>
