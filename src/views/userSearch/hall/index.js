import {eventsLists,taddOrEdit,exDelete} from "@/serves/hall.js"
import { ElMessage } from 'element-plus'

//获取活动列表
export const eventsListsAction = async(pamres,list,dialogFormVisible)=>{
    const {code,message,data} = await eventsLists(pamres)
    if(code!==200)return ElMessage.error(message);
    list.value = data
    dialogFormVisible.value=false
}

export const taddOrEditAction = async(parmes,listaciot)=>{
    const {code,message} = await taddOrEdit(parmes)
    if(code!==200)return ElMessage.error(message);
    listaciot()
}
export const exDeleteAction = async(id,listActions)=>{
    const {code,message} = await exDelete({id})
    if(code!==200)return ElMessage.error(message);
    listActions()
}





