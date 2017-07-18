class Cleaner {
    constructor() {
        console.log('TiebaCleaner constructed')
        this.homeCycleFuncs = [] // 主页帖子列表处理方法队列
        this.postCycleFuncs = [] // 楼处理方法队列
        this.replyCycleFuncs = [] // 楼中楼处理方法队列
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
                    this.cleanRecommend(item.value)
                    break
            }
        }
        if (!this.isSet) {
            this.blockUserInPoster()
            this.blockUserInPost()
            this.blockUserInReply()
            this.addBlockButton()
            this.blockUnrelatedPost()
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
                        const clean = () => this.homeCycleFuncs.forEach(func => func())
                        const observe = mo => mo.observe(threadList, { childList: true, subtree: true })
                        const observer = new MutationObserver((records, mo) => {
                            mo.disconnect()
                            clean()
                            observe(mo)
                        });
                        observe(observer)
                        clean();
                    }
                });
        }
    }

    // DOMContentLoaded和load事件都不能最快的获取node, 遂暴力循环
    asyncQueryNode(selector, isAll) {
        const time = 50;
        const maxRetryTimes = 100;
        return new Promise((resolve, reject) => {
            let result = null;
            let i = 0;
            let timer = window.setInterval(() => {
                result = isAll ? document.querySelectorAll(selector) : document.querySelector(selector);
                if (result) {
                    window.clearInterval(timer);
                    resolve(result);
                }
                i++;
                if (i === maxRetryTimes - 1) {
                    window.clearInterval(timer);
                    resolve(null);
                }
            }, time);
        });
    }

    // 帖子检测变动循环
    postCycle() {
        if (window.location.href.includes('tieba.baidu.com/p')) {
            this.asyncQueryNode('#j_p_postlist')
                .then((postList) => {
                    if (postList) {
                        const clean = () => this.postCycleFuncs.forEach(func => func())
                        const observe = mo => mo.observe(postList, { childList: true })
                        const run = mo => {
                            clean()
                            this.watchPostItem()
                            observe(mo)
                        }
                        const observer = new MutationObserver((records, mo) => {
                            mo.disconnect()
                            run(mo)
                        });
                        run(observer)
                    }
                });
        }
    }

    // 监听帖子单个回复节点
    watchPostItem() {
        const postItemList = document.querySelectorAll('.l_post')
        // 监听楼中楼
        postItemList.forEach(item => {
            if(!item.hasAttribute('cleaner-watch')) {
                const clean = () => this.replyCycleFuncs.forEach(func => func(item))
                const observe = mo => mo.observe(item, { childList: true, subtree: true })
                const run = mo => {
                    clean()
                    observe(mo)
                }
                const observer = new MutationObserver((records, mo) => {
                    // 通过判断mutation里的特定楼中楼插入/更新关键词来过滤出关键操作
                    if (records.find(r => {
                         return Array.prototype.slice.call(r.addedNodes, 0).find(i => { 
                             return (i.innerText && i.innerText.match(/回复[\s\S]*?我也说一句/g)) || (i.innerHTML && i.innerHTML.match(/^<a name/g))  
                            })
                        })) {
                        mo.disconnect()
                        run(mo)
                    }
                });
                run(observer)
                item.setAttribute('cleaner-watch', '')
            }
        });
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
        }
    }

    // 屏蔽用户发表的帖子
    blockUserInPoster() {
        this.homeCycleFuncs.push(() => {
            const blockMap = new Map(this.blockList.map(i => {
                return [i, true]
            }))
            let list = document.getElementsByClassName('frs-author-name-wrap')
            if (list.length > 0) {
                for (let item of list) {
                    if (blockMap.get((item.textContent))) {
                        this.hideNode(item.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, 'blocked-list-user')
                    }
                }
            }
        })
    }

    // 屏蔽非本吧帖子, 解决贴吧乱跳问题
    blockUnrelatedPost() {
        this.homeCycleFuncs.push(() => {
            let list = document.querySelectorAll('.threadlist_title')
            for (let post of list) {
                if (!post.classList.contains('blocked-unrelated-post-title') && post.querySelector('a').href.includes('fid=')) {
                    console.log('屏蔽乱跳帖子: ' + post.querySelector('a').title)
                    console.log(post.querySelector('a').href)
                    post.classList.add('blocked-unrelated-post-title')
                    this.hideNode(post.parentNode.parentNode.parentNode.parentNode, 'blocked-unrelated-post')
                }
            }
        })
    }

    // 屏蔽用户回复
    blockUserInPost() {
        this.postCycleFuncs.push(() => {
            const blockMap = new Map(this.blockList.map(i => {
                return [i, true]
            }))
            // 清理楼层
            for (let name of document.querySelectorAll('.p_author_name')) {
                if (blockMap.get(name.innerHTML.trim())) {
                    let node = name.parentNode.parentNode.parentNode.parentNode
                    this.hideNode(name.parentNode.parentNode.parentNode.parentNode, 'blocked-post-user')
                }
            }
        })
    }

    // 屏蔽楼中楼用户
    blockUserInReply() {
        this.replyCycleFuncs.push((node) => {
            const blockMap = new Map(this.blockList.map(i => {
                return [i, true]
            }))
            // 清理楼中楼
            for (let replayItem of node.querySelectorAll('.j_user_card')) {
                if (blockMap.get(replayItem.innerHTML.trim())) {
                    let node = replayItem.parentNode.parentNode
                    this.hideNode(replayItem.parentNode.parentNode, 'blocked-replay-user')
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
                            this.hideNode(item.parentNode.parentNode.parentNode)
                        }
                    }
                    for (let item of $('.core_reply')) {
                        if (item.innerHTML.includes('<span class="label_text">广告</span>')) {
                            this.hideNode(item.parentNode.parentNode)
                        }
                    }
                }
            })
        }
    }

    cleanRecommend(isRemoved) {
        if (isRemoved)
            $('.thread_recommend').css('display', 'none', 'important')
        else
            $('.thread_recommend').css('cssText', 'display: block !important;')
    }


    // 主动触发清除
    cleanImmediately() {
        if (window.location.href.includes('tieba.baidu.com/f')) {
            this.homeCycleFuncs.forEach(func => func())
        }
        if (window.location.href.includes('tieba.baidu.com/p')) {
            this.postCycleFuncs.forEach(func => func())
            this.replyCycleFuncs.forEach(func => func(document))
        }
    }

    addBlockButton() {
        document.addEventListener('DOMNodeInserted', (e) => {
            if (e.target.classList && e.target.classList.contains('card_headinfo_wrap')) {
                const wrap = e.target.children[2];
                const card = wrap.parentNode.parentNode;
                const un = wrap.children[0].dataset.username;
                const btn = document.createElement('a');
                btn.innerHTML = '拉黑';
                btn.classList.add('btn-small');
                btn.classList.add('btn-default');
                btn.onclick = () => {
                    const userName = card.querySelector('.userinfo_username').textContent
                    chrome.storage.sync.get('list', s => {
                        if (!s.list.includes(userName)) {
                            s.list.push(userName)
                            chrome.storage.sync.set({ list: s.list }, () => {
                                this.cleanImmediately()
                            })
                        }
                    })
                }
                wrap.insertBefore(btn, wrap.children[0]);
            }
        });
    }
}

export default Cleaner