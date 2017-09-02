// DOMContentLoaded和load事件都不能最快的获取node, 遂暴力循环
class NodeSelectorUtil {
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

    findNodeParent(node, parentClassList) {
        while (node.parentNode) {
            let result = true;
            for (let i of parentClassList) {
                if (!node.parentNode.classList || !node.parentNode.classList.contains(i)) {
                    result = false;
                }
            }
            if (result) {
                return node.parentNode;
            } else {
                node = node.parentNode;
            }
        }
        return null;
    }
}
