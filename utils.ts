// import CryptoJS from 'crypto-js'

/**
 * @desc 生成水印
 * @param {需要添加水印的元素} element
 * @param {生成水印的相关配置} config
 * @returns {没有返回值}
*/
const watermark = (element: Element, config: { [props: string]: any }) => {
  // 获取元素的坐标
  function getOffset(el) {
    if (el.offsetParent) {
      return {
        x: el.offsetLeft + getOffset(el.offsetParent).x,
        y: el.offsetTop + getOffset(el.offsetParent).y
      }
    }
    return {
      x: el.offsetLeft,
      y: el.offsetTop
    }
  }
  if (!element) {
    return false
  }
  // 默认配置
  const _config = Object.assign(
    {
      markText1: '水印文本1', // 文本1
      markText2: '', // 文本2
      start_x: 50, // x轴起始位置
      start_y: 50, // y轴起始位置
      space_x: 100, // x轴间距
      space_y: 100, // y轴间距
      width: 140, // 宽度
      height: 60, // 长度
      fontSize: 20, // 字体
      color: '#000', // 字色
      alpha: 0.5, // 透明度
      rotate: 15 // 倾斜度
    },
    config
  )
  // 节点的总宽度
  const total_width = element.scrollWidth
  // 节点的总高度
  const total_height = element.scrollHeight
  // 创建文本碎片，用于包含所有的插入节点
  const mark = document.createDocumentFragment()
  // 水印节点的起始坐标
  const position = getOffset(element)
  let x = position.x + _config.start_x
  let y = position.y + _config.start_y
  // 先循环y轴插入水印
  do {
    // 再循环x轴插入水印
    do {
      // 创建单个水印节点
      const item = document.createElement('div')
      item.className = 'watermark-item'
      // 设置节点的样式
      item.style.position = 'absolute'
      item.style.zIndex = '99999'
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${_config.width}px`
      item.style.height = `${_config.height}px`
      item.style.fontSize = `${_config.fontSize}px`
      item.style.color = _config.color
      item.style.textAlign = 'center'
      item.style.opacity = String(_config.alpha)
      item.style.filter = `alpha(opacity=${_config.alpha * 100})`
      item.style.transform = `rotate(-${_config.rotate}deg)`
      item.style.pointerEvents = 'none' // 让水印不遮挡页面的点击事件
      // 创建markText1水印节点
      const markText1 = document.createElement('div')
      markText1.appendChild(document.createTextNode(_config.markText1))
      item.append(markText1)
      // 创建markText2水印节点
      const markText2 = document.createElement('div')
      markText2.appendChild(document.createTextNode(_config.markText2))
      item.append(markText2)
      // 添加水印节点到文本碎片
      mark.append(item)
      // x坐标递增
      x = x + _config.width + _config.space_x
      // 超出文本右侧坐标停止插入
    } while (total_width + position.x > x + _config.width)
    // 重置x初始坐标
    x = position.x + _config.start_x
    // y坐标递增
    y = y + _config.height + _config.space_y
    // 超出文本底部坐标停止插入
  } while (total_height + position.y > y + _config.height)
  // 先删除文档碎片防止水印重复。
  const WatermarkItem = element.querySelectorAll('.watermark-item')

  ;[].slice.call(WatermarkItem).map(item => {
    item.parentNode.removeChild(item)
  })
  // 插入文档碎片
  element.append(mark)
}

/**
 * @desc 生成base64流
 * @param {生成base64的文件流} file
 * @param {函数执行成功以后的回调} callback
 * @returns {没有返回值}
 */
const toBase64 = (file: any, callback: (params?: any) => void) => {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    let result = this.result
    callback(result)
  }
}

/**
 * @desc 判断变量的类型
 * @param {需要检测的变量} val
 * @param {目标类型} typeStr
 * @returns {是否匹配}
 */

const checkType = (val: any, typeStr: string) => {
  const typeArr = [
    'Number',
    'String',
    'Boolean',
    'Array',
    'Object',
    'Function',
    'Undefined',
    'Null',
    'Date',
    'RegExp',
    'Error'
  ]
  if (typeArr.includes(typeStr)) {
    console.log(Object.prototype.toString.call(val).replace('[object ', '').replace(']', '') === typeStr)
    return Object.prototype.toString.call(val).replace('[object ', '').replace(']', '') === typeStr
  } else {
    throw Error(`请正确填写需要检测的类型，当前填写的类型是: ${typeStr}`,)
  }
}

/**
 * 浏览器里取参数
 * @param {需要获取的字段key} name
 * @returns {*}
 */
const getUrlParam = (name: string) => {
  // 用该属性获取页面 URL 地址从问号 (?) 开始的 URL（查询部分）
  var url = window.location.search
  // 正则筛选地址栏
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  // 匹配目标参数
  var result = url.substr(1).match(reg)
  // 返回参数值
  return result ? decodeURIComponent(result[2]) : null
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
const debounce = (func: (params?: any) => void, wait = 1000, immediate: boolean) => {
  let timeout

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type Timestamp 表时间戳版，Timer  表定时器版
*/
const throttle =(func: (params?: any) => void, wait = 1000, type = 'Timestamp') => {
  let previous = 0
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (type === 'Timestamp') {
      let now = Date.now()

      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 'Timer') {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type Timestamp 表时间戳版，Timer  表定时器版
*/
const goBackTop = () => {
  // 计算每次滚动的比例。
  const getScrollRatio = (value: number) => value < 0.5 ? 1 - Math.pow(value * 2, 3) / 2 : Math.pow((1 - value) * 2, 3) / 2

  const backTopFunc = () => {
    const beginTime = Date.now()
    const beginValue = document.documentElement.scrollTop
    const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16))
    const frameFunc = () => {
      // 通过调用时间和第一次触发时间的差值作为滚动的比例的参数
      const progress = (Date.now() - beginTime) / 500
      if (progress < 1) {
        document.documentElement.scrollTop = beginValue * getScrollRatio(progress)
        rAF(frameFunc)
      } else {
        document.documentElement.scrollTop = 0
      }
    }
    rAF(frameFunc)
  }
  backTopFunc()
}

// 加密
const encrypt = word => {
  let key = CryptoJS.enc.Utf8.parse('09476d7cfdb374bf90054805bef070d4')
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

// 解密
const decrypt = word => {
  let key = CryptoJS.enc.Utf8.parse('09476d7cfdb374bf90054805bef070d4')
  let decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

const url = 'https://hrassistantwx-hrsdc.ihr.tencent-cloud.com/hrweb/procotal?aa=bb&cc=dd&unionid=zldBa_BRqZF9ACUdNl9z-QFBzWcXinfVMS4p2Fw3mj4&url=https%3A%2F%2Fcertschool-hrsdc.ihr.tencent-cloud.com%2Fcs-learning-mob%2FcourseDetails%3Fcaagw_t%3D1642140223%26content_id%3D29'

const urlParse = (url: string) => {
  let obj = {}
  let reg = /[^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach(item => {
      console.log(item, '1111')
      let tempArr = item.split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

const getImgSize = () => {
  let url = 'https://txy.test.webank.com/tc-k/querydata/html/hjAdmAdminPic/tu1-183775801727.png';
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', url, true);
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        alert('Size in bytes: ' + xhr.getResponseHeader('Content-Length'));
      } else {
        alert('ERROR');
      }
    }
  }
  xhr.send(null)
}


export {
  // 生成水印
  watermark,
  // 文件转base64
  toBase64,
  // 判断变量的类型
  checkType,
  // 根据key获取浏览器中的参数值
  getUrlParam,
  // 函数防抖
  debounce,
  // 函数节流
  throttle,
  // 回到页面顶部
  goBackTop,
  // 加密
  encrypt,
  // 解密
  decrypt,
  // url 中的参数 转换成 对象。 ps：对象转url参数有一个api：new URLSearchParams(object).toString()
  urlParse,
  // 通过网络图片的url获取图片的真实大小
  getImgSize
}
