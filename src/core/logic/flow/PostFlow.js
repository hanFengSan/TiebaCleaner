// get post flow
import BaseFlow from './BaseFlow'
import * as Util from 'src/utils'

export default class PostFlow extends BaseFlow {
    type = BaseFlow.TYPE_POST;

    async get() {
        super.get();
        let container = await Util.NodeSelector.asyncQueryNode('#j_p_postlist');
        let posts = Array.prototype.slice.call(container.children, 0)
            .filter(child => child.tagName === 'DIV');
        posts = this.getUncheckedItems(posts);
        this.setCheckedState(posts);
        return posts;
    }
}
