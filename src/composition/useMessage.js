import { ElMessage } from 'element-plus'
const useMessage = {
        // 成功提示
        success:(message)=>{return ElMessage.success({
        message,
        
        })},
        // 警告提示
        warning:(message)=>{return ElMessage.warning({
            message,
            
        })},
        // 普通提示
        reminder:(message)=>{return ElMessage({
            message,
            
        })},
        // 错误提示
        error:(message)=>{return ElMessage.error({
            message,
            
        })},

    
}
export default useMessage

