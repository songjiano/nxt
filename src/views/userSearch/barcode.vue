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
          <div>
            <el-button type="primary" color="#0960bd" @click="handleClick('','Add')">Create Admin</el-button>
          </div>
        </div>
        <el-main>
          <el-scrollbar>
            <el-table :data="tableDate.list" border stripe header-cell-class-name="headerBr" >
              
              <el-table-column prop="uid" label="UID" min-width="120" />
              <el-table-column prop="nickname" label="Nickname" min-width="140" />
              <el-table-column prop="status" label="NXT Resident" />
              <el-table-column prop="accountLevel" label="Level" />
              <el-table-column prop="credit" label="Credit" />
              <el-table-column prop="pendingCredit" label="Pending Credit" />
              <el-table-column prop="accountLevel" label="Merch" />
              <el-table-column prop="accountExp" label="Collection Points" />
              <el-table-column prop="" label="operate" fixed="right" min-width="180">
                <template v-slot="scope">
                <div class="edits">
                  <el-button type="primary" size="small" @click="handleClick(scope.row,'delete')"
                    >Delete</el-button
                  >
                  <el-button type="primary" @click="handleClick(scope.row,'Modify')" size="small">Modify</el-button>
                </div>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
          <div class="paginationStyle">
            <el-pagination
              background
              layout="prev, pager, next"
              :small="true"
              :total="tableDate.total"
              @current-change="sizeChange"
            />
          </div>
        </el-main>
      </div>
      <Dialog @listActions="listActions" ref="refDialog" :dialogFormVisible="dialogFormVisible" ></Dialog>
    </div>
  </el-container>
</template>

<script setup>
import { ref,shallowRef } from "vue";
import {listAction} from "./barcode/index.js"
import Dialog from "./admins/dialog.vue"

const refDialog = ref()
const dialogFormVisible= shallowRef(false)

//搜索入参
const formInline= ref({
  page:"1",
  size:"10",
  searchStr: "",
  colName: "uid",
})

//表格数据
const tableDate = ref({
  list :[],
  total:0
})

//搜索条件
const onSubmit = () => nameplateListsAction()

//获取列表
const nameplateListsAction = () =>listAction(formInline.value,tableDate)

//分页触发
const sizeChange=(parmes)=>{
  formInline.value.page=parmes.toString()
  nameplateListsAction(formInline.value)
}

const handleClick = (rowData,type)=>{
  dialogFormVisible.value=true
  refDialog.value.cancelClick(true)
  refDialog.value.formDataReset({...rowData,typeView:type})
 
}

const listActions = ()=>nameplateListsAction(formInline.value)

//首次加载
nameplateListsAction(formInline.value)



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
.edits{
  display: flex;
}
</style>
