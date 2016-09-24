// 此部分代码将会注入到贴吧页面中
import Cleaner from './cleaner'

var blockList = [] // 屏蔽列表
var html = document.documentElement.innerHTML // 用于检查是否需要刷新

const cleaner = new Cleaner()

// 读取clean配置
chrome.storage.sync.get('adOptions', function (data) {
  if (data.adOptions != undefined) {
    // 执行初次clean配置
    cleaner.clean(data.adOptions)
  }
})

// 读取block列表
chrome.storage.sync.get('list', function (items) {
  for (let item of items.list) {
    blockList.push(item)
  }
  // 执行初次block配置
  clean()
})

// 监听clean列表的变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let key in changes) {
    switch (key) {
      case 'adOptions':
        cleaner.clean(changes[key].newValue)
        break
      case 'list':
        blockList = changes[key].newValue
        clean()
        break
    }
  }
})

// 清洁block列表里的项
const clean = function () {
  // 清理楼层
  blockList.forEach(function (item) {
    for (let name of $('.p_author_name')) {
      if (name.innerHTML.trim() == item) {
        let node = name.parentNode.parentNode.parentNode.parentNode
        node.parentNode.removeChild(node)
      }
    }
    // 清理楼中楼
    for (let replayItem of $('.j_user_card')) {
      if (replayItem.innerHTML.trim() == item) {
          let node = replayItem.parentNode.parentNode
        node.parentNode.removeChild(node)
      }
    }
  })
}

const DOMModificationHandler = function () {
  $(this).unbind('DOMSubtreeModified')
  setTimeout(function () {
    // 判断document是否有变化
    if (html != document.documentElement.innerHTML) {
      clean()
      html = document.documentElement.innerHTML
    }
    $(document).bind('DOMSubtreeModified', DOMModificationHandler)
  }, 500)
}

// 判断是否是帖子详情页面
if (window.location.href.includes('http://tieba.baidu.com/p/')) {
  DOMModificationHandler()
}
