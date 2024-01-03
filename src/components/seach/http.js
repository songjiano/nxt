import {queryallNewByDriverOnOrgApp,queryNewVehicleNum,getNOTE2,getDriverByVehicleNo,getOrderVehicleNoDest} from "@/serves/coment"


import { showToast } from 'vant';


/**
 * 获取车型
 * @param vehicleNum 车牌号
 * @param onCancel 赋值到父组件
 * @returns {*}
 * @Author: song jian
  * @Date: 2023-08-10
  * @LastEditTime: 2023-08-10
 */
export const  getNOTE2Action=async(vehicleNum,onCancel,crentVlue,seachType)=>{
  const patmes= await getNOTE2(vehicleNum)
  const {status,message,body}=await getDriverByVehicleNo(vehicleNum)
  if(status!==200)return showToast(message);
  const empData= JSON.parse(body)
  onCancel({vehicleNum,orderVehicleModel:patmes.vehicleType})
  if(empData.driverCode){
    const value={empCode:empData.driverCode,empName:empData.driverName}
    onCancel(value)
  }
  
  const crentVlueMaps=crentVlue.map(item=>{
    if(item.vechNum===vehicleNum)return {...item,vehicleType:patmes.vehicleType}
    return item
  })
  localStorage.setItem(seachType.value,JSON.stringify(crentVlueMaps))
}

/**
 * 查询车牌和司机
 * @param list 车牌号和车司机列表
 * @returns {*}
 * @Author: song jian
  * @Date: 2023-08-10
  * @LastEditTime: 2023-08-10
 */
export const queryNew =async(value,list,seachType)=>{
  if(!seachType) return
  const curentUrl=seachType==='vechNum'?queryNewVehicleNum:queryallNewByDriverOnOrgApp
  const {status,message,body}= await curentUrl(value)
  if(status!==200)return showToast(message);
  list.value=body
}

//获取历史车牌号并带有车型
export const getOrderVehicleNoDestAction = async(pames,vecValue)=>{
  const {status,message,body}=await getOrderVehicleNoDest(pames)
  if(status!==200)return showToast(message);
  let DateVech=JSON.parse(body)||[]
  if(!DateVech[0])DateVech=[]
  vecValue.value=DateVech
}