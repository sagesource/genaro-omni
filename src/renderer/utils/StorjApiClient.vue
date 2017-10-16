<script type="text/javascript">
import iView from 'iview';
import store from '../store'

const {Environment} = require('storj');
const storjApiUrl = 'https://api.storj.io';

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

/* 获取bucket列表 */
function getBucketList(bridgeUser, bridgePass, errorCallback, successCallback) {
    var _storj = getStorj(bridgeUser, bridgePass);
    _storj.getBuckets(function (err, result) {
        if(err) {
            errorCallback(err)
        } else {
            successCallback(result)
        }
    });
}

/* 上传文件 */
function uploadFile(file, bucketId, bridgeUser, bridgePass, errorCallback, successCallback, progressCallback) {
    var _storj = getStorj(bridgeUser, bridgePass);
    _storj.storeFile(bucketId, file.path, {
        filename: file.name,
        progressCallback: function (progress, uploadedBytes, totalBytes) {
            progressCallback(progress, uploadedBytes, totalBytes)
            console.log('Progress: %d, uploadedBytes: %d, totalBytes: %d', progress, uploadedBytes, totalBytes);
        },
        finishedCallback: function (err, fileId) {
            if(err) {
                errorCallback(err)
                return console.error('upload-file error: ' + err + ' filename=' + file.name);
            }
            console.log('File upload complete:', fileId);
            successCallback()
        }
    });
}

/* 获取Storj连接 */
function getStorj(bridgeUser, bridgePass) {
    var _storj = new Environment({
        bridgeUrl: storjApiUrl,
        bridgeUser: bridgeUser,
        bridgePass: bridgePass,
        encryptionKey: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
        logLevel: 0
    });
    return _storj;
}

export default {
    createBucket,
    getBucketList,
    deleteBucket,
    uploadFile
}
</script>