<template>
    <div class="all">
        <div class="registered">
            <div class="user-info">
                <h4>注册信息:</h4>
            </div>
            <el-form :model="userInfo" status-icon :rules="rules" ref="userInfo" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="用户号" prop="nickname">
                    <el-input v-model="userInfo.nickname" :clearable="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username" :clearable="true"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userInfo.password"
                              autocomplete="off" show-password :clearable="true"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="userInfo.gender" placeholder="请选性别" style="width: 100%;">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限" prop="role">
                    <el-input value="用户" disabled></el-input>
                </el-form-item>
                <el-form-item class="submit-style">
                    <el-button type="primary" @click="saveUser">提交</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
            <el-tooltip placement="top" content="返回首页">
                <div class="el-backtop" style="right: 40px; bottom: 40px;" visibility-height="600"
                     @click="topBlog"><i class="el-icon-back"></i></div>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import {
        saveUser
    } from '../service/api';

    export default {
        name: 'Registered',
        data() {
            return {
                rules: {
                    nickname: [{ required: true, message: '请输入用户号', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    username: [{ required: true, message: '请输入您的姓名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    // gender: [{ required: true, message: '请选择您的性别', trigger: 'change' }]
                },
                userInfo: {
                    username: '',
                    nickname: '',
                    role: '',
                    gender: '',
                    password: ''
                },
                isShowPassword: false,
                isShowSubmit: false
            };
        },
        methods: {
            //提交表单
            async saveUser() {
                let res = await saveUser({
                    nickname: this.userInfo.nickname,
                    username: this.userInfo.username,
                    role: 'user',
                    gender: this.userInfo.gender,
                    password: this.userInfo.password
                });
                if (res.data === 1) {
                    this.$refs.userInfo.resetFields();
                    this.$router.push('/index');
                    this.$message({
                        message: '恭喜你，注册成功',
                        type: 'success',
                        duration: 1500
                    });
                } else {
                    this.$refs.userInfo.resetFields();
                    //添加user失败
                    this.$message({
                        type: 'error',
                        message: '不好意思，注册失败',
                        duration: 1500
                    });
                }
            },

            //重置表单
            reset() {
                this.$refs.userInfo.resetFields();
            },

            //返回主页
            topBlog(){
                this.$router.push('/index');
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

    @mixin div-style {
        width: 100%;
        height: 70%;
    }

    @mixin box-shadow-style {
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .all {
        width: 100%;
        height: calc(100vh - 60px);
    }

    .registered {
        @include flex(column, flex-start, center);
        @include div-style;
        @include box-shadow-style;
        margin-top: 30px;
    }

    .demo-ruleForm {
        margin-left: 30px;
        width: 85%;
    }

    .user-info {
        @include flex(row, center, center);
        height: 30%;
    }

    .submit-style {
        @include flex(row, flex-end, center);
    }
</style>