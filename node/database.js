const mysql = require("mysql2/promise");

exports.pool = mysql.createPool({
    host: "www.dailyplan.shop",
    user: "hayoung93",
    port: "3306",
    password: "qwer1234",
    database: "DailyPlanDB",
});

