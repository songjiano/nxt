import { defineStore } from 'pinia'

//第一个参数是id,传入一个字符串，第二个参数是是对象
const useuserInforStore=defineStore("userInfor",{
state:()=>({
  userInfor:{}
}),
getters:{
 doubaleuserInfor(state){
     return state.userInfor
 }
},
actions:{
    changeCounteAction(newuserInfor:object){
       this.userInfor=newuserInfor
    }
}
}) 
//3.导出
export default useuserInforStore
