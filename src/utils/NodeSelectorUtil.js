// node选取的工具类
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
                    // covert HtmlCollection to Array
                    resolve(isAll ? Array.prototype.slice.call(result, 0) : result);
                }
                i++;
                if (i === maxRetryTimes - 1) {
                    window.clearInterval(timer);
                    resolve(null);
                }
            }, time);
        });
    }

    // 便捷通过className获取父节点
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

let instance = new NodeSelectorUtil();
export default instance;
