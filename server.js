const { port, env } = require('./conf/vars');

const moment = require('moment');

const app = require("./conf/express");
const mongo = require("./conf/mongo");
const logger = require("./conf/logger");

const routerUtils = require("./utils/routerUtils");

const auth = require("./router/authRoute");

mongo.connect();

let BLACKLIST =[""];

app.all('*', function (req, res, next) {
    let ipAddress = req.ipInfo.ip.substr(0, 7) == "::ffff:" ? req.ipInfo.ip.substr(7) : req.ipInfo.ip;
    if (BLACKLIST.indexOf(ipAddress) === -1) {
        if (!routerUtils.isAuthorizedRoute(req)) {
            res.status(404).json({
                "success": false,
                "data": { "message": "Route does not exist" }
            });
        } else {
            console.log(`🔵 ${ipAddress} called route ${req.originalUrl} (🕦 ${moment().format('l')} ${moment().format('LTS')})`);
            next();
        }
    } else {    
        res.status(403).json({
            "success": false,
            "data": { "message": ipAddress + " IP is not in whiteList" }
        });
    }
});

app.use("/users", auth);

app.listen(port, () => {
    console.log(`🤖 Application running in: ${env}`)
    console.log(`🛡  Blacklisted ip(s): ${BLACKLIST}`);
    console.log(`✅ Example app listening at http://localhost:${process.env.PORT_DEV}`);
});