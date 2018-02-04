/**
 * Created by cendawei on 2017/4/18.
 */
const apiPrefix = require('routeConfig')['apiPrefix']
const $ = require('jquery')

module.exports = {
    goRoute(vm, query) {
        vm.$router.push({name: vm.$route.name, params: vm.$route.params, query: $.extend({}, vm.$route.query, query)})
    },
    getExcel({url, method='get', opt}) {
        $('#excel-export').attr("action", apiPrefix + url)
        $('#excel-export').attr("method", method)
        if(opt) {
            Object.keys(opt).forEach(item => {
                let inputElment = document.createElement('input')
                inputElment.type = "hidden"
                inputElment.name = item
                inputElment.value = opt[item]
                $('#excel-export').append(inputElment)
            })
        }
        $('#excel-export').submit()
        $('#excel-export').html('')
    },
    str2obj(str, s, d) {
        const tmpArray = str.split(s)
        let obj = {}
        tmpArray.forEach(item => {
            obj[item.split(d)[0]] = item.split(d)[1]
        })
        return obj
    },
    isContainChinese(str) {
        return /[\u0391-\uFFE5]+/g.test(str)
    }
}