/**
 * Created by cendawei on 2017/4/18.
 */
const Sequelize = require('sequelize');
const connect = require('./index');

const message = connect.define('message', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        primaryKey: true
    },
    content: Sequelize.STRING,
    type: Sequelize.STRING,
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    // phone: Sequelize.STRING.BINARY,
    addtime: Sequelize.INTEGER,
});

module.exports = {
    async addItem(obj) {
        return await message.create({
            id: obj.MsgId.toString(),
            content: obj.Content,
            type: obj.MsgType,
            from: obj.FromUserName,
            to: obj.ToUserName,
            addtime: obj.CreateTime
        }).then(async res => await {
            ok: true
            // console.log(res)
        })
    }
}