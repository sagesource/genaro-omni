<script type="text/javascript">
import iView from 'iview';
import store from '../store'
import STROJ_CLIENT from '../utils/StorjApiClient'

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

export default {
    initBucketList
}
</script>