<script setup>
import useuseDeviceInforStore  from "@/stores/deviceInfor";
import {ref,onMounted,shallowRef} from 'vue'

const marginTop=ref("0")

const props = defineProps(["title","bac","openSeachShow","showList","bacNone"])
const backAction=defineEmits(["backAction"])

const onClickLeft = () =>{
  if(props.openSeachShow||(props.showList))return backAction('backAction')
  if(props.bac)return window.history.go(-1)
}
const store = useuseDeviceInforStore()
marginTop.value=store.$state.useDeviceInfor.statusBarHeight||0
onMounted(()=>document.getElementById("initPage").style.display = "none")

</script>

<template>
  <div :class="(!props.bacNone)&&'nav-sty'" :style="'padding-top:'+marginTop+'px'">
    <van-nav-bar 
      :title="props.title" 
      :left-arrow="!props.openSeachShow"
      z-index="200"
      :safe-area-inset-top="marginTop?false:true"
      @click-left="onClickLeft"
      :left-text="props.openSeachShow?'取消':''"
    >
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<style lang="less" scoped>
.nav-sty{
  background-color: #fff;
}
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 88px;
  font-size: 36px;
  color: #333333;
  //使用padding-top的设置适配刘海屏
  padding-top: constant(safe-area-inset-top); 
  padding-top: env(safe-area-inset-top);
}
:deep(.van-icon){
  font-size: 20px;
}

</style>