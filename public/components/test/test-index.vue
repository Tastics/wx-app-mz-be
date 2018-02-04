<template>
    <div class="page navbar js_show">
        <div class="page__bd" style="height: 100%;">
            <div class="weui-tab">
                <div class="weui-navbar">
                    <div class="weui-navbar__item" :class="{'weui-bar__item_on': tabIndex == index}" v-for="(item, index) in tabs" @tap="changeTab(index)">
                        {{item["name"]}}
                    </div>
                </div>
                <div class="weui-tab__panel">
                    <div class="weui-cells">
                        <a class="weui-cell weui-cell_access" href="javascript:;" v-for="item in list" @tap="toDetail(item)">
                            <div class="weui-cell__bd">
                                <p>{{item["id"]}}</p>
                            </div>
                            <div class="weui-cell__ft">{{item["name"]}}</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="weui-loadmore" v-show="isLoading">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line" v-show="isLoaded">
                <span class="weui-loadmore__tips">暂无数据</span>
            </div>
        </div>
    </div>
</template>

<script>
    import services from 'services'
    import $ from 'zepto'
    import utils from 'utils'

    export default {
        data() {
            return {
                tabs: [],
                list: [],
                isLoading: false,
                isLoaded: false
            }
        },
        computed: {
            tabIndex() {
                return this.$route.query['tab'] || 0
            }
        },
        mounted() {
            this.initView()
            this.getTabs()
            this.getList(this.$route.query['tab'], this.$route.query['page'])
        },
        watch: {
            '$route'() {
                this.getList(this.$route.query['tab'], this.$route.query['page'])
            }
        },
        methods: {
            initView() {
                const that = this
                $('.weui-navbar').on('tap', '.weui-navbar__item', function () {
                    !$(this).hasClass('weui-bar__item_on') && $(this).addClass('weui-bar__item_on').siblings().removeClass('weui-bar__item_on')
                })
                $(document).ready(function () {
                    $(window).scroll(function () {
                        var $currentWindow = $(window);
                        //当前窗口的高度
                        var windowHeight = $currentWindow.height();
                        //当前滚动条从上往下滚动的距离
                        var scrollTop = $currentWindow.scrollTop();
                        //当前文档的高度
                        var docHeight = $(document).height();
                        //（滚动条滚动的距离 + 窗口的高度 = 文档的高度）  这个是基本的公式
                        if (scrollTop >= docHeight - windowHeight) {
                            that.loadMore()
                        }
                    });
                });
                /*$('.page').on('swipeUp', () => {
                    this.loadMore()
                })
                document.addEventListener('touchmove', function (event) {
                    event.preventDefault();
                }, false);*/
            },
            getTabs() {
                this.tabs = [
                    {'name': 'test1'},
                    {'name': 'test2'},
                    {'name': 'test3'},
                    {'name': 'test4'}
                ]
            },
            getList(tabIndex, pageIndex) {
                const tab = tabIndex || 0
                const page = pageIndex || 1
                services.testService.getList({tab, page})
                    .then(res => {
                        if(res.code === 2000) {
                            this.list = res.data["list"]
//                            this.list = parseInt(page) > 1 ? this.list.concat(res.data["list"]) : res.data["list"]
                            this.isLoading = false
                            this.isLoaded = res.data["list"].length > 0 ? false : true
                        }
                    })
            },
            changeTab(tabIndex) {
                this.isLoaded = false
                utils.goRoute(this, {tab: tabIndex, page: 1})
            },
            loadMore() {
                if(this.isLoaded) {
                    return
                }
                this.isLoading = true
                const page = this.$route.query['page'] ? parseInt(this.$route.query['page']) + 1 : 2
                utils.goRoute(this, {page})
            }
        }
    }
</script>