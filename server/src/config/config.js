require('dotenv').config()

const env = process.env.NODE_ENV || 'development';

module.exports = {
  // development: {
  //   database: process.env.DB_DATABASE,
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   host: process.env.DB_HOST,
  //   dialect: 'mysql',
  //   port: process.env.DB_PORT
  // }
  development: {
    database: 'school_management',
    username: 'root',
    password: '123456',
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    define: {
      freezeTableName: true
    },
  }
};