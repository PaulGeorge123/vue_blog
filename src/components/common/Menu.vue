<template>
    <div class="menu">
        <div class="header-link">
            <el-link style="color: white" @click="handleCommand('addBlog')">编写博客</el-link>
        </div>
        <div class="header-link">
            <el-link style="color: white" @click="handleCommand('myblog')">我的博客</el-link>
        </div>
        <div>
            <el-link style="color: white" @click="handleCommand('wechat')">聊天chat</el-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        data() {
            return {
                isActive: true
            };
        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'addBlog') {
                    this.$router.push('/markdown');
                }
                else if (command === 'myblog') {
                    this.$router.push('/myblog');
                }
                else if (command === 'wechat'){
                    this.$router.push('/wechat');
                }
            },

            go() {
                console.log('event');
            }
        }
    };
</script>

<style scoped>
    .header-link {
        margin-right: 15px;
    }

    .menu {
        /*margin-top: 5px;*/
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        color: white;
        height: 60px;
    }
</style>