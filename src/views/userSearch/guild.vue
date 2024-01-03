<script setup>
import { ref, shallowRef } from "vue";
import {
  exchangeListsAction,
  eaddOrEditAction,
  exDeleteAction,
  uploadGiftsAction
} from "./guild/index";
import { uploadAction } from "./nameplat/index.js";
import { ElMessage } from "element-plus";
import { getImage } from "./nameplat/utils";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

const list = ref({ list: [], total: 0 });
const dialogFormVisible = ref(false);
const form = ref({});
const imageUplouding = shallowRef(false);
const fileList = ref([]);
const fileList1 = ref([]);
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

//导入
const beforeUpload1 = (file,id) => {
  uploadGiftsAction({file:file.raw,id},getLists,fileList1);
};

const handleDownload = (file) => {
  console.log(file);
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleRemove = (file) => {
  fileList.value=[]
};

const getLists = () =>
  exchangeListsAction(formInline.value, list, dialogFormVisible);
getLists();

//分页触发
const sizeChange = (parmes) => {
  formInline.value.page = parmes.toString();
  getLists();
};

const handleClick = (rowData = {}) => {
  form.value = {};
  fileList.value=[]
  if(rowData.imageUrl)fileList.value[0]={
      name:rowData.imageUrl,
      url:getImage(rowData.imageUrl)
    }
  form.value = { ...rowData};
  dialogFormVisible.value = true;
};
const deleteAco = () => {
  exDeleteAction(form.value.id, getLists);
};
const submit = () => {
  const {
    id,
    creditCost,
    dailyLimit,
    imageUrl,
    message,
    remark,
    resident,
    sort,
    subtitle,
    title,
    type,
    value,
  } = form.value;
console.log("form.value",form.value)
  if (
    !(
      creditCost &&
      dailyLimit &&
      imageUrl &&
      message &&
      resident &&
      remark&&
      sort&&
      subtitle&&
      title&&
      type
    )
  )
    return ElMessage.warning("nput invalid,please check and try again");
  if((type==="1"&&!value))return ElMessage.warning("nput invalid,please check and try again");
  const pamres = {
    id,
    creditCost,
    dailyLimit,
    imageUrl,
    message,
    remark,
    resident,
    sort,
    subtitle,
    title,
    type,
    value
  };
  eaddOrEditAction(pamres, getLists);
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
      <el-table-column header-align="center" align="center" prop="imageUrl" label="lmage" width="80">
        <template #default="scope">
          <div>
            <el-image  style="height: 26px" :src="getImage(scope.row.imageUrl)" :preview-src-list="[getImage(scope.row.imageUrl)]" preview-teleported/>
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="type" label="Type" width="90">
        <template #default="scope">
          <div>{{ scope.row.type === "0" ? "Gift Card" : "EXP" }}</div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="title" label="Title" show-overflow-tooltip
        width="90px"/>
      <el-table-column header-align="center" align="center" prop="subtitle" label="Subtitle" show-overflow-tooltip
        width="90px"/>
      <el-table-column header-align="center" align="center" prop="resident" label="Resident" width="90px">
        <template #default="scope">
          <div>{{ scope.row.resident === "0" ? "No" : "Yes" }}</div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="sort" label="Position" width="90px"/>
      <el-table-column header-align="center" align="center" prop="creditCost" label="Credit Cost" width="100px"/>
      <el-table-column header-align="center" align="center" prop="dailyLimit" label="Daily Limit" width="100px"/>
      <el-table-column header-align="center" align="center" prop="message" label="System Message" width="83px"/>
      <el-table-column header-align="center" align="center" prop="noUseCount" label="Remaining" width="100px"/>
      <el-table-column header-align="center" align="center" prop="updateTime" label="Last Modified" show-overflow-tooltip
        width="120px"/>
      <el-table-column header-align="center" align="center" prop="modifiedName" label="Modified By" width="120px"/>
      <el-table-column header-align="center" align="center" prop="" label="operate" fixed="right" width="120px">
        <template v-slot="scope">
          <div class="edits">
            <el-upload
            action="#"
            v-if="scope.row.type === '0'"
            v-model:file-list="fileList1"
            :disabled="imageUplouding"
            :show-file-list="false"
            :on-change="event=>beforeUpload1(event,scope.row.id)"
            :auto-upload="false"
          >
          <el-button size="small" type="primary">Upload Seria</el-button>
            </el-upload>
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
      title="Mercator‘s Guild"
      width="546px"
    >
      <el-form :model="form" class="demo-form-inline" :inline="true">
        <el-form-item>
          <div>
            <div>Title:</div>
            <el-input v-model="form.title" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Subtitle:</div>
            <el-input v-model="form.subtitle" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Position:</div>
            <el-input v-model="form.sort" autocomplete="off" type="number" />
          </div>
        </el-form-item>

        <el-form-item>
          <div>
            <div>Type:</div>
            <el-select
              v-model="form.type"
              placeholder="Choose type !"
              class="nameplateIds"
            >
              <el-option label="Gift Card" value="0" />
              <el-option label="EXP" value="1" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item v-if="form.type === '1'">
          <div>
            <div>EXP:</div>
            <el-input v-model="form.value" autocomplete="off" type="number" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Credit Cost:</div>
            <el-input
              v-model="form.creditCost"
              autocomplete="off"
              type="number"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Daily Limit:</div>
            <el-input
              v-model="form.dailyLimit"
              autocomplete="off"
              type="number"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <div>
            <div>Require Resident:</div>
            <el-select
              v-model="form.resident"
              placeholder="Choose resident !"
              class="nameplateIds"
            >
              <el-option label="No" value="0" />
              <el-option label="Yes" value="1" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>System Message:</div>
            <el-input v-model="form.message" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Remark:</div>
            <el-input v-model="form.remark" autocomplete="off" />
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
