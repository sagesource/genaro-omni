<style scoped>

    .layout-file-qr {
        height: 170px;
        width: 170px;
    }

</style>

<template>
    <div id="list">
         <div id="bucket-list" style="background:#eee">
            <Card :bordered="false" dis-hover>
                <p slot="title">Buckets</p>
                <Row type="flex" justify="start">
                    <Col span="8" style="padding-top:3px" v-for="item in showBucketList">
                        <Button type="ghost" style="width:195px" @click="bucketBtnClick({label: item.name, value: item.id})">{{ item.name }}</Button>
                    </Col>
                    <Col v-if="bucketList.length >= 5" span="8" style="padding-top:3px">
                        <Select style="width:195px" placeholder="More Bucket" @on-change="bucketBtnClick" label-in-value>
                            <Option v-for="item in moreBucketList" :value="item.id" :label="item.name">{{ item.name }}</Option>
                        </Select>
                    </Col>
                    <Col span="8" style="padding-top:3px">
                        <Button type="dashed" style="width:195px" @click="add_bucket_modal=true">Add Bucket</Button>
                    </Col>
                </Row>
            </Card>
        </div>
        <div id="file-list" style="background:#eee">
            <Card v-if="selected.selectBucketName != '' && selected.selectBucketId != ''" :bordered="false" dis-hover>
                <p slot="title">Files</p>
                Bucket Info:{{ selected.selectBucketName }} | {{ selected.selectBucketId }} 
                <Dropdown @on-click="bucketAction">
                    <a href="javascript:void(0)">
                        Action
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="delete">Delete</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Table :loading="fileListLoading" no-data-text="No Data" height="260" :columns="fileTableColums" :data="bucketFileList"></Table>
            </Card>
        </div>
            <template>
                <!-- 添加bucket的modal -->
                <Modal 
                    v-model="add_bucket_modal" title="Add Bucket" 
                    @on-ok="addBucketOk" @on-cancel="addBucketCancel"
                    ok-text="OK" cancel-text="Cancel" :closable="false">
                    <Form :model="addBucketItem" :label-width="100">
                        <FormItem label="Bucket Name">
                            <Input v-model="addBucketItem.bucketName" placeholder="Input Bucket Name"></Input>
                        </FormItem>
                    </Form>
                </Modal>

                <!-- 显示receipt的modal -->
                <Modal v-model="show_receipt_modal" width="500" :closable="false">
                    <div style="text-align:center">
                        <Row>
                            <Col span="4"><h4>Filename:</h4></Col>
                            <Col span="20">{{ selected.selectFileName }}</Col>
                        </Row>
                        <Row>
                            <Col span="4"><h4>File Id:</h4></Col>
                            <Col span="20">{{ selected.selectFileId }}</Col>
                        </Row>
                        <Row>
                            <Col span="4"><h4>QR Code:</h4></Col>
                            <Col span="20"><img :src="fileQrCode"></Col>
                        </Row>
                    </div>
                    <div slot="footer">
                        <input id="fileDialog" type="file" nwsaveas hidden/>
                        <Button type="primary" size="large"  @click="downloadFile">Download</Button>
                        <Button type="error" size="large"  @click="deleteFile">Delete</Button>
                    </div>
                </Modal>

                <!-- 删除Bucket确认框-->
                <Modal v-model="show_del_bucket_modal" ok-text="OK" cancel-text="Cancel" :closable="false">
                    <div style="height:40px; margin-top: 20px">
                        <Row>
                            <Col span="8">
                                <h4>Confrim Delete Bucket:</h4>
                            </Col>
                            <Col span="16">
                                {{ selected.selectBucketName }}
                            </Col>
                        </Row>
                    </div>
                    <div slot="footer">
                        <Button type="primary" size="large"  @click="show_del_bucket_modal = false">Cancel</Button>
                        <Button type="error" size="large"  @click="deleteBucket">Delete</Button>
                    </div>
                </Modal>
            </template>
    </div>
</template>

