const state = {
    username: 'gencodettt@gmail.com',
    password: 'lab@12345',
    bucketId: '{bucketId}',
    bucketList: []
}

const getters = {
    username: state=> state.username,
    password: state=> state.password,
    bucketId: state=> state.bucketId,
    bucketList: state=> state.bucketList
}

const mutations = {
    updateUsername(state, username) {
        state.username = username
    },
    updatePassword(state, password) {
        state.password = password
    },
    updateBucketId(state, bucketId) {
        state.bucketId = bucketId
    },
    updateBucketList(state, bucketList) {
        state.bucketList = bucketList
    }
}

export default {
    state,
    mutations
}