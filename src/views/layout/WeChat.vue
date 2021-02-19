<template>
    <div class="flex-col">
        <div class="nav-info">
            <div class="cone-socket">
                <el-input
                        placeholder="请输入自己的昵称"
                        prefix-icon="el-icon-user-solid"
                        v-model="name"
                        style="width:70%"
                ></el-input>
                <el-button type="primary" class="send-btn" @click="conectWebSocket()">建立连接</el-button>
                <el-button type="danger">断开连接</el-button>
            </div>
            <div class="phone-socket">
                <el-input
                        placeholder="请输入对方频道号"
                        prefix-icon="el-icon-phone"
                        v-model="aisle"
                        style="width:85%"
                        @blur="animateWidth('company_name','blur')"
                        @focus="animateWidth('company_name','focus')"
                ></el-input>
            </div>
        </div>
        <div class="content-info">
            <div class="message overflows">
                <div v-for="(value,key,index) in messageList" :key="index">
                    <div class="chat-me" v-if="value.name===name">
                        <el-tag type="success" style="float:right">我：{{value.msg}}</el-tag>
                        <div class="chat-avatar-me">
                            <el-avatar shape="square" size="small" :src="squareUrl"></el-avatar>
                        </div>
                    </div>
                    <div class="chat-nome" v-if="value.name!==name">
                        <div class="chat-avatar-nome">
                            <el-avatar shape="square" size="small" :src="squareUrl"></el-avatar>
                        </div>
                        <el-tag style="float:left">{{value.name}}：{{value.msg}}</el-tag>
                    </div>
                </div>
            </div>
            <div class="send-info">
                <el-input
                        placeholder="请输入要发送的消息"
                        prefix-icon="el-icon-s-promotion"
                        v-model="messageValue"
                        style="width:100%"
                ></el-input>
                <el-button type="primary" class="send-btn" @click="sendMessage()">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WeChat',
        data() {
            return {
                name: '', // 昵称
                websocket: null, // WebSocket对象
                aisle: '', // 对方频道号
                messageList: [], // 消息列表
                messageValue: '', // 消息内容
                people: 0, // 在线人数
                companyName: {
                    animate: false
                },
                squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
            };
        },
        //在计算属性中取值,js直接这样写拿到值,html用直接xxx使用
        computed: {
            // peopleNum() {
            //     return this.store.state.people;
            // }
        },
        methods: {
            // 失去焦点和得到焦点的验证方法，name为要验证的字段名,type为blur或focus
            animateWidth(name, type) {
                let numReg = /^[0-9]*$/;
                let numRe = new RegExp(numReg);
                if (name === 'company_name') {
                    if (type === 'blur') {
                        this.companyName.animate = false;
                        if (!numRe.test(this.aisle)) {
                            this.$message({
                                type: 'warning',
                                message: '请输入数字 ',
                                duration: 1000,
                                showClose: true
                            });
                        }
                    } else {
                        this.companyName.animate = true;
                    }
                }
            },

            //建立连接
            conectWebSocket: function() {
                console.log('建立连接');
                if (this.name === '') {
                    this.$alert('请输入自己的昵称', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                } else {
                    //判断当前浏览器是否支持WebSocket
                    if ('WebSocket' in window) {
                        this.websocket = new WebSocket(
                            'ws://localhost:8090/websocket/' + this.name
                        );
                    } else {
                        alert('不支持建立socket连接');
                    }
                    //连接发生错误的回调方法
                    this.websocket.onerror = () => {
                        this.$message({
                            type: 'error',
                            message: '不好意思，连接失败',
                            duration: 1500
                        });
                    };
                    //连接成功建立的回调方法
                    this.websocket.onopen = () => {
                        this.$message({
                            message: '连接成功',
                            type: 'success',
                            duration: 1000
                        });
                    };
                    //接收到消息的回调方法
                    this.websocket.onmessage = (event) => {
                        let object = eval('(' + event.data + ')');
                        console.log(object);
                        if (object.type === 0) {
                            // 提示连接成功
                            console.log('连接成功');
                            this.people = object.people;
                            this.showInfo(object.people,object.aisle);
                        }
                        if (object.type === 1) {
                            //显示消息
                            console.log('接受消息');
                            this.messageList.push(object);
                        }
                    };
                    //连接关闭的回调方法
                    this.websocket.onclose = () => {
                        this.$message({
                            message: '连接关闭',
                            type: 'error',
                            duration: 1000
                        });
                    };
                    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                    window.onbeforeunload = () => {
                        this.websocket.close();
                    };
                }
            },

            //断开连接
            // websocketClose(){
            //   this.conectWebSocket(onclose);
            // },

            // 发送消息
            sendMessage: function() {
                let socketMsg = { msg: this.messageValue, toUser: this.aisle };
                if (this.aisle === '') {
                    //群聊.
                    socketMsg.type = 0;
                } else {
                    //单聊.
                    socketMsg.type = 1;
                }
                this.websocket.send(JSON.stringify(socketMsg));
                this.messageValue = '';
            },

            //房间号提示
            showInfo: function(people,aisle) {
                this.$notify({
                    type: 'success',
                    showClose: false,
                    title: '当前在线人数：' + people,
                    message: '您的频道号：' + aisle,
                    duration: 0,
                    offset: 60
                });
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
        height: 10%;
        margin: 10px 0;
        padding-right: 10px;
        padding-left: 15px;
    }

    .content-info {
        @include flex(column, flex-start, center);
        @include box-shadow-style;
        width: 100%;
        padding-top: 20px;
        height: 82%;
        margin: 5px 0;
    }

    .message {
        width: 95%;
        /*height: 85%;*/
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        padding: 15px;
    }

    .send-info {
        @include flex(row, flex-end, center);
        height: 15%;
        width: 95%;
    }

    .send-btn {
        margin-left: 5px;
    }

    .cone-socket {
        width: 70%;
    }

    .chat-me {
        @include flex(row, flex-end, center);
    }

    .chat-nome {
        @include flex(row, flex-start, center);
    }

    .chat-avatar-me {
        margin-top: 5px;
        margin-left: 5px;
    }

    .chat-avatar-nome {
        margin-top: 5px;
        margin-right: 5px;
    }

    .overflows {
        height: 500px;
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

</style>