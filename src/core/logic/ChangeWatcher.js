// @flow
// watch the changes about subjects, posts, and replies, and notice
export default class ChangeWatcher {
    watch() {

    }

    WatchSubjects() {
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
}
