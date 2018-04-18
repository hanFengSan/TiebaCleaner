// 此部分代码将会注入到贴吧页面中
import Cleaner from './cleaner'
import Utils from './utils.js'
import { get, remove, setPartlyList, getPartlyList } from './storage';

// 屏蔽列表
var html = document.documentElement.innerHTML // 用于检查是否需要刷新

const cleaner = new Cleaner()

// 读取clean配置
chrome.storage.sync.get('adOptions', function (data) {
  if (data.adOptions != undefined) {
    // 执行初次clean配置
    cleaner.clean(data.adOptions)
  } else {
    cleaner.clean({
      version: 1,
      list: [
        {title: '屏蔽搜索右侧广告', value: true},
        {title: '屏蔽底部礼炮', value: true},
        {title: '屏蔽侧边工具栏', value: true},
        {title: '屏蔽热议榜', value: true},
        {title: '屏蔽顶部视频栏', value: true},
        {title: '屏蔽应用推荐', value: true},
        {title: '屏蔽右侧名人块', value: true},
        {title: '屏蔽顶部类b吧头', value: true},
        {title: '屏蔽顶部提示框', value: true},
        {title: '屏蔽广告贴', value: true},
        {title: '屏蔽猜你感兴趣', value: true},
        {title: '屏蔽视频贴', value: true},
        {title: '屏蔽回复中的广告', value: true},
        {title: '屏蔽相关推荐', value: true}
      ]
    })
  }
})

async function init() {
    let list = await get('list');
    if (list) {
        list = [].concat(await getPartlyList('blockList'), list);
        list = [...new Set(list)];
        await setPartlyList('blockList', list);
        await remove('list');
    }
    cleaner.blockList = await getPartlyList('blockList');
    cleaner.cleanImmediately();
}

init();

// 监听clean列表的变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let key in changes) {
    switch (key) {
      case 'adOptions':
        cleaner.clean(changes[key].newValue)
        break
      case 'list':
        cleaner.blockList = changes[key].newValue
        break
    }
  }
})
