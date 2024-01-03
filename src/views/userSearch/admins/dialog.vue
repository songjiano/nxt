<script setup>
import { ref, shallowRef } from "vue";
import { Warning, CircleCheck,CircleClose } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
import {addOrEditAction }from './index'

const emit = defineEmits([ "listActions" ]);
const props = defineProps(["dialogFormVisible"]);
const dialogFormVisible = shallowRef(false);
const typeView = shallowRef("");
const regFalse = shallowRef(false);
const showReG = ref({
  numReg: false,
  lReg: false,
  uReg: false,
  otoReg: false,
});

const menuPerms = [
  { name: "User List：", menuId: 1, type: "0", disable: "2" },
  { name: "User Search：", menuId: 2, type: "0", disable: "2" },
  { name: "Admin：", menuId: 3, type: "0", disable: "2" },
  { name: "Front Page：", menuId: 4, type: "0", disable: "2" },
  { name: "NXT City Hall：", menuId: 5, type: "0", disable: "2" },
  { name: "Mercator‘s Guild：", menuId: 6, type: "0", disable: "2" },
  { name: "Prize Draw：", menuId: 7, type: "0", disable: "2" },
  { name: "Rankings：", menuId: 8, type: "0", disable: "2" },
  { name: "Merch Categorization：", menuId: 9, type: "0", disable: "2" },
];
const formData = {
  account: "",
  password: "",
  rePassword: "",
  status: "1",
  type: "2",
  menuPerms,
};

const numReg = /\d/;
const lReg = /^.*[a-z]+.*$/;
const uReg = /^.*[A-Z]+.*$/;
const otoReg = new RegExp(
  "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
);
const form = ref({ ...formData });
const typeChange = (Authtypes,trs) => {
  const cmenuPerms = form.value.menuPerms || menuPerms;
  form.value.menuPerms = cmenuPerms.map((item) => {
    item.disable = Authtypes;
    item.type = trs?"0":item.type ;
    return item;
  });
};

const formDataReset = (nxtToken) => {
  typeView.value = nxtToken.typeView;
  const cmenuPerms = nxtToken.menuPerms || menuPerms;
  form.value = { ...formData };
  if (nxtToken && nxtToken.id) {
    form.value = { ...nxtToken,password:"-1",rePassword:"-1",createTime
:undefined,createBy:undefined,lastLoginTime:undefined,updateTime:undefined };
    typeChange(nxtToken.Authtypes);
    form.value.menuPerms = menuPerms.map((item) => {
      const curentIten = cmenuPerms.filter((it) => it.menuId === item.menuId);
      item.type = curentIten[0].type;
      return item;
    });
  } else {
    typeChange("2",true);
  }
};

const cancelClick = (pames) => {
  dialogFormVisible.value = pames;
};
const doSth=()=>emit('listActions');
const confirmClick = () => {
  if(!form.value.account)return ElMessage.error('please input Account Name')
  if(!form.value.password)return ElMessage.error('please input password')
  if(form.value.password!=='-1'){
    if(form.value.password!==form.value.rePassword)return ElMessage.error('Re-enter Password and Password require the same value!')
    const {numReg,lReg,uReg,otoReg} = showReG.value
    if(!(numReg&&lReg&&uReg&&otoReg)){return regFalse.value=true}else{regFalse.value=false}
  }
  addOrEditAction(form.value,dialogFormVisible,doSth)
};

const passwordChange = (pamers) => {
  console.log("passwordChange", pamers);
};

const passwordInput = (pamers) => {
  showReG.value.numReg = numReg.test(pamers);
  showReG.value.lReg = lReg.test(pamers);
  showReG.value.uReg = uReg.test(pamers);
  showReG.value.otoReg = otoReg.test(pamers);
};
const rfocus = ()=>{if(form.value.rePassword==='-1')form.value.rePassword=''}
const pfocus = ()=>{if(form.value.password==='-1')form.value.password=''}
defineExpose({ cancelClick, formDataReset });
</script>

