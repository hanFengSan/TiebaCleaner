import Vue from 'vue'
import VueCarbon from 'vue-carbon'
import 'vue-carbon/dist/vue-carbon.css' // 加载css文件
import '../css/fix.scss'
import app from './component/app.vue'

Vue.use(VueCarbon)

var vm = new Vue({
    el: 'body',
    data: {},
    methods: {},
    components: { app }
})