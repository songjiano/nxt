<template>
  <el-container>
    <div class="body-el">
      <div class="table-body">
        <div class="top-tips">
          <div>Admin List</div>
          <div v-if="Authtypes==='1'">
            <el-button type="primary" color="#0960bd" @click="handleClick('','Add')">Create Admin</el-button>
          </div>
        </div>
        <el-main>
          <el-scrollbar>
            <el-table :data="tableDate.list" border stripe header-cell-class-name="headerBr" >
              <el-table-column prop="account" label="Account Name" align="center" sortable width="150px"/>
              <el-table-column prop="type" label="Type"  align="center" width="120px">
                <template v-slot="scope">
                <div>
                  {{ tranType(scope.row.type) }}
                </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="lastLoginTime" label="Last Login" show-overflow-tooltip
        width="180px"/>
              <el-table-column align="center" prop="LastLogOff" label="Last Log Off" show-overflow-tooltip
        width="180px"/>
              <el-table-column align="center" prop="lastLoginIp" label="Last Login IP" show-overflow-tooltip
        width="120px"/>
              <el-table-column align="center" prop="" label="operate" fixed="right"  width="160px">
                <template v-slot="scope">
                <div class="edits">
                  <el-button type="primary" size="small" @click="handleClick(scope.row,'View Log')"
                    >View Log</el-button
                  >
                  <el-button type="primary" @click="handleClick(scope.row,'Modify')" size="small" v-if="Authtypes==='1'&&getRoleTypeName!==scope.row.type">Modify</el-button>
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
    </div>
    <Dialog @listActions="listActions" ref="refDialog" :dialogFormVisible="dialogFormVisible" ></Dialog>
  </el-container>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import { useRoute } from "vue-router"
import {listAction,detailAction} from "./admins/index"
import Dialog from "./admins/dialog.vue"
import {urlRole,getRoleType} from "@/utils/help"

const route = useRoute()
const pathType= urlRole(route.path)

const parmesList= ref({
  page:"1",
  size:"10"
})

const refDialog = ref()
const Authtypes = ref(pathType)
const dialogFormVisible= shallowRef(false)
const tableDate = shallowRef({total:0,list:[]})

const typeDefined=[
  {t:"0",v:"Ultra Admin"},
  {t:"1",v:"Super Admin"},
  {t:"2",v:"Admin"},
]
const getRoleTypeName= getRoleType("type")
listAction(parmesList.value,tableDate)
const listActions=()=>listAction(parmesList.value,tableDate)
const tranType=(t)=>{
  if(!t) return ''
  const typeVlaue= typeDefined.filter(item=>item.t===t)[0]
  return typeVlaue?typeVlaue.v:''
}
const handleClick = (rowData,type)=>{
  dialogFormVisible.value=true
  refDialog.value.cancelClick(true)
  if(!rowData)return refDialog.value.formDataReset({...rowData,typeView:type,Authtypes:getRoleTypeName})
  detailAction({id:rowData.id},refDialog,type,getRoleTypeName)
}
const sizeChange=(parmes)=>{
  parmesList.value.page=parmes.toString()
  listActions()
}
</script>

<style scoped>
.edits{
  display: flex;
  justify-content: center;
}
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
