<template lang="html">
  <div>
    <el-button type="primary" @click="addProduct" style="float: right;margin-bottom: 20px;">添加商品</el-button>      
    <el-table
      stripe
      :data="productData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <h1 style="font-size: 20px;padding: 20px 0;">图片路径</h1>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="展示图片">
              <span>{{ props.row.switch.image }}</span>
            </el-form-item>
            <el-form-item label="商品详情图片">
              <span>{{ props.row.detail.image }}</span>
            </el-form-item>
            <el-form-item label="包装">
              <span>{{ props.row.packing.image }}</span>
            </el-form-item>
            <el-form-item label="功能">
              <span>{{ props.row.function.image }}</span>
            </el-form-item>
          </el-form>
          <h1 style="font-size: 20px;padding: 20px 0;" v-if="Object.keys(props.row.switch).length>1">选项</h1>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label="k" :key="k" v-for="(d,k) in props.row.switch" v-if="k!='image'">
              <span>{{ d }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="id"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name"
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
        label="库存"
        prop="stock"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="缩略图路径"
        prop="image"
        min-width="300">
      </el-table-column>
      <el-table-column 
        label="操作"
        min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="120px">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" label-width="120px">
          <el-input v-model="form.stock" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="缩略图路径" label-width="120px">
          <el-input v-model="form.image" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="展示图片" label-width="120px">
          <el-input v-model="form.switch.image" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品详情图片" label-width="120px">
          <el-input v-model="form.detail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装图片" label-width="120px">
          <el-input v-model="form.packing" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能图片" label-width="120px">
          <el-input v-model="form.function" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" :label="'选项'+k" :key="k" v-for="(val,k) in chose" v-if="k>0">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-input v-model="choseTitle[k]" auto-complete="off"></el-input>              
            </el-col>
            <el-col :span="12">
              <el-input v-model="chose[k][Object.keys(val)[0]]" auto-complete="off"></el-input>                         
            </el-col>
            <el-col :span="4">
              <el-button  type="danger" @click.prevent="removeChose(k)">删除</el-button>                       
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">  
        <el-button @click="addChose">新增选项</el-button> 
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Conf">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    allProduct,
    editProduct,
    addProduct
  } from 'api/product.js';

  export default {
    name: 'product',
    data() {
      return {
        productData:[],
        dialogFormVisible:false,
        chose:[],
        choseTitle:[],
        form: {
          name:'',
          price:'',
          stock:'',
          image:'',
          switch:{
            image:''
          },
          detail:[],
          function:[]
        },
        addOredit:''
      };
    },
    methods: {
      Conf(){
        let data = JSON.parse(JSON.stringify(this.form));
        data.switch = {};
        data.function = this.StringtoArr(data.function);
        data.packing = this.StringtoArr(data.packing);
        data.detail = this.StringtoArr(data.detail);
        this.chose.map((v, k)=>{
          data.switch[this.choseTitle[k]] = this.StringtoArr(v[Object.keys(v)[0]]);
        })
        if(this.addOredit=='add'){
          addProduct(data).then(res =>{
            this.initials();
          })
        }else {
          editProduct(data).then(res=>{
            console.log(res);
          })
        }
        this.dialogFormVisible = false;
      },
      transf(val){
        if(val){
          return eval( '(' + val + ')');
        }else{
          return '';
        }
      },
      backTransf(val){
        if(val){
          return JSON.stringify(val);
        }else{
          return '';
        }
      },
      ArrtoString(val){
        if(val.length >=1){
          return val.join(" , ");
        }
        else {
          return '';
        }
      },
      StringtoArr(val){
        if(val.split(' , ')[0]==''){
          return [];
        }else {
          return val.split(' , ');
        }
      },
      addChose(){
        this.choseTitle.push('标题');
        this.chose.push({
          '标题':''
        })
      },
      removeChose(k){
        this.chose.splice(k, 1);
      },
      addProduct(){
        this.chose = [];
        this.choseTitle = [];
        this.addOredit = 'add';
        this.form = {
          name:'',
          price:'',
          stock:'',
          image:'',
          switch:{
            image:''
          },
          detail:'',
          function:''
        };
        this.dialogFormVisible = true;

      },
      initials(){
        allProduct().then(res =>{
          res.data.forEach(item => {
            item.detail = this.transf(item.detail);
            item.function = this.transf(item.function);
            item.packing = this.transf(item.packing);
            item.switch = this.transf(item.switch);
            item.function =  this.ArrtoString(item.function);
            item.packing =  this.ArrtoString(item.packing);
            item.switch.image =  this.ArrtoString(item.switch.image);
            Object.keys(item.switch).map((v,k)=>{
              if(k != 0){
                item.switch[v] = this.ArrtoString(item.switch[v]);
              }
            })
            item.detail =  this.ArrtoString(item.detail);
          });
          this.productData = res.data;       
          console.log(res.data);
        })
      },
      handleEdit(index, row) {
        this.form = row;
        this.chose = [];
        this.choseTitle = [];
        Object.keys(row.switch).map((v,k)=>{
          // if(v!='image'){
          this.chose.push({
            [v]:row.switch[v]
          })
          this.choseTitle.push(v);
          // }
        })
        this.addOredit = 'edit';
        this.dialogFormVisible = true;
        // console.log(index, row);
        console.log(this.choseTitle);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created(){
      this.initials();
    }
  }

</script>

<style lang="scss">


</style>