<script>
    import STROJ_CLIENT from '../../utils/StorjApiClient'
    import QR_CODE from '../../utils/QrCodeUtil'
    import ELECTRON_DIALOG from '../../utils/ElectronDialog'
    import IVIEW_UTIL from '../../utils/IviewUtil'
    import FILEINDEX_JS from '../../js/FileIndexJs'
    import iView from 'iview';
    import store from '../../store'

    export default {
        data() {
            return {
                add_bucket_modal: false,
                show_buckets_modal: false,
                show_receipt_modal: false,
                show_del_bucket_modal: false,
                addBucketItem: {
                    bucketName: ''
                },
                fileTableColums: [{
                    title: 'File Name',
                    key: 'filename',
                },
                {
                    title: 'File Id',
                    key: 'id',
                    width: 220
                },
                {
                    title: 'Action',
                    key: 'action',
                    align: 'center',
                    width: 230,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '23px',
                                    marginRight: '3px'
                                },
                                on: {
                                    click: () => {
                                        this.showReceipt(params.row.filename, params.row.id)
                                    }
                                }
                            },'Receipt'),
                            h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '3px'
                                },
                                on: {
                                    click:() => {
                                        this.selected.selectFileName = params.row.filename
                                        this.selected.selectFileId = params.row.id
                                        this.downloadFile()
                                    }
                                }
                            }, 'Download'),
                            h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '3px'
                                }
                            }, 'Delete')
                        ])
                    }
                }],
                selected: {
                    selectBucketName: '',
                    selectBucketId: '',
                    selectFileName: '',
                    selectFileId: ''
                }
            }
        },
        created: function () {
            // 页面初始化,获取bucketList
            FILEINDEX_JS.initBucketList(this.username, this.password)
        },
        computed: {
            username() {
                return this.$store.state.User.username
            },
            password() {
                return this.$store.state.User.password
            },
            bucketList() {
                return this.$store.state.Bucket.bucketList
            },
            showBucketList() {
                return this.$store.state.Bucket.showBucketList
            },
            moreBucketList() {
                return this.$store.state.Bucket.moreBucketList
            },
            bucketFileList() {
                return this.$store.state.File.bucketFileList
            },
            fileListLoading() {
                return this.$store.state.File.fileListLoading
            },
            fileQrCode() {
                return this.$store.state.File.fileQrCode
            }
        },
        methods: {
            addBucketOk() {
                if (this.addBucketItem.bucketName != '') {
                    var bucketName = this.addBucketItem.bucketName
                    var user_name = this.username
                    var pass_word = this.password

                    iView.Message.info('Add Bucket Waiting');
                    STROJ_CLIENT.createBucket(bucketName, user_name, pass_word,
                        function(err) {
                            iView.Notice.error({
                                title: '<b>Create Bucket Error</b>',
                                desc: 'Bucket Name: ' + bucketName + '<br>Error:' + err,
                                duration: 0
                            });
                        }, function(result) {
                            iView.Message.info('Add Bucket Success');
                            FILEINDEX_JS.initBucketList(user_name, pass_word)
                        }
                    )
                    this.addBucketItem.bucketName=''
                }
            },
            addBucketCancel() {
                this.addBucketItem.bucketName=''
            },
            bucketBtnClick(bucket) {
                this.selected.selectBucketName = bucket.label
                this.selected.selectBucketId = bucket.value

                // 获取文件列表
                store.commit('updateFileListLoading', true)
                STROJ_CLIENT.getFileList(bucket.value, this.username, this.password, function(err) {
                    iView.Message.error('Get Bucket File List Error:' + err);
                    store.commit('updateFileListLoading', false)
                }, function(result) {
                    store.commit('updateBucketFileList', result)
                    store.commit('updateFileListLoading', false)
                })
            },
            showReceipt(filename, fileId) {
                this.selected.selectFileName = filename
                this.selected.selectFileId = fileId
                this.show_receipt_modal = true
                QR_CODE.createQrCodeStr(fileId, function(error) {

                }, function(result) {
                    store.commit('updateFileQrCode', result)
                })
            },
            deleteFile() {
                
            },
            downloadFile() {
                var options = {
                    title: 'Save File',
                    defaultPath: './' + this.selected.selectFileName
                }
                var downSelect = this.selected
                var bridgeUser = this.username
                var bridgePass = this.password

                ELECTRON_DIALOG.showSaveDialog(options, function(filepath) {
                    iView.Message.info('File Downloading...');

                    var downloadNoticeArgs = {
                        desc: 'Source File: ' + downSelect.selectFileName + ' <br>Bucket: ' + downSelect.selectBucketName + ' <br>Target: ' + filepath,
                        duration: 0
                    }
                    STROJ_CLIENT.downloadFile(downSelect.selectBucketId, downSelect.selectFileId,
                        filepath, bridgeUser, bridgePass, function(err) {
                            downloadNoticeArgs['title'] = 'File Download Error'
                            downloadNoticeArgs['err'] = err
                            IVIEW_UTIL.showErrNotice(downloadNoticeArgs)
                        }, function() {
                            downloadNoticeArgs['title'] = 'File Download Success'
                            IVIEW_UTIL.showSuccessNotice(downloadNoticeArgs)

                            store.commit('updateDownloadFileList', {
                                filename: downSelect.selectFileName,
                                filepath : filepath,
                                bucketName: downSelect.selectBucketName
                            })
                        }, function(progress, downloadedBytes, totalBytes) {

                        }
                    )
                })
            },
            bucketAction(name) {
                if (name === 'delete') {
                    this.show_del_bucket_modal = true
                }
            },
            deleteBucket() {
                var bridgeUser = this.username
                var bridgePass = this.password

                STROJ_CLIENT.deleteBucket(this.selected.selectBucketId, bridgeUser, bridgePass, 
                        function(err) {

                        }, function(result) {
                            // 页面初始化,获取bucketList
                            iView.Message.info('Bucket Delete Success');
                            FILEINDEX_JS.initBucketList(bridgeUser, bridgePass)
                        }
                )

                this.selected.selectBucketId = ''
            }
        }
    }
</script>