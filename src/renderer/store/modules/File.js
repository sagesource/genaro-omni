const state = {
    bucketFileList: [],
    fileListLoading: true,
    fileQrCode: '',
    fileDownPath: '',
    downloadFileList: [],
    fileDownloadFlag: true
}

const getters = {
    bucketFileList: state=> state.bucketFileList,
    fileListLoading: state=> state.fileListLoading,
    fileQrCode: state=> state.fileQrCode,
    fileDownPath: state=> state.fileDownPath,
    downloadFileList: state=> state.downloadFileList,
    fileDownloadFlag: state=> state.fileDownloadFlag
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
    },
    updateFileDownloadFlag(state, fileDownloadFlag) {
        state.fileDownloadFlag = fileDownloadFlag
    }
}

export default {
    state,
    mutations
}