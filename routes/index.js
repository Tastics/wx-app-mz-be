const fs = require('fs')
const path = require('path')
const {route} = require('../configs');
const routePrefix = route['routePrefix']

let routers = {}

fs.readdirSync(__dirname).forEach(file => {
    if (!/^index\.js/.test(file)) {
        routers[path.basename(file, '.js')] = require(path.resolve(__dirname, file))
    }
})

module.exports = function (app) {
    for (let a in routers) {
        app.use(`${routePrefix}/${a}`, routers[a])
    }
    // 各项目首页路由 放最后
    app.use(`${routePrefix}/:project`, (req, res) => {
        res.render(`${req.params.project}.html`, {
            data: {}
        });
    });
}