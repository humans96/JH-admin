<template lang="html">
  <div class="nav">
    <div class="logo">
      <a href="#/admin"><p>集慧</p></a>
    </div>
    <el-menu
      :default-active="active"
      class="navBar"
      :router='true'
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/admin/product">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">商品信息</span>
      </el-menu-item>
      <el-menu-item index="/admin/examine">
        <i class="el-icon-search"></i>
        <span slot="title">订单审核</span>
      </el-menu-item>
      <el-menu-item index="/admin/user">
        <i class="iconfont icon-people" style="margin-right: 5px;text-align: center;font-size: 24px;"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'mynav',
  data() {
    return {
      active: this.$route.path
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created(){

  }
}
</script>

<style lang="scss">

</style>
