<template>
    <div class="flex-col">
        <div class="nav-info">
            <div class="flex-user-avatar">
                <el-avatar :size="60" src="" @error="errorHandler">
                    <!--                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :alt="userInfo.username"/>-->
                </el-avatar>
            </div>
            <div class="flex-user-info">
                <div class="name"><h5>用户号: {{userInfo.nickname}}</h5></div>
                <div><h5>用户名: {{userInfo.username}}</h5></div>
            </div>
        </div>
        <div class="content-info">
            <div class="user-width">
                <h4>基本信息:</h4>
            </div>
            <div class="user-password">
                <span>是否修改密码?</span>
                <el-switch
                        v-model="switchVal"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="修改"
                        inactive-text="不修改"
                        @change="changeSwitch(switchVal)">
                </el-switch>
            </div>
            <div>
                <el-form :model="userInfo" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item :label="isShowPassword?'原密码':'密码'" prop="password">
                        <el-input type="password" v-model="userInfo.password" :disabled="!isShowPassword"
                                  autocomplete="off" show-password :clearable="true"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="newPassword" v-show="isShowPassword">
                        <el-input type="password" v-model="userInfo.newPassword"
                                  autocomplete="off" show-password :clearable="true"></el-input>
                    </el-form-item>
                    <el-form-item label="权限" prop="role">
                        <el-input :value="userInfo.role === 'admin'?'管理员':'用户'" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-input :value="userInfo.gender === 1 ?'男':'女'" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="更新时间" prop="datetimes">
                        <el-input :value="userInfo.datetime | formatDate" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="submit-style" v-show="isShowPassword">
                        <el-button type="primary" @click="passwordToCompare" :disabled="!isShowSubmit">提交</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        queryUserById, modifyPassword, oldPasswordToCompare
    } from '../../service/api';

    export default {
        name: 'userInfo',
        data() {
            return {
                rules: {
                    password: [
                        { required: true, message: '请输入原始密码', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ]
                },
                userInfo: {
                    username: '',
                    nickname: '',
                    userId: 0,
                    role: '',
                    gender: '',
                    datetimes: '',
                    password: '',
                    newPassword: '',
                    alwayPass: ''
                },
                switchVal: '',
                isShowPassword: false,
                isShowSubmit: false
            };
        },
        async created() {
            this.userInfo.username = this.$cookieStore.getCookie('username');
            this.userInfo.nickname = this.$cookieStore.getCookie('nickname');
            this.userInfo.userId = this.$cookieStore.getCookie('id');
            await this.getUserInfo();
        },
        methods: {
            errorHandler() {
                return true;
            },

            //获取用户信息
            async getUserInfo() {
                let userId = this.userInfo.userId;
                let res = await queryUserById({
                    id: userId
                });
                this.userInfo.gender = res.data.gender;
                this.userInfo.role = res.data.role;
                this.userInfo.datetimes = res.data.datetimes;
                this.userInfo.password = res.data.password;
                this.userInfo.alwayPass = res.data.password;
            },

            //重置密码
            reset() {
                this.userInfo.password = '';
                this.userInfo.newPassword = '';
            }, //是否修改密码
            changeSwitch(switchVal) {
                this.isShowPassword = switchVal !== 0;
                if (switchVal === 0) {
                    this.userInfo.password = this.userInfo.alwayPass;
                }
            },

            //与原始密码比较
            async passwordToCompare() {
                let res = await oldPasswordToCompare({
                    oldPassword: this.userInfo.password,
                    nickName: this.userInfo.nickname
                });
                if (res.code === 200) {
                    if (res.data === false) {
                        this.$message({
                            type: 'error',
                            message: '原密码输入错误',
                            duration: 1000
                        });
                    } else {
                        this.openModifyPassword();
                    }
                }
            },

            //修改密码
            async openModifyPassword() {
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let res = await modifyPassword({
                    nickName: this.userInfo.nickname,
                    newPassword: this.userInfo.newPassword
                });
                loading.close();
                if (res.code === 200) {
                    if (res.data.password !== null && res.data.password !== '') {
                        this.userInfo.newPassword = '';
                        this.userInfo.password = res.data.password;
                        this.isShowPassword = false;
                        this.switchVal = 0;
                        this.$message.success({
                            message: '新密码更新成功',
                            duration: 1000
                        });
                    } else {
                        this.isShowPassword = false;
                        this.$message({
                            type: 'error',
                            message: '新密码更新错误',
                            duration: 1000
                        });
                    }
                }
            }
        },
        watch: {
            'userInfo.newPassword'(newVal) {
                this.isShowSubmit = newVal !== '';
            }
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

    @mixin flex-two($flex-direction,$justify-content) {
        display: flex;
        flex-direction: $flex-direction;
        justify-content: $justify-content;
    }

    @mixin flex-column {
        display: flex;
        flex-direction: column;
    }

    @mixin box-shadow-style {
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .flex-col {
        @include flex-column;
        height: calc(100vh - 60px);
    }

    .nav-info {
        @include flex(row, space-between, center);
        @include box-shadow-style;
        align-items: center;
        height: 15%;
        margin: 10px 0;
    }

    .content-info {
        @include flex-two(column, flex-start);
        @include box-shadow-style;
        width: 100%;
        padding-top: 20px;
        height: 60%;
        margin: 5px 0;
    }

    .flex-user-avatar {
        @include flex(row, center, center);
        width: 20%;
    }

    .flex-user-info {
        width: 80%;
    }

    .name {
        margin-bottom: 5px;
    }

    .user-width {
        margin-left: 70px;
        margin-bottom: 20px;
    }

    .demo-ruleForm {
        margin-left: 30px;
        width: 85%;
    }

    .submit-style {
        @include flex-two(row, flex-end);
    }

    .user-password {
        @include flex(row, flex-start, flex-end);
        margin-left: 70px;

        span {
            margin-right: 15px;
        }

        margin-bottom: 15px;
    }
</style>