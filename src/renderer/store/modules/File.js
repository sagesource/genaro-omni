const state = {
    uploadFileMap: [],
    totalBytes: 0,
    uploadedBytes: 0,
    uploadEnd : true
}

const getters = {
    uploadFileMap: state=> state.uploadFileMap,
    totalBytes: state=> state.totalBytes,
    uploadedBytes: state=> state.uploadedBytes,
    uploadEnd: state=> state.uploadEnd
}

const mutations = {
    updatePercent(state, args) {
        state.uploadFileMap.set(args.filename, args.percent)
    },
    removePercent(state, filename) {
        state.uploadFileMap.delete(filename)
    },
    updateTotalBytes(state, totalBytes) {
        state.totalBytes = state.totalBytes + totalBytes
    },
    updateUploadedBytes(state, uploadedBytes) {
        state.uploadedBytes = state.uploadedBytes + uploadedBytes
    },
    updateUploadEnd(state, uploadEnd) {
        state.uploadEnd = uploadEnd
    }
}

export default {
    state,
    mutations
}