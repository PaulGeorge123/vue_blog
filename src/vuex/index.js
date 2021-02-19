// 引入 vue
import Vue from 'vue';
// 引入 vuex
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {  //  这里相当于Vue实例中的data，用于存放数据
        msg: '我是公共的数据，来拿我呀QAQ',
        people: 0
    },
    mutations: { //  这里相当于Vue实例中的methods，用于定义方法 所有的方法都过来拿
        getMsg(state, item) {  // state是个形参 是state对象里面的数据都可以拿到 不通过this来拿
            state.people = item;//第二个参数随意起个名
        }
    },
    getters: {
        // 这里可以监听state的值 直接返回出去 只读取值 如果需要修改值 找mutations  需要return出去
        readMsg(state) {
            return state;
        }
    }
});