/**
 * Created by cendawei
 * @param opts
 * @param successfunc
 * @param failfunc
 * @returns {*}
 */
const apiPrefix = require('routeConfig')['apiPrefix']
const $ = require('jquery')

module.exports = function (opts, successfunc, failfunc) {
    var deff = $.Deferred();
    if(!opts || !opts.url) {
        deff.reject('no url specified!');
    }
    var option = $.extend(true, {
        type: 'get',
        dataType: 'json'
    }, opts);
    // 添加api前缀
    option.url = apiPrefix + option.url
    $.ajax(option).done(function(res){
        res.code !== 0 && console.log(res.msg)
        successfunc && successfunc(res);
        deff.resolve(res);
    }).fail(function(err){
        console.log("接口调用失败")
        failfunc && failfunc(err)
        deff.reject(err);
    });
    return deff.promise();
}