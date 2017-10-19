const state = {
    bucketFileList: [],     // Bucket File 列表
    fileListLoading: true,  // Bucket文件列表加载中标志
    fileQrCode: '',         // 文件二维码
    fileDownPath: '',       // 文件下载路径
    downloadFileList: [],   // 下载文件列表
    fileDownloadFlag: true  // 文件已下载标志位
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