import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example status here:
    // status == 2xx: success
    // status == 401: invalid access token
    // status == 403: already login in other place
    // You can change this part for your own usage.
    const status = response.status
    const res = response.data
    if (status === 200 || status === 201 || status === 202 || status === 204) {
        if (status === 204) {
            return null
        }
        return response.data
    } else {
        Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
        })
        if (status === 401 || status === 403) {
            MessageBox.confirm(
                'You have been logged out, try to login again.',
                'Log out',
                {
                    confirmButtonText: 'Relogin',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }
            ).then(() => {
                UserModule.ResetToken()
                location.reload() // To prevent bugs from vue-router
            })
        }
        return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
