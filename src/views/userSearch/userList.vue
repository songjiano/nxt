<template>
  <el-container>
    <div class="body-el">
      <div class="search-base">
        <el-form :model="parmesList" class="demo-form-inline">
          <el-form-item label="FilterResident Status:" prop="resource">
            <el-radio-group v-model="parmesList.residentType">
              <el-radio label="0">Non-Resident Only</el-radio>
              <el-radio label="1">Resident Only</el-radio>
              <el-radio label="">All</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Merchs:" prop="Merch">
            <el-radio-group v-model="parmesList.merch">
              <el-radio label="1">>=1</el-radio>
              <el-radio label="">All</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="itemRight">
            <el-button type="primary" @click="onSubmit" color="#0960bd"
              >Filter</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="table-body">
        <div class="top-tips">
          <div>
            <el-button type="primary" @click="exportList" color="#0960bd"
              >Export</el-button
            >
          </div>
        </div>
        <el-main>
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
                prop="uid"
                label="UID"
                show-overflow-tooltip
                width="150px"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="nickname"
                label="Nickname"
                min-width="140"
                show-overflow-tooltip
                width="150px"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="ex_resident"
                label="NXT Resident"
                min-width="120"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="accountLevel"
                label="Level"
                min-width="60"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="credit"
                label="Credit"
                min-width="70"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="pendingCredit"
                label="Pending Credit"
                min-width="140"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="merch"
                label="Merch"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="accountExp"
                label="Collection Points"
                min-width="140"
              />
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
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import { listAction, userListExportAction } from "./useList/index.js";

//搜索入参
const parmesList = ref({
  page: "1",
  size: "10",
  residentType: "",
  merch: "",
});

//表格数据
const tableDate = ref({
  list: [],
  total: 0,
});

//搜索条件
const onSubmit = () => {
  getList(parmesList.value);
};

//获取列表
const getList = (parmes) => {
  listAction(parmes, tableDate);
};

//分页触发
const sizeChange = (parmes) => {
  parmesList.value.page = parmes.toString();
  getList(parmesList.value);
};

//导出
const exportList = () => {
  userListExportAction(parmesList.value);
};

//首次加载
getList(parmesList.value);
</script>

<style scoped>
.itemRight {
  float: right;
  margin-top: -39px;
  margin-right: 10px;
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
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-top: 16px;
}
.top-tips > div {
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
