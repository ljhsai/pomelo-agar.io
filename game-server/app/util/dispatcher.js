/**
 * Created by Administrator on 2016/12/15 0015.
 */

var crc = require('crc');

module.exports.dispatch = function(uid, connectors) {
    var index = Math.abs(crc.crc32(uid)) % connectors.length;
    return connectors[index];
};