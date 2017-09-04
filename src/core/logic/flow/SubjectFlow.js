// get post flow
import BaseFlow from './BaseFlow'
import * as Util from 'src/utils'

export default class SubjectFlow extends BaseFlow {
    type = BaseFlow.TYPE_SUBJECT;
    
    async get() {
        super.get();
        let container = await Util.NodeSelector.asyncQueryNode('#thread_list');
        let subjects = Array.prototype.slice.call(container.children, 0)
            .filter(child => child.tagName === 'LI');
        subjects = this.getUncheckedItems(subjects);
        this.setCheckedState(subjects);
        return subjects;
    }
}
