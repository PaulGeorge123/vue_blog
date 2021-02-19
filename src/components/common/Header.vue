<template>
    <div>
        <div class="header">
            <div class="header-layout">
                <div class="logo" @click="indexView">
                    <i class="iconfont icon-boke"></i>
                    YG 博客
                </div>
                <!--菜单栏-->
                <div :class="isLogin?'header-body':'header-body2'">
                    <div class="header-menu" v-if="isLogin">
                        <v-menu></v-menu>
                    </div>
                    <div :class="isLogin?'header-input':'header-input2'">
                        <el-input placeholder="请输入所要搜索博客标题" v-model="searchInfo"
                                  class="input-with-select" :clearable="true">
                            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </div>
                </div>
                <div class="header-login">
                    <!-- 用户名下拉菜单 -->
                    <div v-if="isLogin">
                        <i class="el-icon-user"></i>
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{form.username}}
                                 <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided command="userInfo">个人信息</el-dropdown-item>
                                <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <el-button round plain @click="registered" v-if="!isLogin">
                        <i class="iconfont icon-zhuce icon-style"></i>注册
                    </el-button>
                    <el-button round plain @click="openLoginModel" v-if="!isLogin">
                        <i class="iconfont icon-denglu icon-style"></i>登录
                    </el-button>
                </div>
            </div>
        </div>

        <!--登录Model-->
        <el-dialog title="登录" :visible.sync="showModel" width="30%" :show-close="false"
                   :close-on-click-modal="false">
            <div>
                <el-form :rules="rules" ref="form" :model="form" label-width="70px">
                    <el-form-item label="博客号" prop="nickname">
                        <el-input placeholder="请输入博客号" v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="closeLoginModel">取 消</el-button>
                    <el-button type="primary" @click="loginSubmit">确 定</el-button>
                </span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import vMenu from './Menu';
    import bus from '../common/bus';
    import { modifyPassword, oldPasswordToCompare } from '../../service/api';
    import { login } from '../../service/api';

    export default {
        components: {
            vMenu
        },
        data() {
            return {
                rules: {
                    nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
                },
                form: {
                    nickname: '',
                    password: '',
                    //用户名
                    username: ''
                },
                //是否登录
                isLogin: false,
                //是否显示 Menu
                // showMenu: false,
                //登录 Login Model
                showModel: false,
                //搜索内容
                searchInfo: ''
            };
        },
        created() {
            let username = this.$cookieStore.getCookie('username');
            let nickname = this.$cookieStore.getCookie('nickname');
            this.form.username = username;
            this.form.nickname = nickname;
            if (username !== null && username !== '') {
                this.isLogin = true;
            }
            this.setRegular(23);
        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'loginOut') {
                    this.loginOut();
                }
                if (command === 'userInfo') {
                    this.$router.push({ path: '/userInfo' });
                }
            },

            //跳转到登录
            registered() {
                this.$router.push('/registered');
            },

            //打开登录 Login Model
            openLoginModel() {
                this.showModel = true;
            },

            //关闭登录 Login Model
            closeLoginModel() {
                this.showModel = false;
                this.$message({
                    type: 'info',
                    message: '已取消登录',
                    duration: 1500
                });
            },

            //确认登录
            async loginSubmit() {
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let res = await login({
                    nickname: this.form.nickname,
                    password: this.form.password
                });
                loading.close();
                if (res.code === 200) {
                    this.$cookieStore.setCookie('username', res.data.username);
                    this.$cookieStore.setCookie('nickname', res.data.nickname);
                    this.$cookieStore.setCookie('id', res.data.id);
                    this.$message.success(`欢迎${res.data.username}登录YG博客`);
                    this.form.username = res.data.username;
                    this.isLogin = true;
                } else {
                    this.$message({
                        message: '对不起，用户名或密码输入错误',
                        type: 'danger'
                    });
                }
                this.showModel = false;
            },

            // 退出登录
            loginOut() {
                this.$confirm('注销账号,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    center: true
                }).then(() => {
                    let loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$cookieStore.removeCookie('username');
                    this.$cookieStore.removeCookie('nickname');
                    this.$cookieStore.removeCookie('id');
                    this.isLogin = false;
                    loading.close();
                    this.indexView();
                    this.$message({
                        type: 'success',
                        message: '注销账号成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消注销账号'
                    });
                });
            },

            //首页
            indexView() {
                this.$router.push({ path: '/index' });
            },

            //搜索
            search() {
                //$emit这个方法会触发一个事件
                bus.$emit('searchInfo', this.searchInfo);
            },

            /*
              定时清除cookie
              入参是目标时间的小时数，取值0-23，当然可以根据需要拓展成分钟数，这里主要是提供思路所以从简
             */
            setRegular(targetHour) {
                let timeInterval, nowTime, nowSeconds, targetSeconds;
                nowTime = new Date();
                // 计算当前时间的秒数
                nowSeconds = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds();
                // 计算目标时间对应的秒数
                targetSeconds = targetHour * 3600;
                //  判断是否已超过今日目标小时，若超过，时间间隔设置为距离明天目标小时的距离
                timeInterval = targetSeconds > nowSeconds ? targetSeconds - nowSeconds : targetSeconds + 24 * 3600 - nowSeconds;
                setTimeout(this.removeCookie, timeInterval * 1000);
            },

            //清除cookie
            removeCookie() {
                // let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                // if(keys) {
                //     for(let i = keys.length; i--;)
                //         document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                // }
                this.$cookieStore.removeCookie('username');
                this.$cookieStore.removeCookie('nickname');
                this.$cookieStore.removeCookie('id');
                this.indexView();
                setTimeout(this.removeCookie, 24 * 3600 * 1000);//之后每天调用一次
            }
        },
        mounted() {

        }
    };
</script>
<style scoped lang="scss">

    @mixin flex($flex-direction,$justify-content,$align-items) {
        display: flex;
        flex-direction: $flex-direction;
        justify-content: $justify-content;
        align-items: $align-items;
    }

    .header {
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        color: #fff;
        padding-left: 20px;
        background: #409EFF;
    }

    .header-layout {
        @include flex(row, space-between, center);
    }

    .logo {
        width: 150px;
        line-height: 60px;
        cursor: pointer; /*鼠标悬停变小手*/
        font-size: 23px;
    }

    .header-login {
        margin-right: 25px;
        display: flex;
        align-items: center;
    }

    .header-menu {
        width: 30%;
        margin-left: 10px;
    }

    .header-input {
        width: 50%;
        margin-right: 80px;
    }

    .header-input2 {
        width: 50%;
    }

    .header-body {
        @include flex(row, flex-start, center);
        width: 80%;
    }

    .header-body2 {
        @include flex(row, center, center);
        width: 80%;
    }

    .dialog-footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .user-name {
        margin-left: 10px;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .icon-boke {
        font-size: 28px;
    }

    .icon-style {
        margin-right: 5px;
    }

    .icon-zhuce {
        font-size: small;
    }

    .icon-denglu {
        font-size: small;
    }
</style>
