import BaseCleaner from '../BaseCleaner'

class AdSubjectCleaner extends BaseCleaner {
    cleanSubject(items) {
        return items.reduce((list, item) => {
            if (item.querySelector('.pull_right.label_text')) {
                this.hideNode(item);
            } else {
                list.push(item);
            }
            return list;
        }, []);
    }
}

let instance = new AdSubjectCleaner();
export default instance;
