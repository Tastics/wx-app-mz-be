import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index-page',
            redirect: '/typing/index'
        },
        {
            path: '/typing/index',
            name: 'typing-index',
            component: resolve => require(['@/components/typing/index.vue'], resolve)
        }
    ]
})
