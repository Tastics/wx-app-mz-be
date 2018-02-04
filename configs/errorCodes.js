/**
 * Created by cendawei on 2017/8/18.
 */
module.exports = {
    'success': {
        code: 2000,
        msg: '请求成功',
        codeText: 'success'
    },
    'paramsError': {
        code: 4000,
        msg: '参数有误',
        codeText: 'paramsError'
    },
    'invalidateCode': {
        code: 4001,
        msg: '验证码不存在或已过期',
        codeText: 'invalidateCode'
    },
    'noAuthority': {
        code: 4003,
        msg: '暂无权限',
        codeText: 'noAuthority'
    },
    'notAllow': {
        code: 3001,
        msg: '请求不允许',
        codeText: 'notAllow'
    },
    'noChange': {
        code: 3004,
        msg: '状态无变化',
        codeText: 'noChange'
    },
    'failure': {
        code: 5000,
        msg: '内部错误',
        codeText: 'failure'
    }
}
