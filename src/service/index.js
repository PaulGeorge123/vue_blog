import Axios from './request';
import qs from 'qs';

export default {

    /**
     * 用户 User API
     * @param reqData
     * @returns {AxiosPromise<any>}
     */

    //登录验证
    login(reqData) {
        return Axios.post('/api/login', qs.stringify(reqData));
    },

    //与原始密码比较
    oldPasswordToCompare(reqData) {
        return Axios.post('/api/oldPasswordToCompare', qs.stringify(reqData));
    },

    //修改密码
    modifyPassword(reqData) {
        return Axios.post('/api/modifyPassword', qs.stringify(reqData));
    },

    //根据id查询用户
    queryUserById(reqData) {
        return Axios.get('/api/user/queryUserById', { params: reqData });
    },

    /**
     * 博客 Blog API
     * @param reqData
     * @returns {AxiosPromise<any>}
     */
    //
    // deleteBlogCover(id, reqData) {
    //     return Axios.post(`/krryblog/blog/deleteBlogCover/${id}`, qs.stringify(reqData));
    // },

    //上传md文件
    postMd(reqData) {
        return Axios.post(`/api/upload/saveMd`, reqData);
    },

    //上传图片
    uploadFile(reqData) {
        return Axios.post(`/api/upload/setFileUpload`, reqData);
    },

    //MongoDB 查询ID
    queryBlogById(reqData) {
        return Axios.get(`/api/mongodb/queryBlogById`, { params: reqData });
    },

    //MongoDB 查询所有blog
    queryBlogAllList() {
        return Axios.get(`/api/mongodb/queryBlogAllList`);
    },

    //MongoDB 精准查询（作者）
    queryByAuthorBlogList(reqData) {
        return Axios.get(`/api/mongodb/queryByAuthorBlogList`, { params: reqData });
    },

    //MongoDB 模糊查询博客
    queryFuzzyBlog(reqData) {
        return Axios.post(`/api/mongodb/queryFuzzyBlogList`, reqData);
    },

    //MongoDB 模糊查询title
    queryByTitleBlogList(reqData) {
        return Axios.post(`/api/mongodb/queryByTitleBlogList`, qs.stringify(reqData));
    },
};