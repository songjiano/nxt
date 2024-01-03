import {exchangeLists,eaddOrEdit,exDelete,uploadGifts} from "@/serves/guild.js"
import { ElMessage } from 'element-plus'
import {transSt,getImage} from "./utils"




//获取兑换列表
export const exchangeListsAction = async(pamres,list,dialogFormVisible)=>{
    const {code,message,data} = await exchangeLists(pamres)
    if(code!==200)return ElMessage.error(message);
    list.value = data
    dialogFormVisible.value=false
}

export const eaddOrEditAction = async(parmes,listaciot)=>{
    const {code,message} = await eaddOrEdit(parmes)
    if(code!==200)return ElMessage.error(message);
    listaciot()
}
export const exDeleteAction = async(id,listActions)=>{
    const {code,message} = await exDelete({id})
    if(code!==200)return ElMessage.error(message);
    listActions()
}

export const uploadGiftsAction = async(pames,listActions,fileList1)=>{
    const {code,message} = await uploadGifts(pames)
    if(code!==200)return ElMessage.error(message);
    listActions()
    fileList1.value=[]
}





