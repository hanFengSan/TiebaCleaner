export function get(key, isSync = true) {
    return new Promise((resolve, reject) => {
        let storage = isSync ? chrome.storage.sync : chrome.storage.local;
        storage.get(key, data => {
            resolve(data[key]);
        });
    });
}

export function set(key, data, isSync = true) {
    return new Promise((resolve, reject) => {
        let storage = isSync ? chrome.storage.sync : chrome.storage.local;
        if (key.length + JSON.stringify(data).length < 8000) { // chrome单个项目的大小限制
            storage.set({
                [key]: data
            }, data => {
                resolve(true);
            });
        } else {
            resolve(false);
        }
    });
}

export function remove(key, isSync = true) {
    return new Promise((resolve, reject) => {
        let storage = isSync ? chrome.storage.sync : chrome.storage.local;
        storage.remove(key, () => {
            resolve(true);
        });
    });
}

export async function getPartlyList(key, isSync = true) {
    let storage = isSync ? chrome.storage.sync : chrome.storage.local;
    let list = [];
    let index = 0;
    while(true) {
        let data = await get(`${key}_${index}`);
        if (data) {
            list = [].concat(list, data);
            index++;
        } else {
            break;
        }
    }
    return list;
}

export async function removePartlyList(key, isSync = true) {
    let list = [];
    let index = 0;
    while(true) {
        let data = await get(`${key}_${index}`);
        if (data) {
            await remove(`${key}_${index}`, isSync);
            index++;
        } else {
            break;
        }
    }
}

export async function setPartlyList(key, list, isSync = true) {
    await removePartlyList(key, isSync);
    let fragments = Math.ceil(JSON.stringify(list).length / 8000);
    let length = Math.ceil(list.length / fragments);
    for (let i = 0; i < fragments; i++) {
        await set(`${key}_${i}`, list.splice(0, length), isSync);
    }
}
