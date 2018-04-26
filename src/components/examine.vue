<template lang="html">
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 所有订单</span>
        <OrderTable :data="orderDate"/>
      </el-tab-pane>
      <el-tab-pane label="待审核发货">待审核发货</el-tab-pane>
      <el-tab-pane label="待收货确认">待收货确认</el-tab-pane>
      <el-tab-pane label="已完成">已完成</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Vue from 'vue';
  import OrderTable from 'components/order.vue'
  import {
    getOrder
  } from 'api/product.js';

  export default {
    name: 'examine',
    data() {
      return {
        orderDate:[],
        orderStatus:{
          'Auditing':[],
          'Paying':[],
          'Closed':[],
          'Finish':[]
        }
      };
    },
    computed: {
      
    },
    methods: {

    },
    created() {
      getOrder().then(res =>{
        res.data.forEach(item => {
          item.product = eval('('+ item.product +')');
          item.address = eval('('+ item.address +')');
          // console.log(typeof(item.address.address));
          // item.address.address = eval(item.address.address);
          // item.address.address = eval('('+ item.address.address +')');
          this.orderStatus[item.status].push(item);
        });
        this.orderDate = res.data;
        console.log(res.data);
        console.log(this.orderStatus);
      })
    },
    components: { OrderTable }
  }

</script>

<style lang="scss">

</style>
