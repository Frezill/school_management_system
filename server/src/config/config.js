require('dotenv/config')

console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// module.exports = {
//   development: {
//     database: process.env.DB_DATABASE,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     host: '172.18.0.3',
//     dialect: 'mysql',
//     port: process.env.DB_PORT || 3307,
//     define: {
//       freezeTableName: true
//     },
//   }
// };

module.exports = {
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