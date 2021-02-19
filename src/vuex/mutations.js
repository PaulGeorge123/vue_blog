/**
 * 步骤四
 * 突变(处理状态改变)
 */
import {
    APPROVAL_HISTORY_PARAMS // 审批历史参数
} from './types'

// 引入 getters
import getters from './getters'

// 定义、初始化数据
const state = {
    approvalHistoryParams:{}
};

// 定义 mutations
const mutations = {
    // 匹配actions通过commit传过来的值,并改变state上的属性的值
    // 审批历史页 请求参数
    [APPROVAL_HISTORY_PARAMS](state, res){
        state.approvalHistoryParams = res;   //state.数据名 = data
    }
};

// 导出
export default {
    state,
    mutations,
    getters
}