<script setup>
import { ref, shallowRef } from "vue";
import {
  eventsListsAction,
  taddOrEditAction,
  exDeleteAction,
} from "./hall/index";
import { ElMessage } from "element-plus";
import { getImage } from "./nameplat/utils";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import moment from 'moment'
import { uploadAction } from "./nameplat/index.js";

const list = ref({ list: [], total: 0 });
const dialogFormVisible = ref(false);
const form = ref({});
const imageUplouding = shallowRef(false);
const fileList = ref([]);
const dialogVisible = ref(false);
const disabled = ref(false);
const formInline = ref({
  page: "1",
  size: "10",
});

//上传 图片
const beforeUpload = (file) => {
  imageUplouding.value = true;
  uploadAction(file.raw,imageUplouding,file,form)
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleRemove = (file) => {
  fileList.value=[]
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
  fileList.value=[]
  form.value = {...rowData,range:[rowData.startTime,rowData.endTime]};
  if(rowData.imageUrl)fileList.value[0]={
      name:rowData.imageUrl,
      url:getImage(rowData.imageUrl)
    }
  dialogFormVisible.value = true;
};
const deleteAco = () => {
  exDeleteAction(form.value.id, getLists);
};
const submit = () => {
  const {
    id,
    range,
    imageUrl,
    remark,
    name,
    targetUrl
  } = form.value;
  if (
    !(
      imageUrl &&
      remark&&
      range&&name&&targetUrl
    )
  )
    return ElMessage.warning("nput invalid,please check and try again");
    const startTime=moment(range[0]).format('YYYY-MM-DD hh:mm:ss')
    const endTime=moment(range[1]).format('YYYY-MM-DD hh:mm:ss')
  const pamres = {
    id,
    imageUrl,
    endTime,
    remark,
    name,
    startTime,targetUrl
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

    <el-table :data="list.list" border>
      <el-table-column header-align="center" align="center" prop="imageUrl" label="lmage" width="140">
        <template #default="scope">
          <div v-if="scope.row.imageUrl">
            <el-image
              style="width: 50px; height: 50px"
              :src="getImage(scope.row.imageUrl)"
              fit="contain"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="name" label="Name" width="140">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="startTime" label="Start Time" />
      <el-table-column header-align="center" align="center" prop="endTime" label="End Time" />
      <el-table-column header-align="center" align="center" prop="status" label="Status" />
      <el-table-column header-align="center" align="center" prop="createTime" label="Date Added" />
      <el-table-column header-align="center" align="center" prop="updateTime" label="Last Modified" />
      <el-table-column header-align="center" align="center" prop="modifiedName" label="Modified By" />
      <el-table-column header-align="center" align="center" prop="" label="operate" fixed="right" width=" ">
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
      title="NXT City Hall"
      width="546px"
    >
      <el-form :model="form" class="demo-form-inline" :inline="true">
        <el-form-item>
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
          <div>
            <div>Name:</div>
            <el-input v-model="form.name" autocomplete="off" />
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
            <div>TargetUrl:</div>
            <el-input v-model="form.targetUrl" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>Nameplate Image</div>
          <div style="width: 100%"></div>
          <el-upload
            action="#"
            v-model:file-list="fileList"
            :disabled="imageUplouding"
            list-type="picture-card"
            :on-change="beforeUpload"
            accept="image/png, image/jpeg"

            :limit="1"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>

            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
     s
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>

          <el-dialog v-model="dialogVisible"  title="Preview Image">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
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
