<template lang="html">
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 所有订单</span>
        <OrderTable :data="orderDate" status="all"/>
      </el-tab-pane>
      <el-tab-pane label="待付款">
        <OrderTable :data="orderStatus.Paying" status="Paying"/>
      </el-tab-pane>
      <el-tab-pane label="待审核发货">
        <OrderTable :data="orderStatus.Auditing" status="Auditing"/>
      </el-tab-pane>
      <el-tab-pane label="待收货确认">
        <OrderTable :data="orderStatus.Receiving" status="Receiving"/>
      </el-tab-pane>
      <el-tab-pane label="已完成">
        <OrderTable :data="orderStatus.Finish" status="Finish"/>
      </el-tab-pane>
      <el-tab-pane label="已取消">
        <OrderTable :data="orderStatus.Closed" status="Closed"/>
      </el-tab-pane>
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
          'Receiving':[],
          'Closed':[],
          'Finish':[]
        }
      };
    },
    watch:{
      orderStatus:function(){
        getOrder().then(res =>{
          res.data.forEach(item => {
            item.product = eval('('+ item.product +')');
            item.address = eval('('+ item.address +')');
            this.orderStatus[item.status].push(item);
          });
          this.orderDate = res.data;
        })
      }
    },
    methods: {

    },
    created() {
      getOrder().then(res =>{
        res.data.forEach(item => {
          item.product = eval('('+ item.product +')');
          item.address = eval('('+ item.address +')');
          this.orderStatus[item.status].push(item);
        });
        this.orderDate = res.data;
      })
    },
    components: { OrderTable }
  }

</script>

<style lang="scss">

</style>
