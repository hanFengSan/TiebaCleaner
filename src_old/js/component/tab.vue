<template>
    <div>
        <tab-bar :active="tabActive">
            <tab-bar-item @tabbar-click="tabBarClick">广告</tab-bar-item>
            <tab-bar-item @tabbar-click="tabBarClick">屏蔽</tab-bar-item>
            <tab-bar-item @tabbar-click="tabBarClick">美化</tab-bar-item>
        </tab-bar>

        <block-ad v-if="tabActive == 0"></block-ad>
        <black-list v-if="tabActive == 1"></black-list>
    </div>
</template>

<script>
    import BlackList from './black-list.vue'
    import BlockAd from './block-ad.vue'
    
    export default {
        data () {
            return {
                tabActive: 0
            }
        },
        methods: {
            tabBarClick (index) {
                this.tabActive = index
            }
        },
        components: { BlackList, BlockAd }
    }
</script>

<style lang="sass" scoped>
    @import "../../css/common";
    @import "../../css/color";
    .vc-tab-bar {
        background: $primary-color;
        .vc-tab-link {
            font-size: 14px;
        }
    }
</style>