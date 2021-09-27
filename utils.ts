

/**
 * @desc 生成水印
 * @param {需要添加水印的元素} element
 * @param {生成水印的相关配置} config
 * @returns {没有返回值}
*/
const watermark = (element, config) => {
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
      item.style.opacity = _config.alpha
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
  // 插入文档碎片
  element.append(mark)
}

/**
 * @desc 生成base64流
 * @param {生成base64的文件流} file
 * @param {函数执行成功以后的回调} callback
 * @returns {没有返回值}
 */
const toBase64 = (file, callback) => {
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

const checkType = (val, typeStr) => {
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

export {
  // 生成水印
  watermark,
  // 文件转base64
  toBase64,
  // 判断变量的类型
  checkType,
  // 根据key获取浏览器中的参数值
  getUrlParam
}