<script setup>
import {  RouterView,useRouter,useRoute } from 'vue-router'
import {onMounted, ref} from 'vue'
import Layout from '@/views/layout/index.vue'
import { ArrowRight } from '@element-plus/icons-vue'

const isLogin =  ref(false)
const router = useRouter()
const namerouter=ref("")

router.beforeEach(async (to, from) => {

  const getTokens=!!localStorage.getItem("nxtToken")
  const goLogin = to.name==="login"
  namerouter.value=to.name
  if(goLogin) {
    isLogin.value=false;
  }else{
    if(getTokens)isLogin.value=true
    if(!getTokens)router.replace({ path: "/login" })
  }
})


onMounted(()=>document.getElementById("initPage").style.display = "none")
</script>
<template>
  <div class="boxId" v-if="isLogin">
    <Layout>
      <div class="breadcrumbs">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item>Home</el-breadcrumb-item>
          <el-breadcrumb-item>{{ namerouter }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <RouterView />
    </Layout>
  </div>
  <div class="boxId" v-else>
    <div>
      <RouterView />
    </div>
  </div>
</template>
<style>
.el-upload-list--picture-card {
  width: 156px;
  height: 156px;
  overflow: hidden;
}
.headerBr{
  background-color: #f5f7fa !important;
  color: #252525;
  font-weight: 700 !important;
}
.el-dialog__header{
  background-color: #409eff !important;
  margin: 0px !important;
  padding: 14px !important;
}
.el-dialog__title{
  color: #fff !important;
  
}
.el-dialog__headerbtn .el-dialog__close{
  color: #fff !important;
}
.el-dialog__headerbtn{
  top: 0px !important;
}
</style>
<style scoped>
.breadcrumbs{
  margin: 16px 6px;
}
.boxId {
  height: 100vh;
  overflow: hidden;
}
</style>
