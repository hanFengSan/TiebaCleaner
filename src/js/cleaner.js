class Cleaner {
  constructor () {}

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
          this.cleanAdPost(item.value)
          break
        case '屏蔽猜你感兴趣':
          this.cleanInteresting(item.value)
          break
        case '屏蔽视频贴':
          this.cleanVideoPost(item.value)
          break
        case '屏蔽回复中的广告':
          this.cleanReplyAd(item.value)
          break
        case '屏蔽相关推荐':
          this.cleanRecommand(item.value)
          break
      }
    }
  }

  defaultClean () {
    this.cleanSearchRightAd(true)
    this.cleanSalute(true)
  }

  cleanSearchRightAd (isRemoved) {
    if (isRemoved)
      $('.img_wrap').css('display', 'none', 'important')
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
      let find = function () {
        let list = $('.threadlist_rep_num')
        if (list.length > 0) {
          for (let item of list) {
            if (item.innerHTML == '广告') {
              let itemNode = item.parentNode.parentNode.parentNode
              itemNode.parentNode.removeChild(itemNode)
            }
          }
          clearInterval(finder)
        }
      }
      let finder
      if (window.location.href.includes('http://tieba.baidu.com/f'))
        finder = setInterval(find, 250)
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
      let find = function () {
        let list = $('.threadlist_rep_num')
        if (list.length > 0) {
          $('.threadlist_video').parent().parents('li').remove()
          clearInterval(finder)
        }
      }
      let finder
      if (window.location.href.includes('http://tieba.baidu.com/f'))
        finder = setInterval(find, 250)
    }
  }

  cleanReplyAd (isRemoved) {
    if (isRemoved) {
      let find = function () {
        if ($('.l_post').length > 0) {
          for (let item of $('.core_reply')) {
            if (item.innerHTML.includes('广告')) {
              let itemNode = item.parentNode.parentNode
              itemNode.parentNode.removeChild(itemNode)
            }
          }
          clearInterval(finder)
        }
      }
      let finder
      if (window.location.href.includes('http://tieba.baidu.com/p'))
        finder = setInterval(find, 250)
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
