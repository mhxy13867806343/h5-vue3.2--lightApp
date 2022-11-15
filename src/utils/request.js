import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'
const service = axios.create({
  baseURL: 'http://localhost:8010/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})
service.defaults.headers.post['Content-Type'] = 'multipart/form-data'
service.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded'
// request拦截器 request interceptor

service.interceptors.request.use(
  config => {
    // // 不传递默认开启loading
    config.headers['Authorization'] = 'Bearer ' +localStorage.getItem('token');
    return config
  },
  error => {
    Toast.clear()
    // do something with request error
      return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const {status,data,msg} = response
    if(status === 200){

        const {code,msg} = data
        if(code!==200){
            Toast.fail(msg)
            return Promise.resolve(data)
        }
        Toast.fail(msg)
          return Promise.resolve(data)
    }
  },
  error => {
    const data = error.response.data
    if(data.code===401){
      router.push('/login')
      localStorage.clear()
    }
    return Promise.reject(error.response)
  }
)

export default service
