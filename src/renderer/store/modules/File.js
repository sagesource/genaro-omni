const state = {
    bucketFileList: [],
    fileListLoading: true,
    fileQrCode: '',
    fileDownPath: '',
    downloadFileList: []
}

const getters = {
    bucketFileList: state=> state.bucketFileList,
    fileListLoading: state=> state.fileListLoading,
    fileQrCode: state=> state.fileQrCode,
    fileDownPath: state=> state.fileDownPath,
    downloadFileList: state=> state.downloadFileList
}

const mutations = {
    updateBucketFileList(state, bucketFileList) {
        state.bucketFileList = bucketFileList
    },
    updateFileListLoading(state, fileListLoading) {
        state.fileListLoading = fileListLoading
    },
    updateFileQrCode(state, fileQrCode) {
        state.fileQrCode = fileQrCode
    },
    updateFileDownPath(state, fileDownPath) {
        state.fileDownPath = fileDownPath
    },
    updateDownloadFileList(state, downloadFile) {
        state.downloadFileList.push(downloadFile)
    }
}

export default {
    state,
    mutations
}