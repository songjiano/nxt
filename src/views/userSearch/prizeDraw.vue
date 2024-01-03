<script setup>
import { ref, shallowRef,computed } from "vue";
import {
  lotteryListsAction,
  lotteryPrizeListsAction,
  taddOrEditAction,
  loDeleteAction,
  uploadAction,
  logExportAction,
  viewLogAction,
  statusEditAction,
  losDeleteAction
} from "./prizeDraw/index";
import { ElMessage } from "element-plus";
import {
  getImage,
  transSt,
  transResident,
  prizeDrawColumns,
  prizeItemColumns,
} from "./prizeDraw/utils";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";

const list = ref({ list: [], total: 0 });
const lotteryList = ref([]);
const logList = ref({ list: [], total: 0 });
const dialogFormVisible = ref(false);
const disabled = ref(false);
const dialogVisible = ref(false);
const form = ref({});
const editableTabsValue = shallowRef(1);
const formColimns = ref([]);
const fileList = ref([]);
const imageUplouding = shallowRef(false);
const dialogImageUrl = ref("");

const formInline = ref({
  page: "1",
  size: "10",
});

const logInline = ref({
  page: "1",
  size: "10",
});

const lotteryPrizeLists = (id) => lotteryPrizeListsAction(formInline.value, list,id);

const getLists = () => lotteryListsAction(formInline.value, list, lotteryList,editableTabsValue);
const tabClick = (parmes) => {
  lotteryPrizeLists(parmes.paneName)
};

getLists();

//分页触发
const sizeChange = (parmes) => {
  formInline.value.page = parmes.toString();
  getLists();
};

const handleClick = (rowData = {}, item = "") => {
  form.value = {};
  fileList.value = [];
  form.value = { ...rowData, item, type: item ? "1" : "" };
  formColimns.value = item ? prizeItemColumns : prizeDrawColumns;
  if(item)fileList.value= rowData.imageUrl?[{
    name:rowData.imageUrl,
    url:getImage(rowData.imageUrl)
  }]:[]

  dialogFormVisible.value = true;
  if(item==='log') viewLogAction(logInline.value,logList,rowData.id)
};
const deleteAco = () => {
  if(!form.value.item) return losDeleteAction(form.value.id, getLists,dialogFormVisible)
  loDeleteAction(form.value.id, getLists,dialogFormVisible);
};
const submit = () => {
  const { item, id,type,lotteryId } = form.value;
  let pamres = {};
  let isEmpty = [];
  if (!item)
    isEmpty = prizeDrawColumns.filter((items) => {
      pamres[items.prop] = form.value[items.prop];
      return !form.value[items.prop];
    });
  if (item)
    isEmpty = prizeItemColumns.filter((items) => {
      pamres[items.prop] = form.value[items.prop];
      if(items.prop==='amount'&&type==="1"||type==="2")return false
      if(items.prop==='weeklyQuantity'&&type==="3"||type==="4")return false
      return !form.value[items.prop];
    });

  if (isEmpty.length > 0)
    return ElMessage.warning("nput invalid,please check and try again");
  let nameplateIds
  if(item==='add'){
    nameplateIds={lotteryId:id}
  }else{
    nameplateIds={id}
  }
  taddOrEditAction({ ...pamres, ...nameplateIds,item }, getLists, dialogFormVisible);
};
const handleRemove = (file) => {
  fileList.value = [];
};
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
//上传 图片
const beforeUpload = (file) => {
  imageUplouding.value = true;
  uploadAction(file.raw, imageUplouding, file, form);
};

const tatusRef=computed(()=>{
  const curentAct=lotteryList.value.filter(item=>item.id===editableTabsValue.value)[0]
  const isActives = curentAct?curentAct.status==="0":false
  return isActives
})
//导出日志
const exportLog = () =>{
  logExportAction(form.value.id)
}

const handleClickRun = (item) =>{
  const {id,status} = item
  const tatus = status==="0"?"1":"0"
  const parmes={id,status:tatus}
  statusEditAction(parmes,getLists)
}
</script>

