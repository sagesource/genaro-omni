<script type="text/javascript">
import iView from 'iview';
import store from '../store'
import STROJ_CLIENT from '../utils/StorjApiClient'
import DB_UTIL from '../utils/DbUtil'

/* 初始化BucketList */
function initBucketList(username, password) {
    STROJ_CLIENT.getBucketList(username, password, function(err) {
            iView.Modal.error({
                title : 'Obtain Bucket Error',
                content: 'Obtain Bucket Error :' + err
            });
        }, function(result) {
                store.commit('updateBucketList', result)
        }
    );
}

/* 保存下载后的文件列表 */
function saveDownloadFile(bucketId, fileId, callback) {
    var val = {bucketId: bucketId, fileId: fileId }
    DB_UTIL.save('t_down_files', val)
    callback()
}

function checkFileDownload(bucketId, fileId, callback) {
    var val = {bucketId: bucketId, fileId: fileId }
    var result = DB_UTIL.query('t_down_files', val)
    callback(result)
}

export default {
    initBucketList,
    saveDownloadFile,
    checkFileDownload
}
</script>