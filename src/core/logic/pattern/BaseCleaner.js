import BaseFlow from '../flow/BaseFlow'

export default class BaseCleaner {
    clean(items, type) {
        switch (type) {
            case BaseFlow.TYPE_SUBJECT:
                return this.cleanSubject(items);
            case BaseFlow.TYPE_POST:
                return this.cleanPost(items);
            case BaseFlow.TYPE_REPLY:
                return this.cleanReply(items);
        }
    }

    // need subclass to implement
    cleanSubject(items) {
        return items;
    }

    cleanPost(items) {
        return items;
    }

    cleanReply(items) {
        return items;
    }

    hideNode(node, text) {
        if (!node.classList.contains('cleaner-blocked')) {
            node.style.transition = 'max-height 0.3s ease';
            node.style.maxHeight = `${node.clientHeight}px`;
            node.style.overflow = 'hidden';
            node.style.border = '0';
            node.classList.add('cleaner-blocked');
            if (text) {
                node.classList.add(text);
            }
            window.setTimeout(() => {
                node.style.maxHeight = '0';
            }, 0)
        }
    }
}
