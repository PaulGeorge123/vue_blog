<template>
    <div>
        <div class="container">
            <div class="plugins-tips title">
                <div class="bk">
                    <span>YG博客 -- 博客详情</span>
                    <el-tag class="el-tag-style">作者:{{Blog.author}}</el-tag>
                    <el-tag class="el-tag-style" type="warning">类别:{{Blog.category}}</el-tag>
                    <el-tag class="el-tag-style" type="success">时间: {{Blog.datetime | formatDate}}</el-tag>
                </div>
                <el-link type="warning" @click="returnBlogList" :underline="false">
                    <i class="el-icon-back"></i>返回博客列表
                </el-link>
            </div>
            <!-- 文章内容块 -->
            <div class="overflows" style="height: 530px">
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
                    html: '',
                    author: '',
                    datetime: '',
                    category: ''
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
                this.Blog.author = res.data.author;
                this.Blog.datetime = res.data.datetime;
                this.Blog.category = res.data.category;
                loading.close();
            },

            //返回博客列表
            returnBlogList() {
                this.$router.push({ path: '/index' });
            }
        }
    };
</script>
<style scoped>
    .container {
        margin-top: 10px;
        padding: 20px 30px 20px 30px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .plugins-tips {
        /*padding: 20px 10px;*/
        margin-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
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
        border-radius: 5px;
    }

    .bk {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .el-tag-style {
        margin-left: 10px;
    }
</style>