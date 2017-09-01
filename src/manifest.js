// the manifest for chrome extension
module.exports = {
    manifest_version: 2,
    name: '贴吧清洁者',
    description: '为贴吧的环境清洁做点微小的工作，屏蔽贴吧广告，拉黑用户, 贴吧简洁化',
    version: '2.0',
    content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
    browser_action: {
        default_popup: 'popup.html',
        default_title: '贴吧清洁者'
    },
    icons: {
        16: './img/tieba_icon.png',
        24: './img/tieba_icon.png',
        128: './img/tieba_icon.png'
    },
    permissions: [
        'activeTab',
        'https://ajax.googleapis.com/',
        'storage'
    ],
    content_scripts: [{
        matches: [
            '*://tieba.baidu.com/*'
        ],
        js: [
            'main.js'
        ],
        css: [
            'preBlock.css'
        ],
        run_at: 'document_start'
    }]
};