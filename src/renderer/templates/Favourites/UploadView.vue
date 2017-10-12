<style scoped>
</style>

<template>
    <div>
        <Button type="primary" @click="createBucket()">创建Bucket</Button>
        <Button type="primary" @click="deleteBucket()">删除Bucket</Button>
    </div>
</template>

<script>
    import STROJ_CLIENT from '../../utils/StorjApiClient'
    export default {
        data() {
            return {
                bucketName: 'test-bucket-for-genaro1234'
            }
        },
        methods: {
            createBucket() {
                STROJ_CLIENT.createBucket(this.bucketName);
            },
            deleteBucket() {
                STROJ_CLIENT.deleteBucket(this.bucketName); 
            }
        }
    }
</script>