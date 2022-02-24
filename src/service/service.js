import axios from 'axios'

// create an axios instance
const service = axios.create({
  // baseURL: "",
  // timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// request interceptor
service.interceptors.request.use(
  config => {
    // ...
    return config
  },
  error => {
    // ...
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.code !== 0) {
    //   ...
    //   if (res.code === -12803051) {
    //     ...
    //   }
    //   return Promise.reject((res.message || res))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    // ...
    return Promise.reject(error)
  }
)

export default service
