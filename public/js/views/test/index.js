/**
 * Created by cendawei on 2017/4/17.
 */
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import dateFormat from '@/filters/dateFormat'

Vue.config.productionTip = false

// 全局过滤器
Vue.filter('dateFormat', dateFormat)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

