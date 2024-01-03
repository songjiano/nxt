import {rlogin} from "@/serves/login"
import { ElMessage } from 'element-plus'
import md5 from 'js-md5';

//登录请求后台处理 token
export const rloginAction = async(parmes,router)=>{
    const password=md5(parmes.password).toUpperCase()
    // localStorage.setItem("nxtToken","testtest")
    // router.push({ path: "/userDetail" });

    parmes = {...parmes,password}
    const {code,message,data} = await rlogin(parmes)
    if(code!==200)return ElMessage.error(message);
    ElMessage.success(message)
    localStorage.setItem("nxtToken",JSON.stringify(data))
    router.push({ path: "/index" });
}
