import {rlogin} from "@/serves/login"
import { ElMessage } from 'element-plus'

//登录
export const rloginAction = async(parmes,router)=>{
    router.push({ path: "/detailList" });
    const {status,message,body} = await rlogin(parmes)
    if(status!==200)return ElMessage.error(message);
    router.push({ path: "/detailList" });
}
