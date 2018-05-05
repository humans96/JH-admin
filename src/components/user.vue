<template lang="html">
  <div>
    <el-button type="primary" @click="addUser" style="float: right;margin-bottom: 20px;">添加用户</el-button> 

    <el-table
      stripe
      :data="userData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <h1 style="font-size: 20px;padding: 20px 0;">收货信息</h1>
          <el-table
            :data="props.row.address"
            stripe
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="收货人姓名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              sortable
              min-width="200">
            </el-table-column>
            <el-table-column
              label="地址"
              min-width="220">
              <template slot-scope="scope">
                {{scope.row.address.tier1}} {{scope.row.address.tier2}} {{scope.row.address.addressDesc}}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="用户 ID"
        prop="id"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="name"
        sortable
        min-width="100">
      </el-table-column>
      <el-table-column
        label="密码"
        prop="password"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="手机"
        prop="phone"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email"
        min-width="160">
      </el-table-column>
      <el-table-column 
        label="操作"
        min-width="150">
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

    <el-dialog :title="addOredit=='edit'?'修改用户信息':'添加用户'" :visible.sync="dialogFormVisible">
      <el-form :model="register" status-icon :rules="rules" ref="register" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name" :required="true">
          <el-input v-model.number="register.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :required="true">
          <el-input v-model="register.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" :required="true">
            <el-input v-model.number="register.phone"></el-input>
          </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.number="register.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">  
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('register')">确 定</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>
import Vue from 'vue';
import {allUser, register,check,editUser, deleteUser} from 'api/user.js';

export default {
  name: 'user',
  data() {
    var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      };
      var validatepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
        if (!myreg.test(value)) {  
          return callback(new Error('手机号码格式错误'));
          this.$confirm('手机号码格式错误，请重新填写！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else { 
          callback();
        }  
      };
      let validateEmail = (rule, value, callback) =>{
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(value == ''){
          return callback();
        }
        if(!reg.test(value)){
          return callback(new Error('邮箱格式错误，请重新填写'));
        }
        callback();
      }
    return {
      userData:[],
      dialogFormVisible:false,
      addOredit:'',
      register: {
        name:'',
        password:'',
        phone:'',
        email:''
      },
      rules: {
        password: [
          { validator: validatepassword, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        email:[
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone:[
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    addUser(){
      this.register = {
        name:'',
        password:'',
        phone:'',
        email:''
      };
      this.addOredit = 'add';
      this.dialogFormVisible = true;
    },
    handleEdit(index, val){
      this.register = val;
      console.log(this.register);
      this.addOredit = 'edit';
      this.dialogFormVisible = true;
    },
    handleDelete(index, val){
      deleteUser({
        id:val.id
      }).then(res =>{
        allUser().then(res =>{
          res.data.forEach(item =>{
            item.address = eval( '(' + item.address + ')');  
          })
          this.userData = res.data;
          console.log(res.data);
        })
      })
    },
    submitForm(formName){
      if(this.addOredit == 'add'){
        this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.register).then(res => {
            if(res.status == 200){
              this.step = 2;
            }
            else {
              this.$notify.error({
                title: '发生错误',
                duration: 1500
              });
            }
          });
        } else {
            return false;
          }
        });
      }
      else {
        editUser(this.register).then(res =>{
          console.log(res);
        })
      }
      allUser().then(res =>{
        res.data.forEach(item =>{
          item.address = eval( '(' + item.address + ')');  
        })
        this.userData = res.data;
        console.log(res.data);
      })
      this.dialogFormVisible = false;
    }
  },
  created(){
    allUser().then(res =>{
      res.data.forEach(item =>{
        item.address = eval( '(' + item.address + ')');  
      })
      this.userData = res.data;
      console.log(res.data);
    })
  }
}
</script>

<style lang="scss">


</style>
