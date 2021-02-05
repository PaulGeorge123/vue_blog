import Vue from 'vue';
import Router from 'vue-router';
import { getCookie } from '../utils/cookie';

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
let router = new Router({
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
                    path: '/markdown',
                    component: () => import('../views/layout/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // markdown 博客回显
                    path: '/markdownecho',
                    component: () => import('../views/layout/MarkdownEcho.vue'),
                    meta: { title: '博客回显' }
                },
                {
                    // markdown 我的博客
                    path: '/myblog',
                    component: () => import('../views/layout/MyBlog.vue'),
                    meta: { title: '我的博客' }
                },
                {
                    // 个人主页
                    path: '/userInfo',
                    component: () => import('../views/layout/userInfo.vue'),
                    meta: { title: '个人主页' }
                },
                {
                    // 注册
                    path: '/registered',
                    component: () => import('../views/Registered.vue'),
                    meta: { title: '注册' }
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

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title}`;
//     const username = getCookie('username');
//     console.log(username === '');
//     if (username === '') {
//         next({
//             path: '/index',
//             query: {
//                 redirect: to.fullPath
//             }
//         });
//
//     } else {
//         next();
//     }
//     next();
// });

export default router;