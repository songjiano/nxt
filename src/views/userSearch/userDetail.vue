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
          <el-main>
            <el-scrollbar>
              <el-descriptions
                class="margin-top"
                title="User Detail"
                :column="2"
                border
              >
                <template #extra>
                  <el-button type="primary" v-if="details.UID" color="#0960bd" @click="goLog">Activity Logs</el-button>
                </template>
                <el-descriptions-item v-for="(value,key) in details" :key='key'>
                  <template #label>
                    <div class="cell-item">
                      {{ value.label }}
                    </div>
                  </template>
                  {{ value.value }} <el-tag size="small" v-if="isEdict(value.key)" @click="editVl(value.key,value.value,value.label)">Edit</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </el-scrollbar>
          </el-main>
        </div>
        <el-dialog v-model="dialogFormVisible" :title="'Edit ' + alertValue.label">
          <el-form :model="alertValue">
            <el-form-item :label="alertValue.label" >
              <el-input v-model="alertValue.value" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogFormAction">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </el-container>
  </template>
  
  <script setup>
  import { ref, reactive, watch, shallowRef } from "vue";
  import { useRouter,useRoute } from "vue-router";
  import { detailAction ,updateAction} from "./useList/index"
  import { isEdict } from "./useList/utils"

  const router = useRouter();

  const route=useRoute()
console.log("route",route.query)
  const formInline = reactive({
    searchStr:route.query.searchStr||"",
    colName: route.query.colName||"uid",
  });
  const options =ref([])
  const id=shallowRef("")
  const dialogFormVisible = shallowRef(false)
  const alertValue=ref({})

  // watch(() => formInline.colName,(res) => {
  //   formInline.searchStr=""
  // },{
  //   deep:true,
  //   immediate:true,
  // })
  const details=ref({})
  
  const onSubmit = () => {
    detailAction(formInline,details,id)
  };
  if(route.query.colName)onSubmit()
  const remoteMethod = (query) => {
    options.value = [
      {value:query+'@gmail.com',label:query+'@gmail.com'},
      {value:query+'@qq.com',label:query+'@qq.com'},
      {value:query+'@163.com',label:query+'@163.com'}
    ]
}

const editVl = (key,value,label) =>{
  alertValue.value = {key,value,label}
  dialogFormVisible.value = true;
}

const dialogFormAction = () =>{
  let parmeValue= {id:id.value}
  parmeValue[alertValue.value.key]=alertValue.value.value
  updateAction(parmeValue,onSubmit,dialogFormVisible)
}

  const goLog = ()=>{
    router.push({ path: "/logList",query:{searchStr:formInline.searchStr,colName:formInline.colName} });
  }

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
  