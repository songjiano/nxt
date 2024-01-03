import {lotteryLists,lotteryPrizeLists,addOrEdit,lotAddOrEdit,logExport,viewLog,statusEdit,loDelete,losDelete} from "@/serves/prizeDraw.js"
import { ElMessage } from 'element-plus'
import { upload} from "@/serves/nameplat.js"
import {getImage} from "./utils"
import {saveAs} from "@/utils/index.js"

//获取奖品列表
export const lotteryPrizeListsAction = async(pamres,list,id)=>{
    const {code,message,data} = await lotteryPrizeLists(pamres,id)
    if(code!==200)return ElMessage.error(message);
    list.value = data
}

//获取抽奖奖项
export const lotteryListsAction = async(pamres,list,lotteryList,editableTabsValue)=>{
    const {code,message,data} = await lotteryLists()
    if(code!==200)return ElMessage.error(message);
    const curentItem=data.filter(item=>item.id===editableTabsValue.value)
    const ids=curentItem.length>0?curentItem[0].id:data[0].id
    editableTabsValue.value=ids
    lotteryPrizeListsAction(pamres,list,ids)
    lotteryList.value = data
}

//导出日志列表
export const logExportAction = async(id)=>{
    const parmesd= await logExport(id)
    saveAs(parmesd,'prizeDrawLog.xlsx','')
}

//获取日志列表
export const viewLogAction = async(pamres,list,id)=>{
    const {code,message,data} = await viewLog(pamres,id)
    if(code!==200)return ElMessage.error(message);
    list.value.list = data.list
    list.value.total = data.total
}
//新增奖品
export const taddOrEditAction = async(parmes,listaciot,dialogFormVisible)=>{
    const urlLot=parmes.item?lotAddOrEdit:addOrEdit
    parmes.item=undefined
    const {code,message} = await urlLot(parmes)
    if(code!==200)return ElMessage.error(message);
    listaciot()
    dialogFormVisible.value=false
}
export const statusEditAction = async(parmes,lotteryListsActions)=>{
    const {code,message,data} = await statusEdit(parmes)
    if(code!==200)return ElMessage.error(message);
    lotteryListsActions()
}
//上传图片
export const uploadAction = async(parmes,imageUplouding,url,form)=>{
    const {code,message,data} = await upload(parmes)
    imageUplouding.value = false
    if(code!==200)return ElMessage.error(message);
    ElMessage.success(message)
    url.url = getImage(data)
    form.value.imageUrl= data
}
export const loDeleteAction = async(id,listActions,dialogFormVisible)=>{
    const {code,message} = await loDelete({id})
    if(code!==200)return ElMessage.error(message);
    listActions()
    dialogFormVisible.value=false
}

export const losDeleteAction = async(id,listActions,dialogFormVisible)=>{
    const {code,message} = await losDelete({id})
    if(code!==200)return ElMessage.error(message);
    listActions()
    dialogFormVisible.value=false
}





