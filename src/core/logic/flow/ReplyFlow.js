// get post flow
import BaseFlow from './BaseFlow'
import * as Util from 'src/utils'

export default class ReplyFlow extends BaseFlow {
    type = BaseFlow.TYPE_REPLY;

    async get() {
        super.get();
        let replies = await Util.NodeSelector.asyncQueryNode('.lzl_single_post', true);
        replies = this.getUncheckedItems(replies);
        this.setCheckedState(replies);
        return replies;
    }
}
