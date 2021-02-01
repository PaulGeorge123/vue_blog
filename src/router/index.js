import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import('../components/common/Layout.vue'),
            meta: { title: 'layout' },
            children: [
                {
                    // markdown 博客回显
                    path: '/index',
                    component: () => import('../views/layout/BlogAll.vue'),
                    meta: { title: 'YG博客' }
                },
                {
                    // markdown组件
                    path: '/blog/markdown',
                    component: () => import('../views/layout/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // markdown 博客回显
                    path: '/blog/markdownecho',
                    component: () => import('../views/layout/MarkdownEcho.vue'),
                    meta: { title: '博客回显' }
                }
            ]
        },
        {
            path: '/*',
            component: () => import('../views/404.vue'),
            meta: { title: '404' }
        }
    ]
});
