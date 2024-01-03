<script setup>
import { toRefs,shallowRef,defineExpose } from 'vue';

import{queryNew,getNOTE2Action,getOrderVehicleNoDestAction} from './http'
import {transpingp,sortByClicknum} from './help'

const sProps=defineProps(["show"])
const cancel=defineEmits(["cancels"])

const show=toRefs(sProps).show

const seachType=shallowRef('')
const value = shallowRef("");
const vecValue = shallowRef([])
const vehicleList = shallowRef([])

//获取司机或者车牌列表
const onSearch = (val) => queryNew(val,vehicleList,seachType.value)

const onCancel = (cancels) => cancel('cancels',cancels)

//选择车牌号或司机操作
const chose =(crentVlue)=>{
  let vec = localStorage.getItem(seachType.value) //获取车牌号和司机缓存的数据
  let isVech=seachType.value==='vechNum' //判断是不是车牌还是司机
  let clicknum=1 //默认车牌号点击次数为1
  let newCurentVec=[]  //设置最新的车牌号默认为空数组

  //判断车牌号和人员的缓存有无数据
  if(vec&&crentVlue){ 
    //格式化缓存数据
    let vecPase=JSON.parse(vec).filter(item=>item)

    //获取当前的选择的人或车点击不重复的
    let curentVec= vecPase.filter(item=>{
      //如果有相同的车牌号点击次数加1
      if(item.vechNum===crentVlue)clicknum=item.clicknum+1 
      let isCurentVec =isVech?item.vechNum!==crentVlue&&item:item.empCode!==crentVlue.empCode&&item
      return isCurentVec
    })
    //
    isVech?curentVec.unshift({vechNum:crentVlue,clicknum,clickTime:new Date().getTime()}):curentVec.unshift(crentVlue)
    
    //车牌号按照点击次数排序
    isVech?newCurentVec=sortByClicknum(curentVec):newCurentVec=curentVec

    //设置如果缓存大于10条数据，则删除排名最后一条数据
    if(newCurentVec.length>10)delete newCurentVec[newCurentVec.length-1]

  }else{
    //赋值最新的数据
    if(crentVlue)newCurentVec=isVech?[{vechNum:crentVlue,clicknum,clickTime:new Date().getTime()}]: [crentVlue]
  }

  if(crentVlue&&isVech){
    getNOTE2Action(crentVlue,onCancel,newCurentVec,seachType)
  }else if(crentVlue){
    onCancel(crentVlue)
    localStorage.setItem(seachType.value,JSON.stringify(newCurentVec))
  }
}

const remItem= ()=>{
  localStorage.removeItem(seachType.value)
  chose()
}

const hidenValue=(hidenValue,item)=>{
  
  value.value=''
  seachType.value=hidenValue
  let vec = localStorage.getItem(hidenValue)

  let isVech=seachType.value==='vechNum' //判断是不是车牌还是司机
  if(item&&isVech){
    const {useVehicleOrgCode,customerCode} =item
    return getOrderVehicleNoDestAction({useVehicleOrgCode,customerCode},vecValue)
  }
  let vecPase=JSON.parse(vec)
  if(!isVech) vecValue.value=vec?vecPase:[]
}

defineExpose({hidenValue})


</script>

<template>
<div class="s-box" v-if="show">
  <div class="s-box-value">
    <van-search
      v-model="value"
      show-action
      :label="transpingp(seachType)"
      placeholder="请输入搜索关键词"
      @update:model-value="onSearch"
      @cancel="onCancel"
    />
  </div>
  <div v-if="value">
    <div class="searchs-value">
      <div v-for="item in vehicleList" @click="chose(item)">
        <van-icon name="search" />
        <span v-if="seachType==='vechNum'">{{item}}</span>
        <span v-else>司机：{{(item.empName||'-')+' / '+(item.empCode||'-')}}<br>部门：{{(item.deptName||'-')}}</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="history-tip">
      历史{{ transpingp(seachType) }}<van-icon v-if="seachType!=='vechNum'" @click="remItem()" class="s-delete-o" name="delete-o" />
    </div>
    <div class="check-car-type" v-if="vecValue.length>0">
      <div v-if="seachType==='vechNum'">
        <div class="typeVe">
          <div>车牌</div>
          <div>车型</div>
          <div>操作</div>
        </div>
        <div v-for="(item,index) in vecValue" :key="item" >
          <div class="vepCat">
            <div>{{item.vechNum}}</div><div>{{item.vehicleType||"-"}}</div><div><div class="payforCar" @click="chose(item.vechNum)">分配</div> </div>
          </div>
        </div>
      </div>
      <div v-else @click="chose(item)">
        <div class="typeVe">
          <div>司机</div>
          <div>部门</div>
          <div>操作</div>
        </div>
        <div v-for="(item,index) in vecValue" :key="item" >
          <div class="vepCat">
            <div>{{item.empName}}/{{ item.empCode }}</div><div>{{item.deptName}}</div><div><div class="payforCar" @click="chose(item)">分配</div> </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <van-empty description="暂无历史记录！" />
    </div>
  </div>
</div>
</template>
 
<style lang="less" scoped>
.searchs-value{
  font-size: 16px;
   margin: 4px 35px;
   &>div{
    margin-bottom: 20px;
    display: flex;
   }
   span{
    margin-left: 6px;
    line-height: 24px;
    margin-top: -4px;
   }
}
.check-car-type{
  padding: 10px 4px;
  .payforCar{
    padding: 6px 10px;
    border: 1px solid #c1c1c1;
    border-radius: 30px;
    width: 60px;
    margin: auto;
  }
  .vepCat{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 14px;
    &>div{
      width: 33%;
      text-align: center;
      overflow: hidden;
    }
  }
  &>div{
    font-size: 14px;
    margin: 8px;
    border: 1px solid #dfdfdf;
    padding-bottom: 10px;
    .typeVe{
      background-color: #dfdfdf;
      padding: 10px 14px;
      margin-bottom: 0px;
      &>div{
        font-weight: 700;
      }
    }
    &>div{
      display: flex;
      justify-content: space-around;
      span{
        margin-right: 20px; 
      }
    }
  }
}
.history-tip{
  background-color: #ededed;
  display: flex;
  justify-content: space-between;
  padding: 14px 20px;
  align-items: center;
  font-size: 14px;
  .s-delete-o{
    font-size: 18px;
  }
}
.s-box{
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: absolute;
  top: 0px;
  z-index: 2500;
  &>div:last-child{
    height: 80vh;
    overflow-y: scroll;
  }
}
.s-box-value{
  padding: 20px;
}
</style>