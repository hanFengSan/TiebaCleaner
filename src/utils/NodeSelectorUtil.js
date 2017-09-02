// @flow
// DOMContentLoaded和load事件都不能最快的获取node, 遂暴力循环
class NodeSelectorUtil {
    asyncQueryNode(selector: string): Promise {
        const time = 50;
        const maxRetryTimes = 100;
        return new Promise((resolve: HTMLElement, reject) => {
            let result = null;
            let i = 0;
            let timer = window.setInterval(() => {
                result = document.querySelector(selector);
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

    asyncQueryNodeAll(selector: string): Promise {
        const time = 50;
        const maxRetryTimes = 100;
        return new Promise((resolve: NodeList | null, reject) => {
            let result = null;
            let i = 0;
            let timer = window.setInterval(() => {
                result = document.querySelectorAll(selector);
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

    findNodeParent(node: HTMLElement, parentClassList: Array<string>): HTMLElement {
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
