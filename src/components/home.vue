<template>
  <el-container class="home-container">
    <el-header>
      <div>SHOP</div>
      <el-button type="info" @click="logout">log out</el-button>
    </el-header>
    <el-container>
      <el-aside  :width="isCollapse ? '64px':'180px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--menu-->
        <el-menu
          background-color="#444444"
          text-color="#fff"
          active-text-color="#409Eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!--the first level of menu-->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!--the submenu-->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      menulist: [],
      iconsObj: {
        // The value of the id of each menu item
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-lock_fill',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // Whether the menu collapse
      isCollapse: false
    }
  },
  created () {
    this.getMenulist()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // get all menu
    async getMenulist () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    // click on the button to control the menu collapse or not
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    font-size: 30px;
    color: #ffffff;
    display: flex;
  }

}
.el-aside {
  background-color: #444444;
  .iconfont{
    margin-right:5px;
  }
  .el-menu{
    border-right:none;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}
.main {
  background-color: #888888;
}
</style>
