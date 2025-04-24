const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

const config={
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(config).promise();

module.exports={
    pool,
    query:(text,params)=>pool.query(text,params)
}
