import {lists,userListExport,detail,update,currencyLogList} from "@/serves/userList.js"
import { ElMessage } from 'element-plus'
import {transSt} from "./utils"
import {saveAs} from "@/utils/index.js"

//获取用户列表
export const listAction = async(parmes,tableDate)=>{
    const {code,message,data} = await lists(parmes)
    if(code!==200)return ElMessage.error(message);
    const {list, total} =data 
    const listData=list.map(item=>{item.status=transSt(item.status);return item})
    tableDate.value= {list:listData, total:total*1}
}

//用户导出
export const userListExportAction = async (parmes) =>{
    const parmesd = await userListExport(parmes)
    saveAs(parmesd,'userList.xlsx','')
}

//用户修改
export const updateAction = async (parmes,onSubmit,dialogFormVisible) =>{
    const {code,message,data} = await update(parmes)
    if(code!==200)return ElMessage.error(message);
    onSubmit();dialogFormVisible.value=false
}

//用户详情
export const detailAction=async(parmes,paramsDataOb,id)=>{
    const {code,message,data} = await detail(parmes)
    if(code!==200)return ElMessage.error(message);
    if(!data){paramsDataOb.value={}; return ElMessage.warning("暂无数据")};
    const {uid,nickname,mail,createTime,lastLoginTime,accountLevel,accountExp,resident,credit,pendingCredit,merch,activeNameplateName,activeBorderName,nameplateCount,borderCount,crossoverMerchNames,crossoverMerchCount} = data
    id.value = data.id
    const paramsData={
        UID:{value:uid,label:"UID",key:"uid"},
        Nickname:{value:nickname,label:"Nickname",key:"nickname"},
        Email:{value:mail,label:"E-mail",key:"mail"},
        DateRegistered:{value:createTime,label:"Date Registered",key:"createTime"},
        LastLogin:{value:lastLoginTime,label:"Last Login",key:"lastLoginTime"},
        AccountLevel:{value:accountLevel,label:"Account Level",key:"accountLevel"},
        AccountEXP:{value:accountExp,label:"Account EXP",key:"accountExp"},
        PremiumResident:{value:resident,label:"Premium Resident",key:"resident"},
    
        Credit:{value:credit,label:"Credit",key:"credit"},
        PendingCredit:{value:pendingCredit,label:"Pending Credit",key:"pendingCredit"},
        
        ActiveNameplate:{value:activeNameplateName,label:"Active Nameplate"},
        ActiveNameplateBorder:{value:activeBorderName,label:"Active Nameplate Border"},
        NameplateCount:{value:nameplateCount,label:"Nameplate Count"},
        NameplateBoarderCount:{value:borderCount,label:"Nameplate Boarder Count"},
        MerchCount:{value:merch,label:"Merch Count",key:"merch"},
        CrossoverMerchCount:{value:crossoverMerchCount,label:"Crossover Merch Count"},
        CollectionDisplay:{value:crossoverMerchNames,label:"Collection Display"},
    }
    paramsDataOb.value=paramsData
}

export const currencyLogListAction = async(parmes,logList) =>{
    const {code,message,data} = await currencyLogList(parmes)
    if(code!==200)return ElMessage.error(message);
    const {total,list} = data
    logList.value = {total,list}
}

