<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="layout-main">
            <div class="contents">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vTags from './Tags.vue';
    import vFooter from './Footer.vue';
    import bus from './bus';

    export default {
        data() {
            return {
                tagsList: [],
                collapse: false
            };
        },
        components: {
            vHead,
            vTags,
            vFooter
        },
        created() {
        }
    };
</script>

<style>
    .layout-main {
        width: 100%;
        height: calc(100vh - 60px);
        /*padding: 10px;*/
        /*overflow-y: scroll;*/
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .contents {
        width: 60%;
        height: 100%;
    }
</style>
