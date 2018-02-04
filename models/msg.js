/**
 * Created by cendawei on 2017/4/18.
 */
const Sequelize = require('sequelize');
/*const connect = require('./index');

const message = connect.define('message', {
    id: Sequelize.INTEGER,
    msg: Sequelize.STRING,
    // phone: Sequelize.STRING.BINARY,
    addtime: Sequelize.INTEGER,
});*/

module.exports = {
    async addItem() {
        const res = await message.post();
        return {
            ok: true,
            list: res
        }
    }
}