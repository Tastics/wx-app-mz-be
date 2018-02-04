/**
 * Created by cendawei
 * @param msg
 */
import $ from 'jquery';

module.exports = {
    /**
     * 提示框
     * @param msg
     */
    tips: function (msg) {
        var d = dialog({
            content: msg
        });
        d.show();
        setTimeout(function () {
            d.close().remove();
        }, 2000);
    }
}