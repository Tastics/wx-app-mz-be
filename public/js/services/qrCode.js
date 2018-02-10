/**
 * Created by cendawei on 2018/1/26.
 */
import api from 'api'

export default {
    getUrlParams(queryBody) {
        return api({
            url: '/qrCode/ps',
            type: 'get',
            data: queryBody
        })
    }
}