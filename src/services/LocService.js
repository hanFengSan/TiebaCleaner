// for orientating page
class LocService {
    loc;
    SUBJECT = 'SUBJECT';
    POST = 'POST';

    constructor() {
        if (window.location.href.includes('tieba.baidu.com/f')) {
            this.loc = this.SUBJECT;
        }
        if (window.location.href.includes('tieba.baidu.com/p')) {
            this.loc = this.POST;
        }
    }
}

let instance = new LocService();
export default instance;
