<script setup>
import { ref } from "vue";
import { bmultiplierListsAction,maddOrEditAction,meDeleteAction } from "./index";
import { Edit, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const list = ref({});
const dialogFormVisible = ref(false);
const form = ref({});

const presAlert = (parmes={},key) => {
  form.value = {};
  form.value = {...parmes};
  if(key)form.value.segment=key
  
  dialogFormVisible.value = true;
};
const submit = (key)=>{
    
    const {id,code,segment,creditValue,accountExpValue,collectionPointsValue,remark} = form.value
    if(!(code&&segment&&creditValue&&accountExpValue&&collectionPointsValue&&remark)) return ElMessage.warning("nput invalid,please check and try again")
    const pamres={
      type:"0",id,code,segment,creditValue,accountExpValue,collectionPointsValue,remark
    }
    maddOrEditAction(pamres,getLists)
}
const deleteAco=()=>{
  meDeleteAction(form.value.id,getLists)
}
const getLists=()=> bmultiplierListsAction({type:0},list,dialogFormVisible);
getLists()
</script>

<template>
  <div class="m-body">
    <div v-for="(ints, key) in list">
      <div>Segment {{ key }}</div>
      <div><el-button class="add" :icon="Plus" @click="presAlert(undefined,key)">Add</el-button></div>
      <div class="cards" v-for="item in ints">
        <div class="tpm-product-set__title">
          {{ item.code }}
        </div>
        <div class="tpm-product-set__desc">
          <div>
            Credit:<span>{{ item.creditValue }}</span>
          </div>
          <div>
            EXP:<span>{{ item.accountExpValue }}</span>
          </div>
          <div>
            CP:<span>{{ item.collectionPointsValue }}</span>
          </div>
        </div>
        <div class="bt-b">
          <el-button
            type="primary"
            @click="presAlert(item)"
            size="small"
            :icon="Edit"
            circle
          />
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="Barcode Multiplier"
      width="546px"
    >
      <div class="top-tips">
        <div>Barcode Format</div>
        <div>
          <div>1</div>
          <div class="m-2">2</div>
          <div class="m-3">3</div>
          <div class="m-3">4</div>
          <div class="m-3">5</div>
          <div>6</div>
        </div>
        <div>
          <div>N</div>
          <div>O</div>
          <div>D</div>
          <div>N</div>
          <div>X</div>
          <div>T</div>
          <div>L</div>
          <div>A</div>
          <div>B</div>
          <div>S</div>
          <div>0</div>
          <div>0</div>
          <div>0</div>
        </div>
      </div>
      <el-form :model="form" class="demo-form-inline" :inline="true">
        <el-form-item>
          <div>
            <div>Barcode segment:</div>
            <el-input
              v-model="form.segment"
              :disabled="!!form.segment"
              autocomplete="off"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Credit Multiplier:</div>
            <el-input v-model="form.creditValue" autocomplete="off" type="number" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Barcode segment Name:</div>
            <el-input v-model="form.code" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>EXP Multiplier:</div>
            <el-input v-model="form.accountExpValue" autocomplete="off"  type="number"/>
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
            <el-input v-model="form.collectionPointsValue" autocomplete="off"  type="number"/>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Date Created:{{ form.createTime }}</div>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>Last modified:{{ form.updateTime }}</div>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <div>modified By:{{ form.modifiedName }}</div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit">
            Confirm
          </el-button>
          <el-button type="danger" @click="deleteAco" v-if="form.id">Delete</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.top-tips {
  width: 260px;
  margin: auto;
  margin-bottom: 13px;
  margin-top: -20px;
  & > div:first-child {
    margin-bottom: 8px;
  }
  & > div {
    display: flex;
    & > div {
      padding: 4px;
      border: 1px solid #c1c1c1;
      width: 20px;
      height: 20px;
    }
    .m-2 {
      width: 40px;
    }
    .m-3 {
      width: 60px;
    }
  }
}
.demo-form-inline {
  text-align: left;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.add {
  width: 100%;
  margin: 10px 0px;
  border: none;
}
.bt-b {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.m-body {
  background: #f3f5f8;
  display: flex;
  text-align: center;
  & > div {
    width: 24%;
    padding: 10px;
  }
}
.tpm-product-set__title {
  font-size: 16px;
  color: #181818;
  line-height: 24px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  border-bottom: 1px solid #f3f1f1;
  margin-bottom: 5px;
}
.tpm-product-set__desc {
  font-size: 14px;
  color: #4b5b76;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > div {
    display: flex;
    justify-content: space-between;
  }
}
.cards {
  background-color: #fff;
  padding: 6px 12px;
  margin-bottom: 5px;
}
.cards:hover {
  position: relative;
  box-shadow: 3px 3px 12px rgba(55, 99, 170, 0.2);
}
</style>
