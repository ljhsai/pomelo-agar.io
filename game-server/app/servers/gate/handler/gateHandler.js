/**
 * Created by Administrator on 2016/12/15 0015.
 */
var dispatcher = require('../../../util/dispatcher');

module.exports = function (app) {
    return new Handler(app);
};

class Handler {
    constructor(app) {
        this.app = app;
    }

    queryEntry(msg, session, next) {
        var uid = msg.uid;
        if (!uid) {
            next(null, {
                code: 500
            });
            return;
        }
        // get all connectors
        var connectors = this.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            next(null, {
                code: 500
            });
            return;
        }
        // select connector
        var res = dispatcher.dispatch(uid, connectors);
        next(null, {
            code: 200,
            host: res.host,
            port: res.clientPort
        });
    };
}
