<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus"
import { useRouter } from "vue-router";

import {rloginAction} from "./action"

const formRef = ref<FormInstance>()  //form 实例
const router = useRouter();

//登录时检验空字符
const rules = ref({
  password: [
    { required: true, message: "Please input Activity password！", trigger: "blur" },
  ],
  account: [
    { required: true, message: "Please input Activity account!", trigger: "blur" },
  ],
});

//输入登录绑定的只
const ruleForm = reactive({
  password: "",
  account: "",
});

//点击提交触发
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      rloginAction(ruleForm,router)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

</script>

<template>
  <div class="ntx-login">
    <div class="login-all">
      <div class="login-all-1">
        <div class="login-left">
          <div>
            <img
              src="@/assets/img/login-box-bg.svg"
              width="260"
              alt=""
              srcset=""
            />
            <div>NXT 后台管理系统</div>
          </div>
        </div>
        <div class="login-right">
          <div>
            <el-form
              ref="formRef"
              status-icon
   
              label-width="70px"
              :model="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item label="Account" prop="account">
                <el-input v-model.number="ruleForm.account" placeholder="Please enter your name！"/>
              </el-form-item>
              <el-form-item label="password" prop="password">
                <el-input
                  v-model="ruleForm.password"
                  type="password"
                  show-password
                  autocomplete="off"
                  placeholder="Please enter your password！"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">Login</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.logintitle{
  margin-bottom: 20px;
}
.demo-ruleForm{
  width: 280px;
}
.login-right {
  display: flex;
  width: 50%;
  align-items: center;
  height: 100%;
  justify-content: center;
}
.login-left {
  display: flex;
  width: 50%;
  align-items: center;
  height: 100%;
  justify-content: center;

  div {
    margin-top: 20px;
    line-height: 30px;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
  }
}
.ntx-login::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: -50%;
  background-image: url(@/assets/img/login-bg.svg);
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: auto 100%;
}
.ntx-login {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.login-all {
  padding-left: 4%;
  padding-right: 4%;
  height: 100%;
}
.login-all-1 {
  display: flex;
  height: 100%;
}
</style>
