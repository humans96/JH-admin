<template lang="html">
  <el-table
    stripe
    :data="data"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <h1 style="font-size: 20px;padding: 20px 0;">收货信息</h1>
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="收货人">
            <span>{{ props.row.address.name }}</span>
          </el-form-item>
          <el-form-item label="收货人电话">
            <span>{{ props.row.address.phone }}</span>
          </el-form-item>
          <el-form-item label="收货地址">
            <span>{{ props.row.address.address.tier1 }} {{ props.row.address.address.tier2 }} {{ props.row.address.address.addressDesc}}</span>
          </el-form-item>
        </el-form>
        <!-- <h1 style="font-size: 20px;padding: 20px 0;" v-if="Object.keys(props.row.switch).length>1">商品</h1> -->
        <!-- <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item :label="k" :key="k" v-for="(d,k) in props.row.switch" v-if="k!='image'">
            <span>{{ d }}</span>
          </el-form-item>
        </el-form> -->
      </template>
    </el-table-column>
    <el-table-column
      label="订单 ID"
      prop="id"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      label="订单状态"
      prop="status"
      sortable
      min-width="200">
    </el-table-column>
    <el-table-column
      label="价格"
      prop="price"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      label="时间"
      prop="time"
      sortable
      min-width="250">
    </el-table-column>
    <el-table-column
      label="用户"
      prop="user"
      min-width="200">
    </el-table-column>
  </el-table>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'order-table',
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        a: 1
      };
    },
    methods: {}
  }

</script>

<style lang="scss">


</style>
