<template>
  <el-container>
    <div class="body-el">
      <div class="search-base">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="Resources" prop="resource">
              <el-radio-group v-model="formInline.colName">
                <el-radio label="uid">UID</el-radio>
                <el-radio label="cloName">Nickname</el-radio>
                <el-radio label="searchStr">E-mail</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-input
                v-if="formInline.colName!=='searchStr'"
                v-model="formInline.searchStr"
                :placeholder="'Please enter ' + formInline.colName"
                clearable
              />
              <el-select
                v-else
                v-model="formInline.searchStr"
                filterable
                remote
                reserve-keyword
                :placeholder="'Please enter ' + formInline.colName"
                :remote-method="remoteMethod"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" color="#0960bd"
                >Filter</el-button
              >
            </el-form-item>
          </el-form>
      </div>
      <div class="table-body">
        <div class="top-tips">
          <div @click="goBack"><el-icon><ArrowLeft /></el-icon>  <div> Back</div></div>
          <div>
            <el-button type="primary" color="#0960bd">Export</el-button>
          </div>
        </div>
        <el-main>
          <el-scrollbar>
            <el-table :data="logList.list" border stripe header-cell-class-name="headerBr">
              <el-table-column prop="createTime" align="center" label="Timestamp" show-overflow-tooltip
        width="120px" />
              <el-table-column prop="ex_type" label="Type" align="center" width="120px"/>
              <el-table-column prop="uid" label="UID" width="150" align="center"/>
              
              <el-table-column prop="nickname" label="Nickname" align="center" show-overflow-tooltip
        width="90px"/>
              <el-table-column prop="module" label="module" align="center" />
              <el-table-column prop="operationDescription" align="center" label="Detail" show-overflow-tooltip
        width="120px"/>
              <el-table-column prop="credit" label="Credit" align="center" />
              <el-table-column prop="pendingCredit" label="Pending Credit" align="center" width="150px"/>
              <el-table-column prop="exp" label="EXP" align="center" />
            </el-table>
          </el-scrollbar>
          <div class="paginationStyle">
            <el-pagination
              background
              layout="prev, pager, next"
              :small="true"
              :total="logList.total"
              @current-change="sizeChange"
            />
          </div>
        </el-main>
      </div>
    </div>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import {currencyLogListAction} from "./useList/index"
import {
  ArrowLeft
  } from '@element-plus/icons-vue'
import { useRoute,useRouter } from "vue-router";

const route=useRoute()
const router = useRouter();

//搜索入参
const formInline= ref({
  page:"1",
  size:"10",
  searchStr: route.query.searchStr,
  colName: route.query.colName,
})

const options =ref([])
const logList =ref({list:[],total:0})



const onSubmit = () => {
  currencyLogListAction(formInline.value,logList)
};
//分页触发
const sizeChange=(parmes)=>{
  formInline.value.page=parmes.toString()
  onSubmit()
}
const remoteMethod = (query) => {
    options.value = [
      {value:query+'@gmail.com',label:query+'@gmail.com'},
      {value:query+'@qq.com',label:query+'@qq.com'},
      {value:query+'@163.com',label:query+'@163.com'}
    ]
}
const goBack = () =>{
  router.push({ path: "/userDetail",query:{searchStr:formInline.value.searchStr,colName:formInline.value.colName} });
}
onSubmit()
</script>

<style scoped>
.body-el{
  width: 100%;
}
.paginationStyle {
  display: flex;
  padding: 20px;
  justify-content: end;
}
.el-table th {
  background-color: #e7e7e7 !important;
}
.top-tips {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-top: 16px;
}
.top-tips>div{
  display: flex;
}
.search-base {
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  padding-top: 32px;
  padding-left: 32px;
  margin-bottom: 10px;
}
.table-body {
  background: #fff;
  padding: 10px;
  border-radius: 6px;
}
</style>
