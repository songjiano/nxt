<template>
  <el-container>
    <div class="body-el">
      <div class="table-body">
        <div class="top-tips">
          <div class="left-but" v-if="editableTabsValue < 2">
            <el-button
              type="primary"
              color="#0960bd"
              @click="handleClick('', 'Add')"
              >Add</el-button
            >
          </div>
          <el-tabs
            type="border-card"
            v-model="editableTabsValue"
            @tab-click="tabClick"
          >
            <el-tab-pane label="BarcodeSettings" name="-1">
              <el-scrollbar>
                <el-table
                  :data="tableDate.list"
                  border
                  stripe
                  header-cell-class-name="headerBr"
                >
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="nickname"
                    label="lmage"
                    width="80"
                  >
                    <template #default="scope">
                      <div
                        v-if="
                          scope.row.productDetail &&
                          scope.row.productDetail.imageUrl
                        "
                      >
                        <el-image
                          style="height: 26px"
                          :src="scope.row.productDetail.imageUrl"
                          :preview-src-list="[scope.row.productDetail.imageUrl]"
                          preview-teleported
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="status"
                    label="Name"
                    show-overflow-tooltip
                    width="120px"
                  >
                    <template #default="scope">
                      <div>
                        {{
                          scope.row.productDetail &&
                          scope.row.productDetail.productTitle
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="accountLevel"
                    label="SKU"
                    show-overflow-tooltip
                    width="90px"
                  >
                    <template #default="scope">
                      <div>
                        {{
                          scope.row.productDetail && scope.row.productDetail.sku
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="code"
                    label="Barcode"
                    show-overflow-tooltip
                    width="120px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="pendingCredit"
                    label="Status"
                    width="120"
                  >
                    <template #default="scope">
                      <div>
                        {{
                          scope.row.productDetail ? "Match Found" : "No Match"
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="nameplates"
                    label="NamePlate"
                    show-overflow-tooltip
                    width="120px"
                  >
                    <template #default="scope">
                      <div v-for="item in scope.row.nameplates">
                        {{ item.name }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="borders"
                    label="Border"
                    width="100px"
                  >
                    <template #default="scope">
                      <div class="mix-1">
                          <el-tag
                            v-for="tag in scope.row.borders"
                            :key="tag"
                            class="mx-1"
                          >
                            {{ tag.name }}
                          </el-tag>
                        </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="createTime"
                    label="Date Added"
                    show-overflow-tooltip
                    width="120px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="updateTime"
                    label="Last Modified"
                    show-overflow-tooltip
                    width="120px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="modifiedName"
                    label="Modified By"
                    show-overflow-tooltip
                    width="100px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop=""
                    label="operate"
                    fixed="right"
                    width="100"
                  >
                    <template v-slot="scope">
                      <div class="edits">
                        <el-popconfirm
                          width="220"
                          confirm-button-text="OK"
                          cancel-button-text="No, Thanks"
                          @confirm="confirms(scope.row.id)"
                          icon-color="#626AEF"
                          title="Are you sure to delete this?"
                        >
                          <template #reference>
                            <el-button size="small">Delete</el-button>
                          </template>
                        </el-popconfirm>
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
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="Nameplates" name="0">
              <el-scrollbar>
                <el-table
                  :data="tableDate.list"
                  border
                  stripe
                  header-cell-class-name="headerBr"
                >
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="imageUrl"
                    label="lmage"
                    width="80"
                  >
                    <template #default="scope">
        
                      <div
                        v-if="scope.row.imageUrl"
                      >
                        <el-image
                          style="height: 26px"
                          :src="getImage(scope.row.imageUrl)"
                          :preview-src-list="[getImage(scope.row.imageUrl)]"
                          preview-teleported
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="name"
                    label="Name"
                    show-overflow-tooltip
                    width="120px"
                  ></el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="createTime"
                    label="Date Added"
                    show-overflow-tooltip
                    width="150px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="updateTime"
                    label="Last Modified"
                    show-overflow-tooltip
                    width="150px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="modifiedName"
                    label="Modified By"
                    show-overflow-tooltip
        
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop=""
                    label="operate"
                    fixed="right"
                    width="100"
                  >
                    <template v-slot="scope">
                      <div class="edits">
                        <el-popconfirm
                          width="220"
                          confirm-button-text="OK"
                          cancel-button-text="No, Thanks"
                          @confirm="confirms(scope.row.id)"
                          icon-color="#626AEF"
                          title="Are you sure to delete this?"
                        >
                          <template #reference>
                            <el-button size="small">Delete</el-button>
                          </template>
                        </el-popconfirm>
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
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="Boarders" name="1">
              <el-scrollbar>
                <el-table
                  :data="tableDate.list"
                  border
                  stripe
                  header-cell-class-name="headerBr"
                >
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="imageUrl"
                    label="lmage"
                    width="80"
                  >
                    <template #default="scope">
                      <div>
                        <el-image
                          style="height: 26px"
                          :src="getImage(scope.row.imageUrl)"
                          :preview-src-list="[getImage(scope.row.imageUrl)]"
                          preview-teleported
                        />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="name"
                    label="Name"
                    show-overflow-tooltip
                    width="120px"
                  ></el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="createTime"
                    label="Date Added"
                    show-overflow-tooltip
                    width="180px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="updateTime"
                    label="Last Modified"
                    show-overflow-tooltip
                    width="180px"
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop="modifiedName"
                    label="Modified By"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    header-align="center"
                    align="center"
                    prop=""
                    label="operate"
                    fixed="right"
                    width="80"
                  >
                    <template v-slot="scope">
                      <div class="edits">
                        <el-popconfirm
                          width="220"
                          confirm-button-text="OK"
                          cancel-button-text="No, Thanks"
                          @confirm="confirms(scope.row.id)"
                          icon-color="#626AEF"
                          title="Are you sure to delete this?"
                        >
                          <template #reference>
                            <el-button size="small">Delete</el-button>
                          </template>
                        </el-popconfirm>
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
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="Barcode Multiplier" name="2"
              ><Multiplier></Multiplier
            ></el-tab-pane>
            <el-tab-pane label="Member Multiplier" name="3"
              ><Memberb></Memberb
            ></el-tab-pane>
            <el-tab-pane label="Generic Multiplier" name="4"
              ><Generic></Generic
            ></el-tab-pane>
            <div class="paginationStyle" v-if="editableTabsValue < 2">
              <el-pagination
                background
                layout="prev, pager, next"
                :small="true"
                :total="tableDate.total"
                @current-change="sizeChange"
              />
            </div>
          </el-tabs>
        </div>
      </div>
      <el-dialog v-model="dialogFormVisible" :title="title" @closed="closeds">
        <el-form :model="form">
          <div v-if="editableTabsValue === '-1'">
            <el-form-item>
              <div>Barcode (Use Barcode format of 13 characters)</div>
              <el-input v-model="form.code" autocomplete="off">
                <template #append>
                  <el-button :icon="Search" @click="searchAction" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="srcList">
              <div class="demo-image__preview">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="srcList.imageUrl"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="srcList.imageUrl"
                  :initial-index="4"
                  fit="cover"
                />
                <div class="skud">
                  <div>{{ srcList.productTitle }}</div>
                  <div>{{ srcList.title }}</div>
                  <div>{{ srcList.sku }}</div>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div>Nameplate (None, single, or multiple selections)</div>
              <el-select
                v-model="form.nameplateIds"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                class="nameplateIds"
                placeholder="Choose tags for your article"
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
              <div>Boarder (None, single, or multiple selections)</div>
              <el-select
                v-model="form.borderIds"
                multiple
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                class="nameplateIds"
                placeholder="Choose tags for your article"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div v-if="editableTabsValue === '0' || editableTabsValue === '1'">
            <el-form-item>
              <div>Nameplate Name</div>
              <el-input v-model="form.name" autocomplete="off" />
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

              <el-dialog v-model="dialogVisible" title="Preview Image">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <div>Comment</div>
              <el-input v-model="form.remark" autocomplete="off" />
            </el-form-item>
          </div>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submints"> Confirm </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </el-container>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import {
  listAction,
  barcodeListsAction,
  barcodeAddAction,
  barcodeDeleteAction,
  barcodeUpdateAction,
  uploadAction,
  addOrEditAction,
  bareDeleteAction,
  detailByBarcodeAction,
} from "./nameplat/index.js";
import { ElMessage } from "element-plus";
import {
  Delete,
  Download,
  Plus,
  ZoomIn,
  Search,
} from "@element-plus/icons-vue";
import { getImage } from "./nameplat/utils";
import Multiplier from "./nameplat/multiplier.vue";
import Memberb from "./nameplat/memberb.vue";
import Generic from "./nameplat/generic.vue";
const dialogFormVisible = shallowRef(false);

//搜索入参
const formInline = ref({
  page: "1",
  size: "10",
  type: "-1",
});
const options = ref([]);
const options1 = ref([]);
const form = ref({});
const editableTabsValue = shallowRef("-1");
const title = shallowRef("Merch Barcode");
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const imageUplouding = shallowRef(false);
const fileList = ref([]);
const srcList = ref();

const searchAction = () => {
  if (!form.value.code) return;
  detailByBarcodeAction({ barcode: form.value.code }, srcList);
};
//表格数据
const tableDate = ref({
  list: [],
  total: 0,
});

const handleRemove = (file) => {
  fileList.value = [];
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};

//上传 图片
const beforeUpload = (file) => {
  imageUplouding.value = true;
  uploadAction(file.raw, imageUplouding, file, form);
};
const tabClick = (parmes = {}) => {
  const type = parmes.paneName;
  if (type === "0" || type === "1") {
    title.value = type === "0" ? "Nameplate" : "Border";
    return listAction({ ...formInline.value, type }, tableDate);
  } else if (type === "-1") {
    title.value = "Merch Barcode";
    barcodeListsAction(formInline.value, tableDate);
  }
};
const confirms = (id) => {
  if (editableTabsValue.value === "0" || editableTabsValue.value === "1")
    return bareDeleteAction({ id }, () =>
      tabClick({ paneName: editableTabsValue.value })
    );
  barcodeDeleteAction({ id }, tabClick);
};

const closeds = (ps) => {
  form.value = {};
  srcList.value = "";
};
//获取列表
const nameplateListsAction = () => listAction(formInline.value, tableDate);

//分页触发
const sizeChange = (parmes) => {
  formInline.value.page = parmes.toString();
  nameplateListsAction(formInline.value);
};

const handleClick = (rowData) => {
  if (rowData.id) {
    form.value.code = rowData.code;
    form.value.nameplateIds =
      rowData.nameplates &&
      rowData.nameplates.map((item) => {
        return item.id;
      });
    form.value.borderIds =
      rowData.borders &&
      rowData.borders.map((item) => {
        return item.id;
      });
    form.value.id = rowData.id;
  } else {
    fileList.value = [];
  }
  dialogFormVisible.value = true;
  if (editableTabsValue.value === "0" || editableTabsValue.value === "1") {
    fileList.value[0] = rowData.imageUrl
      ? {
          name: rowData.imageUrl,
          url: getImage(rowData.imageUrl),
        }
      : underfind;
    if (rowData.id) {
      const { imageUrl, remark, name, id } = rowData;
      form.value = {
        imageUrl,
        remark,
        name,
        type: editableTabsValue.value,
        id,
      };
    }
    return (form.value.type = editableTabsValue.value);
  }
  listAction({ page: "1", size: "999", type: "0" }, options, "op");
  listAction({ page: "1", size: "999", type: "1" }, options1, "op");
};

const submints = () => {
  const { code, nameplateIds, borderIds, imageUrl, name, remark } = form.value;
  const tab1 =
    editableTabsValue.value === "-1" && !(code && nameplateIds && borderIds);
  const tab2 =
    (editableTabsValue.value === "0" || editableTabsValue.value === "1") &&
    !(imageUrl && name && remark);
  if (tab1) {
    return ElMessage.warning("nput invalid,please check and try again");
  }
  if (tab2) {
    return ElMessage.warning("nput invalid,please check and try again");
  }
  const parmes = {
    code,
    nameplateIds: nameplateIds && nameplateIds.toString(),
    borderIds: borderIds && borderIds.toString(),
    id: form.value.id,
    imageUrl,
    name,
    remark,
  };
  if (form.value.id) {
    if (editableTabsValue.value === "-1")
      return barcodeUpdateAction(parmes, tabClick, dialogFormVisible);
    if (editableTabsValue.value === "1" || editableTabsValue.value === "0") {
      const parmed = { ...parmes, type: editableTabsValue.value };
      return addOrEditAction(
        parmed,
        () => tabClick({ paneName: editableTabsValue.value }),
        dialogFormVisible
      );
    }
  } else {
    if (editableTabsValue.value === "1" || editableTabsValue.value === "0") {
      const parmed = { ...parmes, type: editableTabsValue.value };
      return addOrEditAction(
        parmed,
        () => tabClick({ paneName: editableTabsValue.value }),
        dialogFormVisible
      );
    }
    if (editableTabsValue.value === "-1")
      barcodeAddAction(
        parmes,
        () => tabClick({ paneName: editableTabsValue.value }),
        dialogFormVisible
      );
  }
};

//首次加载
barcodeListsAction(formInline.value, tableDate);
</script>
<style>
.el-upload-list--picture-card {
  width: 156px;
  height: 156px;
  overflow: hidden;
}
</style>
<style scoped>
.mix-1>span{
    margin: 4px 0px;
  
}
.el-upload-list--picture-card {
  width: 156px;
  height: 156px;
  overflow: hidden;
}
.skud {
  margin-left: 10px;
}
.demo-image__preview {
  display: flex;
}
.nameplateIds {
  width: 100%;
}
.left-but {
  float: right;
  position: relative;
  z-index: 10;
  margin: 3px;
}
.body-el {
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
.edits button {
  margin: 4px;
}
</style>
