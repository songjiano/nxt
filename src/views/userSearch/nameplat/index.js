import {nameplateLists,barcodeLists,barcodeAdd,barcodeDelete,bareDelete,barcodeUpdate,addOrEdit,upload,bmultiplierLists,maddOrEdit,meDelete,detailByBarcode} from "@/serves/nameplat.js"
import { ElMessage } from 'element-plus'
import {transSt,getImage} from "./utils"


//获取用户列表
export const listAction = async(parmes,tableDate,op)=>{
    const {code,message,data} = await nameplateLists(parmes)
    if(code!==200)return ElMessage.error(message);
    const {list, total} =data 
    if(op){
        const listAdat=list.map(item=>{
            const objItme = {value:item.id,label:item.name}
            return objItme
        })
       return tableDate.value=listAdat
    }
    const listData=list.map(item=>{item.status=transSt(item.status);return item})
    tableDate.value= {list:listData, total:total*1}
}

//获取倍率列表
export const bmultiplierListsAction = async(pamres,list,dialogFormVisible)=>{
    const {code,message,data} = await bmultiplierLists(pamres)
    if(code!==200)return ElMessage.error(message);
    list.value = data
    dialogFormVisible.value=false
}

export const maddOrEditAction = async(parmes,listaciot)=>{
    const {code,message} = await maddOrEdit(parmes)
    if(code!==200)return ElMessage.error(message);
    listaciot()
}
export const meDeleteAction = async(id,listActions)=>{
    const {code,message} = await meDelete({id})
    if(code!==200)return ElMessage.error(message);
    listActions()
}

export const barcodeListsAction = async(parmes,tableDate)=>{
    const {code,message,data} = await barcodeLists(parmes)
    if(code!==200)return ElMessage.error(message);
    const {list, total} =data 
    tableDate.value= {list, total:total*1}
}

export const uploadAction = async(parmes,imageUplouding,url,form)=>{
    const {code,message,data} = await upload(parmes)
    imageUplouding.value = false
    if(code!==200)return ElMessage.error(message);
    ElMessage.success(message)
    url.url = getImage(data)
    form.value.imageUrl= data
}

export const barcodeAddAction = async(parmes,listActions,dialogFormVisible)=>{
    const {code,message} = await barcodeAdd(parmes)
    if(code!==200)return ElMessage.error(message);
    ElMessage.success("上传成功!")
    listActions()
    dialogFormVisible.value=false
}

export const addOrEditAction = async(parmes,listActions,dialogFormVisible)=>{
    const {code,message} = await addOrEdit(parmes)
    if(code!==200)return ElMessage.error(message);
    ElMessage.success("新增成功!")
    listActions()
    dialogFormVisible.value=false
}


export const barcodeUpdateAction = async(parmes,listActions,dialogFormVisible)=>{
    const {code,message} = await barcodeUpdate(parmes)
    if(code!==200)return ElMessage.error(message);
    listActions()
    dialogFormVisible.value=false
}

export const barcodeDeleteAction = async(parmes,listActions)=>{
    const {code,message} = await barcodeDelete(parmes)
    if(code!==200)return ElMessage.error(message);
    listActions()
}
export const bareDeleteAction = async(parmes,listActions)=>{
    const {code,message} = await bareDelete(parmes)
    if(code!==200)return ElMessage.error(message);
    listActions()
}

export const detailByBarcodeAction = async(parmes,urlDetai)=>{
    const {code,message,data} = await detailByBarcode(parmes)
    if(code!==200)return ElMessage.error(message);
    urlDetai.value=data
}





