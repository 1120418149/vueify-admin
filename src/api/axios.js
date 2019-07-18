import axios from 'axios'
import store from './store'
import router from '@/router'
import api from './environment'

const PORT1 = '/baseinfo'
const PORT2 = '/order'
const PORT3 = '/bill'

// 创建axios实例
const service = axios.create({
  baseURL: api.envApi
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 可以不通过access_token校验的接口
    const whitePath = [
      `${PORT1}/company/add`,
      '/auth/mobile/token/social',
      `${PORT1}/WeChatEventPush/getQRCodeTemp`,
      `${PORT1}/mobile/signUp`,
      `${PORT1}/mobile/changePassword`,
      `${PORT1}/user/updatePassword`
    ]

    // 文件下载接口列表
    const outputFilePath = [
      `${PORT2}/express_addresses/export`,
      `${PORT3}/price/exportExcelTemplate`,
      `${PORT3}/bill/exportExcelTemplate`,
      `${PORT3}/account/exportAccount`,
      `${PORT3}/bill/exportBill`,
      `${PORT3}/hostingAccount/importAccount`,
      `${PORT3}/hostingAccount/exportExcelTemplate`,
      `${PORT3}/hostingAccount/exportHostingAccount`,
      `${PORT2}/orders/export`,
      `${PORT2}/hosting_orders/export`,
      `${PORT1}/company/exportInTrustOverview`,
      `${PORT3}/hostingBill/exportBill`,
      `${PORT1}/user/exportExcelTemplate`,
      `${PORT1}/user/importUsers`,
      `${PORT2}/hosting_orders/export`,
      `${PORT2}/express_addresses/import`,
      `${PORT2}/orders/import`,
      `${PORT1}/platform/exportOverview/1`,
      `${PORT1}/platform/exportOverview/2`
    ]
    // 验证码登录
    const oauthLoginPath = 'auth/oauth/token'
    if (whitePath.indexOf(config.url) > -1) {
      config.headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
    } else if (config.url.indexOf(oauthLoginPath) > -1) {
      config.headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
    } else {
      config.headers[
        'Authorization'
      ] = `Bearer ${store.getters.authorization.access_token}`
      config.headers['TENANT-ID'] = store.getters.authorization.tenant_id
    }
    if (
      outputFilePath.indexOf(config.url) > -1 ||
      config.url.indexOf('/baseinfo/user/importUsers') > -1 ||
      config.url.indexOf('/zjs/orders/import') > -1
    ) {
      config.responseType = 'blob'
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    return Promise.reject(response)
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * 封装get请求
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param body
 * @returns {Promise}
 */
export function post(url, body) {
  return new Promise((resolve, reject) => {
    service
      .post(url, body)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param body
 * @returns {Promise}
 */
export function patch(url, body) {
  return new Promise((resolve, reject) => {
    service
      .patch(url, body)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装delete方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function Delete(url, params) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param body
 * @returns {Promise}
 */

export function put(url, params) {
  return new Promise((resolve, reject) => {
    service
      .put(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
