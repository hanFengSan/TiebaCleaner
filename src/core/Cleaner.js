import ChangeWatcher from './logic/ChangeWatcher'
import AdSubjectCleaner from './logic/pattern/AdCleaner/AdSubjectCleaner'
import AdPostCleaner from './logic/pattern/AdCleaner/AdPostCleaner'

export default class Cleaner {
    run() {
        this._runLogicCleaner();
    }

    _runLogicCleaner() {
        let changeWatcher = new ChangeWatcher();
        changeWatcher.watch((newItems, type, callback) => {
            console.log(`change happens, type: ${type}, items: newItems: ${newItems.length}`);
            console.log(newItems);
            this._clean(newItems, type);
            callback();
        });
    }

    _clean(items, type) {
        console.time('clean');
        items = AdSubjectCleaner.clean(items, type);
        AdPostCleaner.clean(items, type);
        console.timeEnd('clean');
    }
};