<template>
  <div>
    <el-drawer v-model="dialogFormVisible" direction="rtl" size="650px">
      <template #header>
        <h4>{{ typeView }}</h4>
      </template>
      <template #default>
        <div>
          <div class="tiotil">Info</div>
          <el-form
            :model="form"
            label-width="136px"
            :inline="true"
            label-position="left"
            class="demo-form-inline"
          >
            <el-form-item label="Account Type" label-width="100px">
              <el-select
                v-model="form.type"
                placeholder="please select Account Type"
                @change="typeChange"
                :disabled="typeView==='View Log'"
              >
                <el-option :disabled="true" label="Ultra Admin" value="0" />
                <el-option label="Super Admin" value="1" />
                <el-option label="Admin" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="Account Name">
              <el-input
                v-model="form.account"
                :disabled="typeView==='View Log'"
                placeholder="please input Account Name"
              />
            </el-form-item>
            <el-form-item label="Password" label-width="100px">
              <el-input
                v-model="form.password"
                @input="passwordInput"
                :type="form.id?'password':'text'"
                @change="passwordChange"
                :disabled="typeView==='View Log'"
                @focus="pfocus"
                placeholder="please input Password"
              />
            </el-form-item>
            <el-form-item label="Re-enter Password">
              <el-input
                v-model="form.rePassword"
                :type="form.id?'password':'text'"
                @focus="rfocus"
                :disabled="typeView==='View Log'"
                placeholder="please input Password"
              />
            </el-form-item>
            <el-form-item label="">
              <div class="dioTips">
                <div class="truesTop">
                  <el-icon color="#fa9d30" size="12px"><Warning /></el-icon>
                  Passwords must contain:
                </div>
                <div :class="showReG.lReg ? 'trues' : 'falses'">
                  - a minimum of 1 lower case leter [a-z] and
                  <el-icon v-if="showReG.lReg" color="#2ad739"
                    ><CircleCheck
                  /></el-icon>
                  <el-icon v-else-if="regFalse" color="red"><CircleClose /></el-icon>
                </div>
                <div :class="showReG.uReg ? 'trues' : ''">
                  - a minimum of 1 upper case leter [A-Z] and
                  <el-icon v-if="showReG.uReg" color="#2ad739"
                    ><CircleCheck
                  /></el-icon>
                  <el-icon v-else-if="regFalse"  color="red"><CircleClose /></el-icon>
                </div>
                <div :class="showReG.numReg ? 'trues' : ''">
                  - a minimum of 1 numeric character [0-9]and
                  <el-icon v-if="showReG.numReg" color="#2ad739"
                    ><CircleCheck
                  /></el-icon>
                  <el-icon v-else-if="regFalse"  color="red"><CircleClose /></el-icon>
                </div>
                <div :class="showReG.otoReg ? 'trues' : ''">
                  {{
                    ` - a minimum of 1 special character: -!@#S%"&0)- +=."<>./?
              User List`
                  }}
                  <el-icon v-if="showReG.otoReg" color="#2ad739"
                    ><CircleCheck
                  /></el-icon>
                  <el-icon v-else-if="regFalse"  color="red"><CircleClose /></el-icon>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="status" label-width="100px">
              <el-radio-group v-model="form.status" :disabled="typeView==='View Log'">
                <el-radio border label="0">Disable</el-radio>
                <el-radio border label="1">Enable</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div class="tioti2">Authorizatior</div>
          <el-form
            :model="form"
            label-width="160px"
            :inline="true"
            label-position="right"
            class="demo-form-inline1"
          >
            <el-form-item
              v-for="item in form.menuPerms"
              :label="item.name"
              :key="item.menuId"
            >
              <el-radio-group v-model="item.type" :disabled="typeView==='View Log'">
                <el-radio label="0">No Access</el-radio>
                <el-radio
                  label="2"
                  :disabled="form.type==='2'"
                  >View Only</el-radio
                >
                <el-radio label="1" :disabled="item.disable !== '0'"
                  >View & Modif</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick(false)">cancel</el-button>
          <el-button type="primary" @click="confirmClick" v-if="typeView!=='View Log'">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style>
.trues {
  color: #797979;
  display: flex;
  align-items: center;
}
.trues .el-icon {
  margin-left: 4px;
}
.falses {
  display: flex;
  align-items: center;
}
.falses .el-icon {
  margin-left: 4px;
}
.truesTop {
  color: #797979;
  display: flex;
  align-items: center;
}
.truesTop .el-icon {
  margin-right: 4px;
}
.demo-form-inline .el-input {
  --el-input-width: 150px;
}
.dioTips {
  color: #c1c1c1;
  line-height: 17px;
  width: 430px;
}
.el-form--inline .el-form-item {
  margin-right: 28px;
}
.el-form--inline1 .el-form-item {
  margin-right: 28px;
  margin-bottom: 4px;
}
.tioti2 {
  margin-top: 10px;
  margin-bottom: 20px;
  border-left: 6px solid #2c78ee;
  line-height: 12px;
  padding-left: 4px;
  border-radius: 2px;
  font-weight: 800;
}
.tiotil {
  margin-top: -10px;
  margin-bottom: 20px;
  border-left: 6px solid #2c78ee;
  line-height: 12px;
  padding-left: 4px;
  border-radius: 2px;
  font-weight: 800;
}
</style>
