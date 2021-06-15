import axios from 'axios' //引入下载的axios


const instance = axios.create({
    baseURL:'http://jsonplaceholder.typicode.com',
    timeout:5000 //几秒
})//创建实例

instance.interceptors.request.use( //拦截器
    config=>{
        //config.headers.token ="12346"
        //要进行的操作
      console.log("--------- 查看是否拦截到 config--------------")
        return config   //放行
    },
    error=>{   
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(    //请求拦截器
    response=>{
        console.log("--------- 查看是否拦截到 response--------------")
        return response;
    },
     error=>{
        return Promise.reject(error)
    }
)



export function get(url,params){ //导出一个方法自定义名称get
    return instance .get(url,{   //返回 axios的get方法
        params
    })
}  

export function post(url,params){
    return instance .post(url,params,{
         transformRequest:[   //转化要传入的为字符串
            function(data){
                let str = '';
                for(let key in data){
                    str +=encodeURIComponent(key)+
                    '='
                    + encodeURIComponent(data[key])+'&'
                }
                console.log(str)
                return str
            }
        ],
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}


export function del(url){  //删除
    return instance.delete(url)
}