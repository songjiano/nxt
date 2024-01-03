import {barcodeLists} from "@/serves/barcode.js"
import { ElMessage } from 'element-plus'
import {transSt} from "./utils"

//获取用户列表
export const listAction = async(parmes,tableDate)=>{
    const {code,message,data} = await barcodeLists(parmes)
    if(code!==200)return ElMessage.error(message);
    const {list, total} =data 
    const listData=list.map(item=>{item.status=transSt(item.status);return item})
    tableDate.value= {list:listData, total:total*1}
}




