import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
export default new Router({
    mode: 'history',
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
                },
                {
                    // markdown 我的博客
                    path: '/blog/myblog',
                    component: () => import('../views/layout/MyBlog.vue'),
                    meta: { title: '我的博客' }
                },
                {
                    // 个人主页
                    path: '/userInfo',
                    component: () => import('../views/layout/userInfo.vue'),
                    meta: { title: '个人主页' }
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
