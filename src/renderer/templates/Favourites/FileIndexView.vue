<template>
    <div id="list">
        <div id="bucket-list" style="background:#eee">
            <Card :bordered="false">
                <p slot="title">Buckets</p>
                <div class="demo-bucket-list" v-for="item in defaultList">
                    <Icon type="ios-folder" size="50"></Icon>
                </div>
            </Card>
        </div>
        <div id="file-list" style="background:#eee">
            <Card :bordered="false">
                <p slot="title">Files</p>
                <div class="demo-bucket-list" v-for="item in defaultList">
                    <Icon type="ios-folder" size="50"></Icon>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
const { Environment } = require('storj');
const storj = new Environment({
    bridgeUrl: 'https://api.storj.io',
    bridgeUser: 'gencodettt@gmail.com',
    bridgePass: 'lab@12345',
    encryptionKey: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
    logLevel: 0
});
const buckets = storj.getBuckets(function(err, result) {
    if (err) {
        return console.error('get-buckets error:', err);
    }
    console.log('getbuckets', result);
    return result
})

export default {
    data() {
        return {
            defaultList: [
                {
                    id: "1"
                }, {
                    id: "2"
                }
            ]
        }
    }
}
</script>
<style>
.demo-bucket-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}
</style>