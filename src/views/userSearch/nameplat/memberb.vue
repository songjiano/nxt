<script setup>
import { ref } from "vue";
import {
  bmultiplierListsAction,
  maddOrEditAction,
  meDeleteAction,
} from "./index";
import { ElMessage } from "element-plus";

const list = ref([]);
const dialogFormVisible = ref(false);
const form = ref({});

const getLists = () =>
  bmultiplierListsAction({ type: 1 }, list, dialogFormVisible);
getLists();

const handleClick = (rowData = {}) => {
  form.value = {};
  form.value = { ...rowData };
  dialogFormVisible.value = true;
};
const deleteAco = () => {
  meDeleteAction(form.value.id, getLists);
};
const submit = () => {
  const {
    id,
    creditValue,
    startLevel,
    endLevel,
    accountExpValue,
    collectionPointsValue,
    remark,
  } = form.value;
  if (
    !(
      startLevel &&
      endLevel &&
      creditValue &&
      accountExpValue &&
      collectionPointsValue &&
      remark
    )
  )
    return ElMessage.warning("nput invalid,please check and try again");
  const pamres = {
    type: "1",
    id,
    creditValue,
    accountExpValue,
    collectionPointsValue,
    remark,
    startLevel,
    endLevel,
  };
  maddOrEditAction(pamres, getLists);
};
</script>

<template>
  <div>
    <div class="left-but">
      <el-button type="primary" color="#0960bd" @click="handleClick"
        >Add</el-button
      >
    </div>
    <el-table :data="list" border stripe header-cell-class-name="headerBr">
      <el-table-column
        header-align="center"
        align="center"
        prop="Level"
        label="Level"
        show-overflow-tooltip
        width="100px"
      >
        <template #default="scope">
          <div>{{ scope.row.startLevel }} - {{ scope.row.endLevel }}</div>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="Multiplier"
        label="Multiplier"
        width="140"
      >
        <template #default="scope">
          <div>Credit: {{ scope.row.creditValue }}</div>
          <div>EXP: {{ scope.row.accountExpValue }}</div>
          <div>CP: {{ scope.row.collectionPointsValue }}</div>
        </template>
      </el-table-column>
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
        min-width="120px"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop=""
        label="operate"
        fixed="right"
        width="90"
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
    <el-dialog
      v-model="dialogFormVisible"
      title="Member Level Multiplier"
      width="546px"
    >
      <el-form :model="form" class="demo-form-inline" :inline="true">
        <el-form-item>
          <div>
            <div>Level Range:</div>
            <el-input
              type="number"
              v-model="form.startLevel"
              autocomplete="off"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>.</div>
            <el-input
              type="number"
              v-model="form.endLevel"
              autocomplete="off"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Credit Multiplier:</div>
            <el-input
              v-model="form.creditValue"
              autocomplete="off"
              type="number"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <div>
            <div>EXP Multiplier:</div>
            <el-input
              v-model="form.accountExpValue"
              autocomplete="off"
              type="number"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Comment(Optional):</div>
            <el-input v-model="form.remark" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Coollection Point Multiplier:</div>
            <el-input
              v-model="form.collectionPointsValue"
              autocomplete="off"
              type="number"
            />
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

<style scoped lang="less">
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
