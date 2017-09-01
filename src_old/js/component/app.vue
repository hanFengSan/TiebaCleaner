<template>
    <div class="body-container">
            <app-header></app-header>
            <tab></tab>
            <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from './header.vue'
    import AppFooter from './footer.vue'
    import Tab from './tab.vue'

    export default {
        data() {
            return {}
        },
        components: {
            AppHeader,
            AppFooter,
            Tab
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../css/color";
    @import "../../css/common";
    .body-container {
        width: 300px;
        .text-center {
            text-align: center;
        }
    }
</style>