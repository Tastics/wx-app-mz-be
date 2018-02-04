/**
 * Created by cendawei
 */
;(function () {
    var validate = {
        isEmpty: function (val) {
            val = val || '';
            return /^\s*$/i.test(val);
        },
        isEmptyArray: function (val) {
            val = val || [];
            return !val.length;
        },
        isNumber: function (val) {
            val = val || '';
            return /^\d+(\.\d+)?$/.test(val);
        },
        isMobile: function (val) {
            return /^1[34578]\d{9}$/.test(val);
        },
        isEmail: function (val) {
            return /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val);
        },
        isIDcard: function (val) {
            return /^\d{17}[0-9x]$/.test(val);
        },
        isTelephone: function (val) {
            return /^(?:(?:0\d{2,3}[\-]?[1-9]\d{6,7})|(?:[48]00[\-]?[1-9]\d{6}))$/.test(val);
        }
    }
    module.exports = validate;
})()
