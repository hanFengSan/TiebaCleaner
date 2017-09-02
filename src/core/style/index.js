// @flow
// manage style blocking
export default class Style {
    _commonClean(selectorText: string, isRemoved: boolean) {
        let node = document.querySelector(selectorText);
        if (node) {
            if (isRemoved) {
                node.style.cssText = 'display: none !important;';
            } else {
                node.style.cssText = 'display: block !important;';
            }
        }
    }

    // hot list
    cleanHotList(isRemoved: boolean) {
        this._commonClean('.topic_list_box', isRemoved);
    }

    // float side bar
    cleanFloatBar(isRemoved: boolean) {
        this._commonClean('.tbui_aside_float_bar', isRemoved);
    }
}
