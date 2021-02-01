<template>
    <div class="block">
        <!--        <span class="demonstration">大于 7 页时的效果</span>-->
        <el-pagination
                layout="prev, pager, next"
                :total="1">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'Footer'
    };
</script>

<style scoped>
    .block {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 65px;
        padding-top: 15px;
    }
</style>