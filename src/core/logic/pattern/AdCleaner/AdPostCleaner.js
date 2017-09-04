import BaseCleaner from '../BaseCleaner'

class AdPostCleaner extends BaseCleaner {
    cleanPost(items) {
        return items.reduce((list, item) => {
            if (item.querySelector('.core_reply') &&
                item.querySelector('.core_reply').textContent.trim() === '广告') {
                this.hideNode(item);
            } else {
                list.push(item);
            }
            return list;
        }, []);
    }
}

let instance = new AdPostCleaner();
export default instance;
