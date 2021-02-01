import Api from './index';

/**
 * 用户 User API
 * @param reqData
 * @returns {AxiosPromise<any>}
 */

//登录
export async function login(reqData) {
    return Api.login(reqData);
}

//与原始密码比较
export async function oldPasswordToCompare(reqData) {
    return Api.oldPasswordToCompare(reqData);
}

//修改密码
export async function modifyPassword(reqData) {
    return Api.modifyPassword(reqData);
}


/**
 * 博客 Blog API
 * @param reqData
 * @returns {AxiosPromise<any>}
 */
//上传md文件
export async function uploadMarkdownFile(reqData) {
    return Api.postMd(reqData);
}

//上传图片
export async function uploadPhotoFile(reqData) {
    return Api.uploadFile(reqData);
}

//MongoDB 查询ID
export async function queryBlogById(reqData) {
    return Api.queryBlogById(reqData);
}

//MongoDB 查询所有
export async function queryBlogAllList() {
    return Api.queryBlogAllList();
}