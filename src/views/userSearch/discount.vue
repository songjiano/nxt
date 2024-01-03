<script setup>
import { ref, shallowRef } from "vue";
import {
  eventsListsAction,
  taddOrEditAction,
  exDeleteAction,
} from "./discount/index";
import { ElMessage } from "element-plus";
import { getImage } from "./nameplat/utils";
import moment from 'moment'

const list = ref({ list: [], total: 0 });
const dialogFormVisible = ref(false);
const form = ref({});
const dialogVisible = ref(false);
const disabled = ref(false);
const formInline = ref({
  page: "1",
  size: "10",
});

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};


const getLists = () =>
  eventsListsAction(formInline.value, list, dialogFormVisible);
getLists();

//分页触发
const sizeChange = (parmes) => {
  formInline.value.page = parmes.toString();
  getLists();
};

const handleClick = (rowData = {}) => {
  form.value = {};

  form.value = {...rowData,range:[rowData.startTime,rowData.endTime]};
  dialogFormVisible.value = true;
};
const deleteAco = () => {
  exDeleteAction(form.value.id, getLists);
};
const submit = () => {
  const {
    id,
    range,
    remark,
    title,
    barcodes
  } = form.value;
  if (
    !(
      barcodes &&
      remark&&
      range&&title
    )
  )
    return ElMessage.warning("nput invalid,please check and try again");
    const startTime=moment(range[0]).format('YYYY-MM-DD hh:mm:ss')
    const endTime=moment(range[1]).format('YYYY-MM-DD hh:mm:ss')
  const pamres = {
    id,
    barcodes,
    endTime,
    remark,
    title,
    startTime,barcodes
  };
  taddOrEditAction(pamres, getLists);
};
</script>

<template>
  <div class="table-body">
    <div class="left-but">
      <el-button type="primary" color="#0960bd" @click="handleClick"
        >Add</el-button
      >
    </div>

    <el-table :data="list.list" border stripe header-cell-class-name="headerBr">
      <el-table-column header-align="center" align="center" prop="title" label="Title" show-overflow-tooltip
        width="120px">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="startTime" label="Start Time" show-overflow-tooltip
        width="120px"/>
      <el-table-column header-align="center" align="center" prop="endTime" label="End Time" show-overflow-tooltip
        width="120px"/>
      <el-table-column header-align="center" align="center" prop="barcodes" label="Barcodes" width="150px">
        <template v-slot="scope">
          <div class="mix-1">
            <el-tag
              v-for="tag in scope.row.barcodes.split(',')"
              :key="tag"
              class="mx-1"
            >
              {{ tag }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime" label="Date Added" show-overflow-tooltip
        width="120px"/>
      <el-table-column header-align="center" align="center" prop="updateTime" label="Last Modified" show-overflow-tooltip
        width="120px"/>
      <el-table-column header-align="center" align="center" prop="modifiedName" label="Modified By" show-overflow-tooltip
        width="100px"/>
      <el-table-column header-align="center" align="center" prop="" label="operate" fixed="right" width="90">
        <template v-slot="scope">
          <div class="edits">
            <el-button
              type="primary"
              @click="handleClick(scope.row, 'Modify')"
              size="small"
              >Modify</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationStyle">
      <el-pagination
        background
        layout="prev, pager, next"
        :small="true"
        :total="list.total"
        @current-change="sizeChange"
      />
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="Merch Discount"
      width="546px"
    >
      <el-form :model="form" class="demo-form-inline" :inline="true">
        <el-form-item>
          <div>
            <div>Datetime Range</div>
            <el-date-picker
              v-model="form.range"
              type="datetimerange"
              start-placeholder="Start date"
              end-placeholder="End date"

            />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Title:</div>
            <el-input v-model="form.title" autocomplete="off" />
          </div>
        </el-form-item>
        
        <el-form-item>
          <div>
            <div>Remark:</div>
            <el-input v-model="form.remark" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Barcodes:</div>
            <el-input v-model="form.barcodes" type="textarea" autosize  autocomplete="off" />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit"> Confirm </el-button>
          <el-button type="danger" @click="deleteAco" v-if="form.id"
            >Delete</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style>
.el-upload-list--picture-card{
  width: 156px;
  height: 156px;
  overflow: hidden;
}
</style>
<style scoped lang="less">
.mix-1{
  &>span{
    margin: 4px 0px;
  }
  
}
.el-textarea{
  width: 472px;
}
.el-upload-list--picture-card{
  width: 156px;
  height: 156px;
  overflow: hidden;
}
.nameplateIds {
  width: 220px;
}
.edits > button {
  margin: 5px;
}
.paginationStyle {
  display: flex;
  padding: 20px;
  justify-content: end;
}
.table-body {
  background: #fff;
  padding: 10px;
  border-radius: 6px;
}
.left-but {
  float: right;
  margin-bottom: 10px;
}
.demo-form-inline {
  text-align: left;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
