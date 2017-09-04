// watch the changes about subjects, posts, and replies
import * as Util from 'src/utils'
import LocService from 'src/services/LocService'
import SubjectFlow from './flow/SubjectFlow'
import PostFlow from './flow/PostFlow'
import ReplyFlow from './flow/ReplyFlow'

export default class ChangeWatcher {
    watch(callback) {
        this._watchSubjects(callback);
        this._watchPosts(callback);
    }

    _watch(observe, callback, flow, check = () => true) {
        const observer = new window.MutationObserver((records, mo) => {
            if (check(records, mo)) {
                flow.get().then(newItems => {
                    if (newItems.length > 0) {
                        mo.disconnect();
                        callback(newItems, flow.type, () => observe(mo));
                    }
                });
            }
        });
        flow.get().then(newItems => {
            if (newItems.length > 0) {
                callback(newItems, flow.type, () => observe(observer));
            } else {
                observe(observer);
            }
        });
    }

    _watchSubjects(callback) {
        if (LocService.loc === LocService.SUBJECT) {
            Util.NodeSelector.asyncQueryNode('#pagelet_frs-list\\/pagelet\\/thread')
                .then((threadList) => {
                    if (threadList) {
                        const observe = mo => mo.observe(threadList, { childList: true, subtree: true });
                        this._watch(observe, callback, new SubjectFlow());
                    }
                });
        }
    }

    _watchPosts(callback) {
        if (LocService.loc === LocService.POST) {
            Util.NodeSelector.asyncQueryNode('#j_p_postlist')
                .then((postList) => {
                    if (postList) {
                        const observe = mo => mo.observe(postList, { childList: true });
                        this._watch(observe, (newItems, loc, cb) => {
                            callback(newItems, loc, () => {
                                this._watchReplies(callback);
                                cb();
                            });
                        }, new PostFlow());
                    }
                });
        }
    }

    _watchReplies(callback) {
        const postItemList = document.querySelectorAll('.l_post')
        // 监听楼中楼
        postItemList.forEach(item => {
            if (!item.hasAttribute('cleaner-watch')) {
                const observe = mo => mo.observe(item, { childList: true, subtree: true });
                this._watch(observe, callback, new ReplyFlow(), (records) => {
                    // 通过判断mutation里的特定楼中楼插入/更新关键词来过滤出关键操作
                    if (records.find(r => {
                            return Array.prototype.slice.call(r.addedNodes, 0).find(i => {
                                return (i.innerText && i.innerText.match(/回复[\s\S]*?我也说一句/g)) ||
                                    (i.innerHTML && i.innerHTML.match(/^<a name/g));
                            })
                        })) {
                        return true;
                    }
                    return false;
                });
                item.setAttribute('cleaner-watch', '');
            }
        });
    }
}
