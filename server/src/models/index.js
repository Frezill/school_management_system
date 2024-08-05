'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let customizeConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  }
};

let sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  customizeConfig
);

// let customizeConfig = {
//   host: 'localhost',
//   port: 3307,
//   dialect: 'mysql'
// };

// let sequelize = new Sequelize(
//   "school_management",
//   "root",
//   "123456",
//   customizeConfig
// );

(async () => {
  try {
    console.log('Current directory:', __dirname);
    console.log('Environment variables:');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_PORT:', process.env.DB_PORT);
    console.log('DB_DATABASE:', process.env.DB_DATABASE);
    console.log('DB_USERNAME:', process.env.DB_USERNAME);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    await sequelize.authenticate()
    console.log("We have successfully connected to the database!");
  }
  catch (e) {
    console.log("Connection to the database failed!: " + e.message);
    throw e;
  }
})();


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;