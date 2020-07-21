const mySql = require('mysql');
const Promise = require('bluebird');
Promise.promisifyAll(mySql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);
require("dotenv").config();

var mySqlPool = mySql.createPool({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

var getSqlConnection = function () {
    return mySqlPool.getConnectionAsync().disposer(connection => {
        connection.release();
    });
};


module.exports = class mySqlConnection {
    Query(sql, args) {
        return Promise.using(getSqlConnection(), connection => {
            return connection.queryAsync(sql, args);
        });
    }
};