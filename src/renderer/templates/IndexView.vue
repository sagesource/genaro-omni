<style scoped>

.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
.layout_title {
    float: left;
    min-height: 60px;
    width: 78%;
    margin-left: 15px;
    padding-top: 20px;
    padding-left: 10px;
}

.layout-content {
    float: left;
    min-height: 520px;
    width: 78%;
    margin-left: 15px;
    margin-right: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 20px 10px;
}

.layout-menu-left {
    background: #fff;
    /*min-width: 100px;*/
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
    height: 68px;
    background: #fff;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    padding-top: 10px;
}

.fill_bar {
    height:200px;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-hide-text .layout-text {
    display: none;
}

.layout-right {
    float: left;
    min-height: 580px;
    width: 210px;
    overflow: hidden;
    background: #fff;
    margin-top: -61px;
}

.ivu-col {
    transition: width .2s ease-in-out;
}

.ivu-menu-item {
    padding: 14px 40px;
}

</style>

<template>

<div class="layout" :class="{'layout-hide-text': true}">
    <Row type="flex">
        <Col span="2" class="layout-menu-left">
            <Menu :active-name="setActive" theme="primary" width="auto" @on-select="routeTo">
                <div class="layout-logo-left"><img id="logo" src="~@/assets/logo_small.png"></div>
                <MenuItem name="index">
                    <Icon type="ios-navigate" :size="iconSize"></Icon>
                    <span class="layout-text">关于</span>
                </MenuItem>
                <MenuItem name="form">
                    <Icon type="document" :size="iconSize"></Icon>
                    <span class="layout-text">表单</span>
                </MenuItem>
                <MenuItem name="table">
                    <Icon type="navicon" :size="iconSize"></Icon>
                    <span class="layout-text">表格</span>
                </MenuItem>
                <MenuItem name="markdown-viewer">
                    <Icon type="social-markdown" :size="iconSize"></Icon>
                    <span class="layout-text">Markdown</span>
                </MenuItem>
                <MenuItem name="markdown-editor-1">
                    <Icon type="edit" :size="iconSize"></Icon>
                    <span class="layout-text">Md编辑器(1)</span>
                </MenuItem>
                <MenuItem name="markdown-editor-2">
                    <Icon type="edit" :size="iconSize"></Icon>
                    <span class="layout-text">Md编辑器(2)</span>
                </MenuItem>
                <MenuItem name="rtf">
                    <Icon type="document-text" :size="iconSize"></Icon>
                    <span class="layout-text">富文本框</span>
                </MenuItem>
                <MenuItem name="upload">
                    <Icon type="ios-cloud-upload-outline" :size="iconSize"></Icon>
                    <span class="layout-text">文件上传</span>
                </MenuItem>
                <MenuItem name="echarts">
                    <Icon type="pie-graph" :size="iconSize"></Icon>
                    <span class="layout-text">图表(Echarts)</span>
                </MenuItem>
                <div class="fill_bar"></div>
            </Menu>
        </Col>
        <Col span="22">
            <Row>
                <Col span="24">
                    <div class="layout-header">
                    </div>
                </Col>
            </Row>   
            <div class="layout_title">
                <h3>My Genaro Domain</h3>
            </div> 
            <div class="layout-content">
                <div class="layout-content-main">
                    <transition mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
            <div class="layout-right">
            q
            </div>
        </Col>
    </Row>
</div>

</template>

<script>

export default {

    data() {
            return {
                iconSize: 20
            }
        },
        computed: {
            setActive() {
              return this.$route.path.replace('/','');
            }
        },
        methods: {
            routeTo(e) {
                //console.log(e);
                this.$router.push(e);
            }
        }
}

</script>
