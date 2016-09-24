<template>
    <div>
        <list>
            <item-cell v-for="item of adOptions.list">
                <item-media></item-media>
                <item-title>
                    {{ item.title }}
                </item-title>
                <item-title-after>
                    <switch :value="item.value" class="switch-padding pointer" v-on:input-change="optionChange($index, $arguments)"></switch>
                </item-title-after>
            </item-cell>
        </list>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                version: 15,
                adOptions: {}
            }
        },
        created: function () {
            //加载
            let fitData = this.fitData;
            let createData = this.createData;
            let version = this.version;
            chrome.storage.sync.get('adOptions', function(data) {
                if (data.adOptions != undefined && data.adOptions.version == version) {
                    fitData(data.adOptions);
                } else {
                    createData();
                }
            });
        },
        methods: {
            createData() {
                //初始化
                this.adOptions = {
                    version: this.version,
                    list: [
                        {title: '屏蔽搜索右侧广告', value: true},
                        {title: '屏蔽底部礼炮', value: true},
                        {title: '屏蔽侧边工具栏', value: true},
                        {title: '屏蔽热议榜', value: true},
                        {title: '屏蔽顶部视频栏', value: true},
                        {title: '屏蔽应用推荐', value: true},
                        {title: '屏蔽右侧名人块', value: true},
                        {title: '屏蔽顶部类b吧头', value: true},
                        {title: '屏蔽顶部提示框', value: true},
                        {title: '屏蔽广告贴', value: true},
                        {title: '屏蔽猜你感兴趣', value: true},
                        {title: '屏蔽视频贴', value: true},
                        {title: '屏蔽回复中的广告', value: true},
                        {title: '屏蔽相关推荐', value: true},
                    ]
                };
                this.saveChanges(this.adOptions);
            },
            fitData(data) {
                this.adOptions = data;
            },
            optionChange(index, arg) {
                this.adOptions.list[index].value = arg[0];
                this.saveChanges(this.adOptions);
            },            
            //保存修改，类型为可同步类型
            saveChanges(list) {
                // 使用 Chrome 扩展程序的存储 API 保存它。
                chrome.storage.sync.set({
                    'adOptions': list
                }, function() {
                    console.log('设置已保存');
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../css/common";
    @import "../../css/color";
    .switch-padding {
        padding-right: 15px;
    }
    
    .pointer {
        cursor: pointer;
    }
</style>