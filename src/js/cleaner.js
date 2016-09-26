class Cleaner {
  constructor () {
    console.log('yakami constructor')
    this.homeCycleFunc = []
    this.postCycleFunc = []
    this.blockList = []
    this.isSetted = false // 避免重复配置
    // 启动首页循环
    this.homeCycle()
    // 启动帖子循环
    this.postCycle()
  }

  toString () {
    console.log('Cleaner')
  }

  clean (options) {
    for (let item of options.list) {
      switch (item.title) {
        case '屏蔽搜索右侧广告':
          this.cleanSearchRightAd(item.value)
          break
        case '屏蔽底部礼炮':
          this.cleanSalute(item.value)
          break
        case '屏蔽侧边工具栏':
          this.cleanFloatBar(item.value)
          break
        case '屏蔽热议榜':
          this.cleanHotList(item.value)
          break
        case '屏蔽顶部视频栏':
          this.cleanHeadVideoBar(item.value)
          break
        case '屏蔽应用推荐':
          this.cleanApp(item.value)
          break
        case '屏蔽右侧名人块':
          this.cleanCelebrity(item.value)
          break
        case '屏蔽顶部类b吧头':
          this.cleanBilibiliHeader(item.value)
          break
        case '屏蔽顶部提示框':
          this.cleanToast(item.value)
          break
        case '屏蔽广告贴':
          if (!this.isSetted)
            this.cleanAdPost(item.value)
          break
        case '屏蔽猜你感兴趣':
          this.cleanInteresting(item.value)
          break
        case '屏蔽视频贴':
          if (!this.isSetted)
            this.cleanVideoPost(item.value)
          break
        case '屏蔽回复中的广告':
          if (!this.isSetted)
            this.cleanReplyAd(item.value)
          break
        case '屏蔽相关推荐':
          this.cleanRecommand(item.value)
          break
      }
    }
    if (!this.isSetted)
      this.blockUser()

    this.isSetted = true
  }

  defaultClean () {}

  // 主页检测变动循环
  homeCycle () {
    let parent = this
    let threadListLen = 0 // 用于判断dom是否改变
    let find = function () {
      let len = $('#thread_list').text().length
      // dom是否更改，此节点发生更改则表示换页了
      if (len == threadListLen)
        return
      threadListLen = len
      for (let func of parent.homeCycleFunc) {
        func()
      }

      if (!window.location.href.includes('http://tieba.baidu.com/f'))
        clearInterval(finder)
    }
    let finder
    if (window.location.href.includes('http://tieba.baidu.com/f'))
      finder = setInterval(find, 250)
  }

  // 帖子检测变动循环
  postCycle () {
    let parent = this
    let postListLen = 0 // 用于判断dom是否改变
    let find = function () {
      let len = $('#j_p_postlist').text().length
      // dom是否更改，此节点发生更改则表示换页了
      if (len == postListLen)
        return
      postListLen = len
      for (let func of parent.postCycleFunc) {
        func()
      }

      if (!window.location.href.includes('http://tieba.baidu.com/p'))
        clearInterval(finder)
    }
    let finder
    if (window.location.href.includes('http://tieba.baidu.com/p'))
      finder = setInterval(find, 250)
  }

  blockUser () {
    let parent = this
    this.postCycleFunc.push(function () {
      parent.blockList.forEach(function (item) {
        // 清理楼层
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
    })
  }

  cleanSearchRightAd (isRemoved) {
    if (isRemoved) {
      $('.img_wrap').css('display', 'none', 'important')
      $('.hover_btn').parent().parent().parent().remove() // 删除左边浮动广告
    }
    else
      $('.img_wrap').css('cssText', 'display: block !important;') // 需要明确指定，否则有些会不起效
  }

  cleanSalute (isRemoved) {
    if (isRemoved)
      $('.firework-wrap').css('display', 'none', 'important')
    else
      $('.firework-wrap').css('cssText', 'display: block !important;')
  }

  cleanFloatBar (isRemoved) {
    if (isRemoved)
      $('.tbui_aside_float_bar').css('display', 'none', 'important')
    else
      $('.tbui_aside_float_bar').css('cssText', 'display: block !important;')
  }

  cleanHotList (isRemoved) {
    if (isRemoved)
      $('.topic_list_box').css('display', 'none', 'important')
    else
      $('.topic_list_box').css('cssText', 'display: block !important;')
  }

  cleanHeadVideoBar (isRemoved) {
    if (isRemoved)
      $('#video_frs_head').css('display', 'none', 'important')
    else
      $('#video_frs_head').css('cssText', 'display: block !important;')
  }

  cleanApp (isRemoved) {
    if (isRemoved)
      $('.my_app').css('display', 'none', 'important')
    else
      $('.my_app').css('cssText', 'display: block !important;')
  }

  cleanCelebrity (isRemoved) {
    if (isRemoved)
      $('.celebrity').css('display', 'none', 'important')
    else
      $('.celebrity').css('cssText', 'display: block !important;')
  }

  cleanBilibiliHeader (isRemoved) {
    if (isRemoved)
      $('#pagelet_frs-header\\/pagelet\\/head_content_middle').css('display', 'none', 'important')
    else
      $('#pagelet_frs-header\\/pagelet\\/head_content_middle').css('cssText', 'display: block !important;')
  }

  cleanToast (isRemoved) {
    if (isRemoved)
      $('.head_ad_pop').css('display', 'none', 'important')
    else
      $('.head_ad_pop').css('cssText', 'display: block !important;')
  }

  cleanAdPost (isRemoved) {
    if (isRemoved) {
      this.homeCycleFunc.push(function () {
        let list = $('.threadlist_rep_num')
        if (list.length > 0) {
          for (let item of list) {
            if (item.innerHTML == '广告') {
              let itemNode = item.parentNode.parentNode.parentNode
              itemNode.parentNode.removeChild(itemNode)
            }
          }
        }
      })
    }
  }

  cleanInteresting (isRemoved) {
    if (isRemoved)
      $('.iframe_wrapper').css('display', 'none', 'important')
    else
      $('.iframe_wrapper').css('cssText', 'display: block !important;')
  }

  cleanVideoPost (isRemoved) {
    if (isRemoved) {
      this.homeCycleFunc.push(function () {
        let list = $('.threadlist_rep_num')
        if (list.length > 0) {
          $('.threadlist_video').parent().parents('li').remove()
        }
      })
    }
  }

  cleanReplyAd (isRemoved) {
    if (isRemoved) {
      this.postCycleFunc.push(function () {
        if ($('.l_post').length > 0) {
          for (let item of $('.core_reply')) {
            if (item.innerHTML.includes('广告')) {
              let itemNode = item.parentNode.parentNode
              itemNode.parentNode.removeChild(itemNode)
            }
          }
        }
      })
    }
  }

  cleanRecommand (isRemoved) {
    if (isRemoved)
      $('.thread_recommend').css('display', 'none', 'important')
    else
      $('.thread_recommend').css('cssText', 'display: block !important;')
  }
}

export default Cleaner
