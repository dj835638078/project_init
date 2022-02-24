const u = navigator.userAgent
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
const isDev = process.env.NODE_ENV === 'development'

/**
 * 从 APP 获取公共接口参数
 * @returns {Object} 公共参数对象
 */
export function getGlobalParam () {
  console.log('getGlobalParam...')
  try {
    if (!isDev) {
      if (isiOS) {
        window.webkit.messageHandlers.getGlobalParam.postMessage({})
        return JSON.parse(window.prompt('getGlobalParamJs'))
      }
      if (isAndroid) {
        window.AndroidDiscoverMethods.disablePullRefresh()
        return JSON.parse(window.AndroidDiscoverMethods.getGlobalParam())
      }
    } else {
      return {
        // 开发模式下测试用假数据
        accountID: '',
        token: '',
        acceptLanguage: 'en'
      }
    }
  } catch (error) {
    console.log('getGlobalParam error')
  }
}

/**
 * 返回 APP 页面
 */
export function goBackApp () {
  try {
    if (isiOS) window.webkit.messageHandlers.goBack.postMessage({})
    else if (isAndroid) window.AndroidDiscoverMethods.goBack()
  } catch (error) {
    console.log('goBackApp error')
  }
}

/**
 * 调用 APP 的分享功能
 * 此函数写法由于Android和ios调用方式不同的历史原因导致有些奇怪，具体请参照wiki前端踩坑记录
 * @param {*} title
 * @param {*} url
 * @param {*} androidTitle
 */
export function shareUrl (title, url, androidTitle) {
  try {
    if (isiOS) {
      window.webkit.messageHandlers.shareTimeline.postMessage({
        title,
        url
      })
    } else if (isAndroid) {
      const newUrl = title + url // Android的url拼接了字符串和url
      window.AndroidDiscoverMethods.shareTimeline(androidTitle, newUrl)
    }
  } catch (e) {
    console.log('shareUrl error: %o', e)
    throw e
  }
}

/**
 * 获取手机状态栏高度 - 新
 * @returns {Number} App status bar height
 */
export function getStatusBarHeight () {
  try {
    if (isDev) {
      return new Promise((resolve, reject) => {
        resolve(30)
      })
    } else {
      if (isiOS) {
        return new Promise((resolve, reject) => {
          window.getStatusBarHeightJs = function (height) {
            resolve(height)
          }
          window.webkit.messageHandlers.getStatusBarHeight.postMessage('')
        })
      }
      if (isAndroid) {
        // 此处也使用 promise 是为了让使用此函数的地方可以对iOS和Android用一致的处理方法
        return new Promise((resolve, reject) => {
          const height = window.AndroidDiscoverMethods.getStatusBarHeight()
          resolve(height)
        })
      }
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}
/** */

/**
 * 跳转到新的h5页面
 * @param {*} url 加载H5链接
 * @param {*} title 标题
 * @param {*} isShowCloseBtn 是否显示关闭按钮
 * @param {*} isHideNavigationBar 是否显示标题栏
 * @param {*} isHandleBackPress 是否显示返回按钮
 */
export function jumpInterfaceWith (
  url,
  title,
  isShowCloseBtn = false,
  isHideNavigationBar = true,
  isHandleBackPress = false) {
  try {
    if (isiOS) {
      window.webkit.messageHandlers.jumpQuestionnaire.postMessage({
        url
      })
    }
    if (isAndroid) {
      window.AndroidDiscoverMethods.jumpInterfaceWith(
        url,
        title,
        isShowCloseBtn,
        isHideNavigationBar,
        isHandleBackPress
      )
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('jumpInterfaceWith func dev mode...')
    } else {
      console.log('jumpInterfaceWith func error...')
    }
  }
}

/**
 * 新增标准化方法公共函数
 * @param {Object} req  action, params: {}, callbackName
  }
 * @returns Promise
 */
function jsCallNative (req) {
  return new Promise((resolve, reject) => {
    window.commonCallback = function (name, item) {
      const res = { name, item }

      // 若请求的action不存在，执行错误回调
      if (name === 'invalidAction') reject(new Error(JSON.stringify(res)))

      // iOS返回string，Android返回object
      if (typeof item === 'string') item = JSON.parse(item)

      resolve(res)
    }
    try {
      if (isiOS) {
        window.webkit.messageHandlers.jsCallNative.postMessage(req)
      } else if (isAndroid) {
        window.AndroidDiscoverMethods.jsCallNative(JSON.stringify(req))
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 跳转 - 商城新增地址页面
 * @returns Promise Object 地址详细信息
 */
export function jumpPageBySchemeUrlAddShippingAdress () {
  const action = 'jumpPageBySchemeUrl'
  const schemeUrl = 'vesync://link/shippingAddressDetail'
  const callbackName = 'getSelectAddressInfo'
  const req = {
    action,
    params: {
      schemeUrl
    },
    callbackName
  }
  return jsCallNative(req)
}

/**
 * 跳转 - 商城选择地址列表页面
 * @returns Promise Object 地址详细信息
 */
export function jumpPageBySchemeUrlShippingAdressList () {
  const action = 'jumpPageBySchemeUrl'
  const schemeUrl = 'vesync://link/selectShippingAddress?addressId=999'
  const callbackName = 'getSelectAddressInfo'
  const req = {
    action,
    params: { schemeUrl },
    callbackName
  }
  return jsCallNative(req)
}

/**
 * 跳转 - 商城首页
 * @returns Promise
 */
export function jumpPageBySchemeUrlHomeStore () {
  const action = 'jumpPageBySchemeUrl'
  const schemeUrl = 'home/store'
  const req = {
    action,
    params: {
      schemeUrl
    }
  }
  return jsCallNative(req)
}

/**
 * 跳转 - 邀请家庭成员页面
 * @returns Promise
 */
export function jumpPageBySchemeUrlHomeShare () {
  const action = 'jumpPageBySchemeUrl'
  const schemeUrl = 'vesync://link/homeShare'
  const callbackName = null
  const req = {
    action,
    params: {
      schemeUrl
    },
    callbackName
  }
  return jsCallNative(req)
}

/**
 * 获取用户是否开启了通知权限
 * @returns Promise 开启为1，未开启为0
 */
export function getCurrentNotificationStatus () {
  const req = {
    action: 'getCurrentNotificationStatus',
    params: {},
    callbackName: 'getCurrentNotificationStatus'
  }
  return jsCallNative(req)
}

/**
 * 跳转到开启通知权限的设置页面
 * @returns Promise
 */
export function openSetting () {
  const req = {
    action: 'openSetting',
    params: {},
    callbackName: null
  }
  return jsCallNative(req)
}

/**
 * 跳转到 my coupons 页面
 */
export function goToMyCoupons () {
  if (isiOS) {
    window.webkit.messageHandlers.goToMyCoupons.postMessage({})
  }
  if (isAndroid) {
    window.AndroidDiscoverMethods.goToMyCoupons()
  }
}
