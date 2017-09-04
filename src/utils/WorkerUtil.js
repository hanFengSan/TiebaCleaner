export default class SimpleWorker {
    worker;

    constructor(script) {
        let blobURL = window.URL.createObjectURL(new window.Blob(['(',
            script.toString(),
            ')()'
        ], { type: 'application/javascript' }));
        this.worker = new window.Worker(blobURL);
        window.URL.revokeObjectURL(blobURL);
    }
}
