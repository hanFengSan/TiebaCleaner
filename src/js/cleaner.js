import HtmlParser from 'htmlparser2'

class Cleaner {
    constructor() {
        console.log('TiebaCleaner constructed')
        this.homeCycleFuncs = []
        this.postCycleFuncs = []
        this.blockList = []
        this.isSet = false // 避免重复配置
        // 启动首页循环
        this.homeCycle()
        // 启动帖子循环
        this.postCycle()
    }

    toString() {
        console.log('Cleaner')
    }

    clean(options) {
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
                    if (!this.isSet)
                        this.cleanAdPost(item.value)
                    break
                case '屏蔽猜你感兴趣':
                    this.cleanInteresting(item.value)
                    break
                case '屏蔽视频贴':
                    if (!this.isSet)
                        this.cleanVideoPost(item.value)
                    break
                case '屏蔽回复中的广告':
                    if (!this.isSet)
                        this.cleanReplyAd(item.value)
                    break
                case '屏蔽相关推荐':
                    this.cleanRecommand(item.value)
                    break
            }
        }
        if (!this.isSet) {
            this.blockUser()
            this.cleanBlockedPoster()
        }

        this.isSet = true
    }

    defaultClean() {}

    // 主页检测变动循环
    homeCycle() {
        if (window.location.href.includes('tieba.baidu.com/f')) {
            this.asyncQueryNode('#pagelet_frs-list\\/pagelet\\/thread')
                .then((threadList) => {
                    if (threadList) {
                        console.log('start homeCycle');
                        const clean = () => this.homeCycleFuncs.forEach(func => func());
                        const observe = mo => mo.observe(threadList, { childList: true, subtree: true });
                        const observer = new MutationObserver((records, mo) => {
                            console.log('homeCycle');
                            mo.disconnect();
                            clean();
                            observe(mo);
                        });
                        observe(observer);
                        clean();
                    }
                });
        }
    }

    asyncQueryNode(selector, isAll) {
        return new Promise((resolve, reject) => {
            let result = null;
            let i = 0;
            let timer = window.setInterval(() => {
                result = isAll ? document.querySelectorAll(selector) : document.querySelector(selector);
                console.log(`find ${selector}`)
                if (result) {
                    console.log(`found ${selector}`)
                    window.clearInterval(timer);
                    resolve(result);
                }
                i++;
                if (i > 100) {
                    console.log(`get ${selector} failed`);
                    window.clearInterval(timer);
                    resolve(null);
                }
            }, 50);
        });
    }

    // 帖子检测变动循环
    _postCycle() {
        let parent = this
        let postListLen = 0 // 用于判断dom是否改变
        let find = function () {
            let len = $('#j_p_postlist').text().length
            // dom是否更改，此节点发生更改则表示换页了
            if (len == postListLen)
                return
            postListLen = len
            for (let func of parent.postCycleFuncs) {
                func()
            }

            if (!window.location.href.includes('tieba.baidu.com/p'))
                clearInterval(finder)
        }
        let finder
        if (window.location.href.includes('tieba.baidu.com/p'))
            finder = setInterval(find, 250)
    }

    // 帖子检测变动循环
    postCycle() {
        if (window.location.href.includes('tieba.baidu.com/p')) {
            this.asyncQueryNode('#j_p_postlist')
                .then((postList) => {
                    console.log('start postCycle');
                    if (postList) {
                        const clean = () => this.postCycleFuncs.forEach(func => func());
                        const observe = mo => mo.observe(postList, { childList: true, subtree: true });
                        const observer = new MutationObserver((records, mo) => {
                            console.log('postCycle');
                            mo.disconnect();
                            clean();
                            observe(mo);
                        });
                        observe(observer);
                        clean();
                    }
                });
        }
    }

    hideNode(node, text) {
        if (!node.classList.contains('cleaner-blocked')) {
            node.style.transition = 'max-height 0.3s ease'
            node.style.maxHeight = `${node.clientHeight}px`
            node.style.overflow = 'hidden'
            node.style.border = '0'
            node.classList.add('cleaner-blocked')
            if (text) {
                node.classList.add(text)
            }
            window.setTimeout(() => {
                node.style.maxHeight = '0'
            }, 0)
            console.log('hide one')
        }
    }

    blockUser() {
        this.postCycleFuncs.push(() => {
            const blockMap = new Map(this.blockList.map(i => {
                return [i, true]
            }))
            // 清理楼层
            for (let name of document.querySelectorAll('.p_author_name')) {
                if (blockMap.get(name.innerHTML.trim())) {
                    let node = name.parentNode.parentNode.parentNode.parentNode
                    node.parentNode.removeChild(node)
                    this.hideNode(name.parentNode.parentNode.parentNode.parentNode, 'blocked-user')
                }
            }
            // 清理楼中楼
            for (let replayItem of document.querySelectorAll('.j_user_card')) {
                if (blockMap.get(replayItem.innerHTML.trim())) {
                    let node = replayItem.parentNode.parentNode
                    node.parentNode.removeChild(node)
                    this.hideNode(replayItem.parentNode.parentNode, 'blocked-user-replay')
                }
            }
        })
    }

    cleanSearchRightAd(isRemoved) {
        if (isRemoved) {
            $('.img_wrap').css('display', 'none', 'important')
            $('.hover_btn').parent().parent().parent().remove() // 删除左边浮动广告
        } else
            $('.img_wrap').css('cssText', 'display: block !important;') // 需要明确指定，否则有些会不起效
    }

    cleanSalute(isRemoved) {
        if (isRemoved)
            $('.firework-wrap').css('display', 'none', 'important')
        else
            $('.firework-wrap').css('cssText', 'display: block !important;')
    }

    cleanFloatBar(isRemoved) {
        if (isRemoved)
            $('.tbui_aside_float_bar').css('display', 'none', 'important')
        else
            $('.tbui_aside_float_bar').css('cssText', 'display: block !important;')
    }

    cleanHotList(isRemoved) {
        if (isRemoved)
            $('.topic_list_box').css('display', 'none', 'important')
        else
            $('.topic_list_box').css('cssText', 'display: block !important;')
    }

    cleanHeadVideoBar(isRemoved) {
        if (isRemoved)
            $('#video_frs_head').css('display', 'none', 'important')
        else
            $('#video_frs_head').css('cssText', 'display: block !important;')
    }

    cleanApp(isRemoved) {
        if (isRemoved)
            $('.my_app').css('display', 'none', 'important')
        else
            $('.my_app').css('cssText', 'display: block !important;')
    }

    cleanCelebrity(isRemoved) {
        if (isRemoved)
            $('.celebrity').css('display', 'none', 'important')
        else
            $('.celebrity').css('cssText', 'display: block !important;')
    }

    cleanBilibiliHeader(isRemoved) {
        if (isRemoved)
            $('#pagelet_frs-header\\/pagelet\\/head_content_middle').css('display', 'none', 'important')
        else
            $('#pagelet_frs-header\\/pagelet\\/head_content_middle').css('cssText', 'display: block !important;')
    }

    cleanToast(isRemoved) {
        if (isRemoved)
            $('.head_ad_pop').css('display', 'none', 'important')
        else
            $('.head_ad_pop').css('cssText', 'display: block !important;')
    }

    cleanAdPost(isRemoved) {
        if (isRemoved) {
            this.homeCycleFuncs.push(() => {
                let list = document.querySelectorAll('.threadlist_rep_num')
                if (list.length > 0) {
                    for (let item of list) {
                        if (item.innerHTML == '广告' || item.innerHTML == '热门') {
                            this.hideNode(item.parentNode.parentNode.parentNode)
                        }
                    }
                }
            })
        }
    }

    cleanInteresting(isRemoved) {
        if (isRemoved)
            $('.iframe_wrapper').css('display', 'none', 'important')
        else
            $('.iframe_wrapper').css('cssText', 'display: block !important;')
    }

    cleanVideoPost(isRemoved) {
        if (isRemoved) {
            this.homeCycleFuncs.push(function () {
                let list = $('.threadlist_rep_num')
                if (list.length > 0) {
                    $('.threadlist_video').parent().parents('li').remove()
                }
            })
        }
    }

    cleanReplyAd(isRemoved) {
        if (isRemoved) {
            this.postCycleFuncs.push(() => {
                if ($('.l_post').length > 0) {
                    for (let item of $('.core_reply_tail')) {
                        if (item.innerHTML.includes('广告')) {
                            console.log('clean an ad1')
                            this.hideNode(item.parentNode.parentNode.parentNode)
                        }
                    }
                    for (let item of $('.core_reply')) {
                        if (item.innerHTML.includes('<span class="label_text">广告</span>')) {
                            console.log('clean an ad2')
                            this.hideNode(item.parentNode.parentNode)
                        }
                    }
                }
            })
        }
    }

    cleanRecommand(isRemoved) {
        if (isRemoved)
            $('.thread_recommend').css('display', 'none', 'important')
        else
            $('.thread_recommend').css('cssText', 'display: block !important;')
    }

    cleanBlockedPoster() {
        let parent = this
        this.homeCycleFuncs.push(function () {
            let list = document.getElementsByClassName('frs-author-name-wrap')
            if (list.length > 0) {
                for (let item of list) {
                    parent.blockList.forEach(function (user) {
                        if (user === item.textContent) {
                            let itemNode = item.parentNode.parentNode.parentNode.parentNode.parentNode
                            itemNode.parentNode.removeChild(itemNode)
                        }
                    })
                }
            }
        })
    }
}

export default Cleaner