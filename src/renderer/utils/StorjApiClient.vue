<script type="text/javascript">

const {Environment} = require('storj');
const storj = new Environment({
    bridgeUrl: 'https://api.storj.io',
    bridgeUser: 'gencodettt@gmail.com',
    bridgePass: 'lab@12345',
    encryptionKey: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
    logLevel: 0
});

/* 创建Bucket */
function createBucket(bucketName) {
    storj.createBucket(bucketName, function(err, result) {
        if (err) {
            console.error('create-bucket-info: ' + err);
        } else {
            console.log('create-bucket-info:', result);
        }
    });
}

/* 获取Buckets */
function getBuckets() {
    storj.getBuckets(function (err, result) {
        if(err) {
            console.error('get-buckets error: ' + err);
        } else {
            console.log('get-buckets: ' + result);
        }
    });
}

/* 删除Bucket */
function deleteBucket(bucketName) {
    storj.getBuckets(function (err, result) {
        if(err) {
            console.error('delete-bucket-get error: ' + err);
        } else {
            var bucketIndex;
            for (bucketIndex in result) {
                if(result[bucketIndex].name === bucketName) {
                    storj.deleteBucket(result[bucketIndex].id,function (err,result) {
                        if(err){
                            console.error('delete-bucket error: ' + err);
                        } else {
                            console.log('delete-bucket:',result);
                        }
                    });
                }
            }
        }
    });
}

export default {
    createBucket,
    getBuckets,
    deleteBucket
}
</script>