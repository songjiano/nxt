import { defineStore } from 'pinia'

//第一个参数是id,传入一个字符串，第二个参数是是对象
const useuseDeviceInforStore=defineStore("useDeviceInfor",{
state:()=>({
  useDeviceInfor:{}
}),
getters:{
 doubaleuseDeviceInfor(state){
     return state.useDeviceInfor
 }
},
actions:{
    changeCounteAction(newuseDeviceInfor:object){
       this.useDeviceInfor=newuseDeviceInfor
    }
}
}) 
//3.导出
export default useuseDeviceInforStore
