<template lang="html">
  <div>
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
          <h1 style="font-size: 20px;padding: 20px 0;">商品</h1>
          <el-table
            :data="props.row.product"
            stripe
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="商品 ID"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品名"
              sortable
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="price"
              label="单价"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量"
              width="100">
            </el-table-column>
          </el-table>
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
        min-width="100">
      </el-table-column>
      <el-table-column
        label="价格"
        prop="price"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="快递单号"
        prop="orderID"
        v-if="status=='Receiving'||status=='Finish'"
        min-width="150">
      </el-table-column>
      <el-table-column
        label="订单时间"
        prop="time"
        sortable
        min-width="180">
      </el-table-column>
      <el-table-column
        label="用户"
        prop="user"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="用户留言"
        prop="attention"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="manage"
        min-width="100"
        v-if="status=='Closed'">
      </el-table-column>
      <el-table-column 
        label="操作"
        min-width="150"
        v-if="status=='Auditing'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="agree(scope.$index, scope.row)"
            type="success"
            icon="el-icon-check"></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="cancel(scope.$index, scope.row)"
            icon="el-icon-close"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="订单信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单号" label-width="120px">
          <el-input v-model="form.orderID" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="conf">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="留言" :visible.sync="ismessage">
      <el-form :model="form2">
        <el-form-item label="留言" label-width="120px">
          <el-input v-model="form2.manage" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ismessage = false">取 消</el-button>
        <el-button type="primary" @click="messageConf">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
  import Vue from 'vue';
  import {
    agreeOrder,
    refuseOrder,
    agreeOrderError
  } from 'api/product.js';

  export default {
    name: 'order-table',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      status: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        curData:{},
        curIndex:'',
        form:{
          orderID:''
        },
        form2:{
          manage:''
        },
        mesDate:{},
        mesIndex:'',
        dialogFormVisible:false,
        ismessage:false
      };
    },
    methods: {
      agree(index, row){
        this.curData = row;
        this.curIndex = index;
        this.dialogFormVisible = true;
      },
      conf(index, row){
        this.curData.product.forEach(item =>{
          agreeOrder({
            id:this.curData.id,
            oid:this.form.orderID,
            pname:item.name,
            num:item.num
          }).then(res =>{
            if(res.errorMessage){
              this.$confirm( item.name + '库存不足，请补货！', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
              agreeOrderError({
                id:this.curData.id,
                oid:this.form.orderID,
                pname:item.name,
                num:item.num
              })
            }
          })
        });
        this.curData.orderID = this.form.orderID;
        this.curData.status = 'Receiving';
        this.data.splice(index,1);        
        this.dialogFormVisible = false;
      },
      cancel(index, row){
        this.mesDate = row;
        this.mesIndex = index;
        this.ismessage = true;
      },
      messageConf(){
        refuseOrder({
          id:this.mesDate.id,
          manage: this.form2.manage
        }).then(res =>{
          this.data.splice(this.mesIndex,1);          
          this.mesDate.status = 'Closed';
          this.mesDate.manage = this.form2.manage;
          this.ismessage = false;
          this.$message({
            type: 'success',
            message: '取消成功!'
          });
          
        })    
      }
    }
  }

</script>

<style lang="scss">


</style>
