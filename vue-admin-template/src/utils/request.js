import axios from 'axios'
import store from '@/store'
import {Message} from 'element-ui'
const service = axios.create({

  //配置了基地址以后 请求会自动拼接上前缀:qpi
  baseURL: '/api',

  //超时时间
  timeout: 10000,
})

service.interceptors.request.use((config) => {
  // 请求拦截器的一大重要功能：如果有token 的话就带上token 注入token
  //  this.$store.getters
  // store.getters.token => 请求头里面
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((response) => {
  //解构赋值
  const { data, message, success } = response.data // 默认json格式
  if (success) {
    // debugger
    return data
  } else {
    // debugger
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
},  (error) => {
  // debugger
  // this.$message.warning 这种方式是element-ui提供的 相当于js中的alert 不过这里不能用this 因为这里的this就是指axios实例，它是没有$message.warning的
  //所以用下面这种方法
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})


export default service