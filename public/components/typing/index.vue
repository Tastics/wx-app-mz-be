<template>
    <div class="page article js_show">
        <div class="page_bd">
            <article class="weui-article">
                <p>
                    <span id="sp1"></span>
                    <span id="sp2">_</span>
                </p>
            </article>
        </div>
        <div class="js_dialog" style="opacity: 1;" v-show="isError">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__bd">二维码已失效，可重新在"CDroom码字"小程序中生成</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @tap="confirmError()">知道了</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'zepto'
    import services from 'services'

    export default {
        data() {
            return {
                isError: false
            }
        },
        computed: {
            'ps'() {
                return this.$route.query['ps']
            }
        },
        mounted() {
            this.typing()
        },
        methods: {
            typing() {
                const ps = this.ps
                services.qrCodeService.getUrlParams({ps})
                    .done(res => {
                        const text = res.data['text']
                        const dl = res.data['dl']
                        if(!dl || !text || text.length <= 0 || (dl != -1 && dl < new Date().getTime())) {
                            this.isError = false
                        } else {
                            const that = this
                            const sp1=document.getElementById("sp1");
                            const sp2=document.getElementById("sp2");
                            const in1 = setInterval(function(){
                                sp2.style.display="none";
                                setTimeout("sp2.style.display='inline'",500);
                            },700);
                            let index=0;
                            const in2 = setInterval(function(){
                                if(index < text.length){
                                    sp1.appendChild(document.createTextNode(text[index]))
                                    index++;
                                } else {
                                    clearInterval(in1)
                                    clearInterval(in2)
                                    sp2.style.display="none"
                                }
                            },400);
                        }
                    })
                    .fail(err => {
                        this.isError = false
                    })
            },
            confirmError() {
                this.isError = false
            }
        }
    }
</script>