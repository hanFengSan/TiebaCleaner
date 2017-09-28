<template>
    <div class="popup-container">
        <h1>贴吧清洁者</h1>
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab :value="read.name" title="一般" />
            <mu-tab :value="block.name" title="拉黑" />
            <mu-tab :value="notification.name" title="屏蔽" />
            <mu-tab :value="about.name" title="关于" />
        </mu-tabs>
        <div class="read" v-if="activeTab === read.name">
            <mu-list>
                <mu-sub-header>一般屏蔽设置</mu-sub-header>
                <mu-list-item disableRipple @click="handleToggle(read, 'eHunterView')" title="屏蔽浮动操作栏">
                    <mu-switch v-model="read.eHunterView" slot="right" />
                </mu-list-item>
                <mu-list-item disableRipple @click="handleToggle(read, 'eHunterView')" title="屏蔽热议榜">
                    <mu-switch v-model="read.eHunterView" slot="right" />
                </mu-list-item>
                <mu-list-item disableRipple @click="handleToggle(read, 'eHunterView')" title="屏蔽视频贴">
                    <mu-switch v-model="read.eHunterView" slot="right" />
                </mu-list-item>
                <mu-sub-header>高级屏蔽设置</mu-sub-header>
                <mu-list-item disableRipple @click="handleToggle(read, 'eHunterView')" title="拉黑用户">
                    <mu-switch v-model="read.eHunterView" slot="right" />
                </mu-list-item>
                <mu-list-item disableRipple @click="handleToggle(read, 'eHunterView')" title="正则屏蔽">
                    <mu-switch v-model="read.eHunterView" slot="right" />
                </mu-list-item>
                <mu-list-item disableRipple @click="handleToggle(read, 'eHunterView')" title="帖子屏蔽">
                    <mu-switch v-model="read.eHunterView" slot="right" />
                </mu-list-item>
            </mu-list>
        </div>
        <div v-if="activeTab === notification.name" class="notification">
            <!-- <notification></notification> -->
        </div>
        <div v-if="activeTab === block.name" class="notification">
            <block-fragment></block-fragment>
        </div>
        <div v-if="activeTab === about.name" class="about">
            <table>
                <tr>
                    <td>作者</td>
                    <td>寒枫</td>
                </tr>
                <tr>
                    <td>github</td>
                    <td>
                        <a target="_blank" href="https://github.com/hanFengSan/eHunter">https://github.com/hanFengSan/eHunter</a>
                    </td>
                </tr>
                <tr>
                    <td>反馈</td>
                    <td>如果有bug或建议的要反馈, 可以在github上开issue, 或电邮我c360785655@gmail.com</td>
                </tr>
                <tr>
                    <td>其他</td>
                    <td>如果觉得这个扩展对你有帮助的话, 可以在商店里点个赞, 或帮忙推荐给朋友什么的, 有人喜欢我才有动力继续做得更好(ﾟ▽ﾟ)/</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
// import SettingService from 'src/service/SettingService.js'
// import Notification from 'src/components/Notification.vue'
import BlockFragment from './components/BlockFragment.vue';

export default {
    name: 'PopupApp',
    data() {
        return {
            activeTab: '',
            read: {
                name: Symbol(),
                eHunterView: true,
                thumbView: true,
                paginationView: true,
                syncScroll: true,
                viewScale: 80,
                cacheImg: true
            },
            notification: {
                name: Symbol()
            },
            block: {
                name: Symbol()
            },
            about: {
                name: Symbol()
            }
        }
    },
    components: {
        BlockFragment
        // Notification
    },
    watch: {
    },
    created() {
        this.activeTab = this.read.name;
        this.initValues();
    },
    methods: {
        initValues() {
        },
        handleTabChange(val) {
            this.activeTab = val
        },
        handleToggle(tab, key) {
            tab[key] = !tab[key];
        }
    }
}
</script>

<style lang="less">
@import "./styles/vars";
body {
    font-family: 'San Francisco', 'Helvetica', Arial, "Hiragino Sans GB", "Heiti SC", //macOS & ios
    "Microsoft YaHei", //windows
    'Droid Sans', // android default
    'WenQuanYi Micro Hei', // linux
    sans-serif;
    height: 500px;
}

// muse-ui customize
.mu-text-field-hint {
    color: rgba(0, 0, 0, 0.27) !important;
}

.mu-text-field-line {
    background-color: rgba(0, 0, 0, 0.34) !important;
}

.mu-menu-item-wrapper {
    color: rgba(0, 0, 0, 0.34) !important;
}


.popup-container {
    width: 300px;
    h1 {
        background: @popup_primary_color;
        padding-top: 20px;
        padding-bottom: 3px;
        margin: 0;
        font-weight: bold;
        font-size: 16px;
        margin-top: 0;
        text-align: center;
        color: @popup_alternate_text_color;
    }
    .read {
        .slider-item {
            padding: 0 10px;
        }
        .slider-text {
            color: @popup_text_color;
            text-align: center;
            font-size: 12px;
            margin-top: -5px;
        }
        .action {
            color: @popup_primary_color !important;
        }
    }
    .notification {
        .tip {
            color: hsla(0, 0%, 0%, .2);
            text-align: center;
            margin-top: 100px;
            font-weight: bolder;
            font-size: 14px;
        }
    }
    .about {
        table {
            padding: 10px;
            word-break: break-all;
            color: @popup_text_color;
            tr {
                padding-bottom: 10px;
                td {
                    &:first-child {
                        color: @popup_primary_color;
                        white-space: nowrap;
                        vertical-align: top;
                    }
                    >a {
                        color: hsl(145, 63%, 49%, 0.7)
                    }
                }
            }
        }
    }
}
</style>