import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './views/app.popup.vue';
import MuseUI from 'muse-ui';
import './views/styles/muse-ui/index.less';
import 'material-design-icons';

Vue.use(VueResource);
Vue.use(MuseUI);

/* eslint-disable no-unused-vars */
const app = new Vue({
    render: (h) => h(App)
}).$mount('#app');
