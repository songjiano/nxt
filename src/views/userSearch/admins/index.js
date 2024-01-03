import {lists,addOrEdit,detail} from "@/serves/admin.js"
import { ElMessage } from 'element-plus'

//获取管理员列表
export const listAction = async(parmes,tableDate)=>{
    const {code,message,data} = await lists(parmes)
    if(code!==200)return ElMessage.error(message);
    const {list, total} =data
    tableDate.value= {list, total:total*1}
}

//添加/修改系统用户
export const addOrEditAction = async(parmes,dialogFormVisible,doSth)=>{
    const {code,message} = await addOrEdit(parmes)
    if(code!==200)return ElMessage.error(message);
    dialogFormVisible.value= false
    doSth()
}

//获取管理员详情
export const detailAction = async(parmes,refDialog,type,Authtypes)=>{
    const {code,message,data} = await detail(parmes)
    if(code!==200)return ElMessage.error(message);
    refDialog.value.formDataReset({...data,typeView:type,Authtypes})
}
