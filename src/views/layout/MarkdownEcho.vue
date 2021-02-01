<template>
    <div>
        <div class="container">
            <div class="plugins-tips title">
                YG博客 -- 博客详情
                <el-link type="warning" @click="returnBlogList"><i class="el-icon-back"></i>返回博客列表 </el-link>
            </div>
            <!-- 文章内容块 -->
            <div class="overflows" style="height: 500px">
                <article>
                    <div style="padding:10px" :ishljs="true">
                        <!--                        <h1 class="blog-title" v-text="Blog.title"></h1>-->
                        <!-- 用<mavon-editor>标签显示文章内容 -->
                        <mavon-editor v-html="Blog.html" style="padding:20px;margin-top: 10px;">
                        </mavon-editor>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    import 'mavon-editor/dist/highlightjs/highlight.min.js';
    import 'mavon-editor/dist/katex/katex';
    import {
        queryBlogById
    } from '../../service/api';

    export default {
        name: 'markdownecho',
        data: function() {
            return {
                Blog: {
                    title: '',
                    html: ''
                },
                // 添加Markdown Model
                addMarkdownModel: false,
                //title
                form: {
                    title: ''
                },
                //是否添加图片
                isAddPhotos: false,
                //是否成功
                isSuccess: false
            }
                ;
        },
        components: {
            mavonEditor
        },
        async created() {
            this.username = this.$cookieStore.getCookie('username');
            this.nickname = this.$cookieStore.getCookie('nickname');
            await this.getBlogById();
        },
        methods: {
            // 获取Html
            async getBlogById() {
                let blogId = Number(this.$route.query.blogId);
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let res = await queryBlogById({
                    id: blogId
                });
                //将返回的数据赋值给Blog
                this.Blog.title = res.data.title;
                this.Blog.html = res.data.content;
                loading.close();
            },

            //返回博客列表
            returnBlogList(){
                this.$router.push({ path: '/index' });
            }
        }
    };
</script>
<style scoped>
    .editor-btn {
        margin-top: 20px;
    }

    .overflows {
        overflow-x: scroll;
        white-space: nowrap;

    }

    ::-webkit-scrollbar {
        width: 0 !important;
    }

    ::-webkit-scrollbar {
        width: 0 !important;
        height: 0;
    }

    .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>