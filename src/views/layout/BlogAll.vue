<template>
    <div>
        <div class="tips">
            <i class="iconfont icon-boke1-copy"></i>YG博客 -- 博客列表
        </div>

        <!-- 文章内容块 -->
        <div class="overflows" style="height: 530px" v-if="blogList.length>0">
            <el-card class="box-card" v-for="(item,index) in blogList" :key="item.id">
                <div slot="header" class="layout">
                    <div>
                        <h3>{{item.title}}</h3>
                    </div>
                    <el-button type="primary" plain @click="moreBlogDetails(item.id)">展开全文 >></el-button>
                </div>
                <div class="blogMore">
                    <el-link type="warning" @click="moreBlogDetails(item.id)"> more >></el-link>
                    <br/>
                    <div class="tagTime">
                        <el-tag>类别: {{item.category}}</el-tag>
                        <el-tag type="success" class="ma-left-1">创建时间: {{item.datetime | formatDate}}</el-tag>
                        <el-tag type="warning" class="ma-left-1">作者: {{item.author}}</el-tag>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="overflows no-data" v-else>
            <i class="iconfont icon-zanwushuju"></i>
            <span>暂无数据</span>
        </div>
        <div class="footer" v-if="blogList.length>0">
            <el-pagination
                    :page-size="query.pageSize"
                    :pager-count="11"
                    :current-page="query.pageIndex"
                    layout="total,prev, pager, next"
                    :total="query.pageTotal"
                    @current-change="handlePageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import vFooter from '../../components/common/Footer.vue';
    import bus from '../../components/common/bus';
    import {
        queryBlogAllList, queryByTitleBlogList
    } from '../../service/api';

    export default {
        name: 'blogall',
        components: { vFooter },
        data() {
            return {
                blogList: [],
                blog: {
                    attention: 1,
                    author: '',
                    browse: 0,
                    category: '',
                    collection: 0,
                    content: '',
                    datetime: '',
                    id: 0,
                    thumb_up: 0,
                    title: ''
                },
                //分页 query
                query: {
                    //当前页 index
                    pageIndex: 1,
                    //每页的数量
                    pageSize: 5,
                    //总记录数
                    pageTotal: 0
                }
            };
        },
        async created() {
            await this.getBlogAllList();
            await this.getSearchInfo();
        },
        methods: {
            //获取所有Blog
            async getBlogAllList() {
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let res = await queryBlogAllList({
                    pageNum: this.query.pageIndex,
                    pageSize: this.query.pageSize
                });
                this.blogList = res.data.list;
                this.query.pageSize = res.data.pageSize;
                this.query.pageTotal = res.data.total;
                loading.close();
            },

            //查看博客详情
            moreBlogDetails(id) {
                this.$router.push({
                    path: '/markdownecho',
                    query: {
                        blogId: id
                    }
                });
            },

            //获取搜索信息
            getSearchInfo() {
                bus.$on('searchInfo', res => {
                    this.$router.push({ path: '/index' });
                    this.getSearchBlog(res);
                });
            },

            //搜索符合条件的博客
            async getSearchBlog(searchInfo) {
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let res = await queryByTitleBlogList({
                    title: searchInfo,
                    pageNum: this.query.pageIndex,
                    pageSize: this.query.pageSize
                });
                this.blogList = res.data.list;
                this.query.pageSize = res.data.pageSize;
                this.query.pageTotal = res.data.total;
                loading.close();
            },

            // 分页导航
            handlePageChange(val) {
                this.query.pageIndex = val;
                this.getBlogAllList();
            },
        }
    };
</script>

<style scoped>
    .tips {
        background: #DCDFE6;
        padding: 10px 15px;
        margin-top: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .footer {
        margin-top: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 35px;
        background: white;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .layout {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .blogMore {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .tagTime {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .box-card {
        /*width: 100%;*/
        margin-top: 20px;
        padding-left: 20px;
    }

    .overflows {
        overflow-x: scroll;
        white-space: nowrap;
    }

    .ma-left-1 {
        margin-left: 10px;
    }

    ::-webkit-scrollbar {
        width: 0 !important;
    }

    ::-webkit-scrollbar {
        width: 0 !important;
        height: 0;
    }

    .icon-boke1-copy {
        /*color: blue;*/
        font-size: 30px;
        margin-right: 10px;
    }

    .icon-GroupCopy {
        /*color: #409EFF;*/
        margin-right: 1px;
    }


    .no-data {
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .icon-zanwushuju {
        color: #8c939d;
        font-size: 65px;
        margin-bottom: 5px;
    }
</style>