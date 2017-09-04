export default class BaseFlow {
    CLEANER_CHECKED = 'cleaner-checked';
    type;
    static TYPE_SUBJECT = 'TYPE_SUBJECT';
    static TYPE_POST = 'TYPE_POST';
    static TYPE_REPLY = 'TYPE_REPLY';

    // need subclass to implement
    get() {}

    getUncheckedItems(items) {
        return items.filter(post => !post.hasAttribute(this.CLEANER_CHECKED));
    }

    setCheckedState(items) {
        items.forEach(post => post.setAttribute(this.CLEANER_CHECKED, ''));
    }
}