<template>
  <div class="table-body">
    <el-tabs
      type="border-card"
      v-model="editableTabsValue"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="item in lotteryList"
        :label="item.name"
        :name="item.id"
      >
      <div class="prizeBox">
            <el-button round size="small" plain @click="handleClick({})"
            >Add</el-button
          >
          <el-button round size="small" plain @click="handleClick(item)"
            >Medify</el-button
          > 
          </div>
        <el-descriptions class="margin-top" :column="3" size="small" border>
          <el-descriptions-item min-width="60px">
            <template #label>
              <div class="cell-item">Draw Credit Cost</div>
            </template>
            {{ item.creditCost }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Daily Free Draws</div>
            </template>
            {{ item.dailyFreeLimit }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Last Modified</div>
            </template>
            {{ item.updateTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Cost Increase Per Draw</div>
            </template>
            {{ item.creditMultiplier }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Max Daily Draws</div>
            </template>
            {{ item.dailyLimit }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">Modified By</div>
            </template>
            {{ item.modifiedName }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="left-but">
          <el-button round size="small" v-if="item.status==='0'" plain @click="handleClick({id:item.id}, 'add')"
            >Add ></el-button
          >
          <el-button round size="small" plain @click="handleClick(item, 'log')"
            >Log ></el-button
          >
          <el-popconfirm @confirm="handleClickRun(item)" :title="'Are you sure '+ (item.status==='0'?'Activate':'Deactivate')+'?'">
            <template #reference>
              <el-button :type="item.status==='0'?'danger':'success'" round size="small">{{item.status==="0"?'Deactivate':'Activate'}}</el-button>
            </template>
          </el-popconfirm>
          
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-table :data="list.list" border size="default" stripe header-cell-class-name="headerBr">
      <el-table-column
        header-align="center"
        align="center"
        prop="imageUrl"
        label="lmage"
      >
        <template #default="scope">
          <div>
            <el-image  style="height: 26px" :src="getImage(scope.row.imageUrl)" :preview-src-list="[getImage(scope.row.imageUrl)]" preview-teleported/>
        </div>

          <!-- <div v-if="scope.row.imageUrl">
            <el-image
              style="height: 26px"
              :src="getImage(scope.row.imageUrl)"
              fit="contain"
            />
          </div> -->
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="type"
        label="Type"
        show-overflow-tooltip
        width="120px"
      >
        <template #default="scope">
          <div>
            {{ transSt(scope.row.type) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="title"
        label="Title"
        show-overflow-tooltip
        width="120px"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="subtitle"
        label="subTitle"
        show-overflow-tooltip
        width="120px"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="resident"
        label="Require Resident"
        show-overflow-tooltip
        width="82px"
      >
        <template #default="scope">
          <div>
            {{ transResident(scope.row.resident) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="probability"
        label="probability"
        width="110px"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="weeklyQuantity"
        label="Limit Per Week"
        width="90px"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="currentWeekRemainingCount"
        label="Remaining This Week"
        width="100px"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="position"
        label="Position"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="noUseCount"
        label="Total Remaining"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="amount"
        label="Amount"
      >
        <template #default="scope">
          <div>
            {{ scope.row.amount?scope.row.amount:(scope.row.amount===0?"infinite":"-")}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="createTime"
        label="Dats Added"
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
        width="90px"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop=""
        label="operate"
        fixed="right"
        width=" "
        v-if="tatusRef"
      >
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
    <el-dialog v-model="dialogFormVisible" title="Prize Draw" width="546px">
      <div v-if="form.item!=='log'">
        <el-form :model="form" class="demo-form-inline" :inline="true">
          <div v-for="item in formColimns" class="inlinblock">
            <el-form-item v-if="item.type === 'select'">
              <div :key="item.prop">
                <div>{{ item.label }}:</div>
                <el-select
                  v-model="form[item.prop]"
                  allow-create
                  default-first-option
                  :reserve-keyword="false"
                  class="nameplateIds"
                >
                  <el-option
                    v-for="items1 in item.option"
                    :key="items1.value"
                    :label="items1.label"
                    :value="items1.value"
                  />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item v-else-if="item.prop === 'imageUrl'">
              <div>
                <div>{{ item.label }}:</div>
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
              </div>
            </el-form-item>
            <div v-else-if="item.prop === 'weeklyQuantity'">
              <el-form-item  v-if="form.type === '1' || form.type === '2'">
                <div>
                <div>{{ item.label }}:</div>
                <el-input
                  v-model="form[item.prop]"
                  :type="item.type"
                  autocomplete="off"
                />
              </div>
              </el-form-item>
            </div>
            <div v-else-if="item.prop === 'amount'">
              <el-form-item v-if="form.type === '4' || form.type === '3'">
                <div>
                <div>{{ item.label }}:</div>
                <el-input
                  v-model="form[item.prop]"
                  :type="item.type"
                  autocomplete="off"
                />
              </div>
              </el-form-item>
            </div>
            <el-form-item v-else>
              <div>
                <div>{{ item.label }}:</div>
                <el-input
                  v-model="form[item.prop]"
                  :type="item.type"
                  autocomplete="off"
                />
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-else>
        <el-table :data="logList.list" size="small" border>
          <el-table-column property="createTime" label="Timestamp" show-overflow-tooltip
        width="80px" />
          <el-table-column property="ex_uid" label="UID" show-overflow-tooltip
        width="80px"/>
          <el-table-column property="ex_nickname" label="Nickname" show-overflow-tooltip
        width="80px"/>
          <el-table-column property="ex_resident" label="Resident" show-overflow-tooltip
        width="80px"/>
          <el-table-column property="creditCost" label="Credit Cost" show-overflow-tooltip
        width="80px"/>
          <el-table-column property="result" label="Result" show-overflow-tooltip
       />
        </el-table>
        <div class="paginationStyle">
          <el-pagination
            background
            layout="prev, pager, next"
            :small="true"
            :total="logList.total"
            @current-change="sizeChange"
          />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer" v-if="form.item!=='log'">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit"> Confirm </el-button>
          <el-button @click="deleteAco" v-if="form.id">Delete</el-button>
        </span>
        <span class="dialog-footer" v-else>
          <el-button type="primary" @click="exportLog"> Export </el-button>
        </span>
      </template>

    </el-dialog>
    <el-dialog v-model="dialogVisible" title="Preview Image">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.prizeBox{
  
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.inlinblock{
  display: inline-block;
}
.el-upload-list--picture-card {
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
  margin-top: 10px;
  margin-left: 10px;
}
.demo-form-inline {
  text-align: left;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
