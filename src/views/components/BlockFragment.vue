<template>
    <div>
        <div class='input'>
            <mu-text-field hintText='输入用户昵称, 回车添加' fullWidth /><br/>
        </div>
        <mu-list>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
            <mu-list-item title="All mail">
                <div class='delete' slot="right">删除</div>
            </mu-list-item>
        </mu-list>
    </div>
</template>

<script>
export default {
    name: 'BlockFragment',

    data() {
        return {
            tmp: ''
        };
    }
};
</script>

<style lang="less" scoped>
@import '../styles/vars.less';

.input {
    margin: 10px 15px;
}
.delete {
    color: @delete_color;
    &:hover {
        color: @delete_hover_color;
    }
}
</style>