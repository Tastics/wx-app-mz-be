import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index-page',
            redirect: '/test/index'
        },
        {
            path: '/test/index',
            name: 'test-index',
            component: resolve => require(['@/components/test/test-index.vue'], resolve)
        }
    ]
})
