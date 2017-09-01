<template>
    <div>
        <div class="input-container">
            <div class="vc-item-form-content">
                <label class="vc-text-field"> 
                    <div class="label">用户名</div> 
                    <input autocomplete="off" @keyup.enter="submit" type="text" placeholder="回车确认输入" v-model="baiduName"> 
                </label>
            </div>
        </div>
        <list v-if="list.length > 0">
            <item-cell v-for="item of list">
                <item-media></item-media>
                <item-title>
                    {{ item }}
                </item-title>
                <item-title-after>
                    <a href="#" @click="remove($index)">删除</a>
                </item-title-after>
            </item-cell>
        </list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                baiduName: '',
                newUpName: '',
                list: []
            }
        },

        created: function() {
            //加载
            let list = this.list;
            chrome.storage.sync.get('list', function(data) {
                if (data.list != undefined) {
                    for (let item of data.list) {
                        list.push(item);
                    }
                }
            });
        },

        methods: {
            //添加屏蔽列表项
            submit: function() {
                this.baiduName = this.baiduName.trim();
                if (this.baiduName == '')
                    return;
                //去重
                let isExisted = false;
                for (let item of this.list) {
                    if (item == this.baiduName)
                        isExisted = true;
                }
                if (!isExisted) {
                    this.list.push(this.baiduName);
                    this.baiduName = '';
                    this.saveChanges(this.list);
                }
            },
            //保存修改，类型为可同步类型
            saveChanges: function(list) {
                // 使用 Chrome 扩展程序的存储 API 保存它。
                chrome.storage.sync.set({
                    'list': list
                }, function() {
                    console.log('设置已保存');
                });
            },
            //移除屏蔽列表项
            remove: function(index) {
                this.list.splice(index, 1);
                // console.log('delete');
                this.saveChanges(this.list);
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../css/color";
    @import "../../css/common";
    .input-container {
        margin-top: 10px;
        margin-right: 0px;
        margin-left: 16px;
        .label:active {
            color: $primary-color;
        }
        .submit-container {
            cursor: pointer;
            width: 40px;
            height: 25px;
            display: inline-block;
            background: $primary-color;
            overflow: hidden;
            position: absolute;
            .submit-label {
                line-height: 25px;
                height: 25px;
                font-size: 11px;
                padding: 5px;
                color: white;
                background: $primary-color;
            }
        }
    }
    
    .table-container {
        margin-top: 10px;
        .table-name {
            max-width: 250px;
        }
    }
    
    .vc-item-title {
        padding-left: 0px !important;
    }
    
    a {
        color: $primary-color;
    }
</style>