/**
 * Created by cendawei on 2017/4/18.
 */
module.exports = {
    /**
     * 获取路由
     * @returns {Array|{index: number, input: string}}
     */
    getRoute() {
        return location.hash.match(/^#[^$\?]*/) || location.hash.match(/^#[^$\?]*/)[0].replace(/#/, '');
    },
    /**
     * 获取路由参数
     * @returns {{}}
     */
    getQuery() {
        var queryStr = location.hash.match(/\?[^$]*/) ? location.hash.match(/\?[^$]*/)[0].replace(/\?/, '') : '';
        var queryArray = [];
        var query = {};
        if(queryStr) {
            queryArray = queryStr.split("&");
        }
        queryArray.forEach(function (item) {
            query[item.split("=")[0]] = item.split("=")[1];
        })
        return query;
    },
    /**
     * 路由监听
     * @param routeObj
     */
    route(routeObj) {
        var that = this;
        window.onhashchange = function () {
            var route = that.getRoute();
            routeObj.forEach(function (item) {
                if(item.route === route) {
                    item.controller();
                }
            })
        }
    }
}