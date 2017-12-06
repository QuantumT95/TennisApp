// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize
var connection;

if (process.env.JAWSDB_URL) {
  connection =mysql.createConnection(process.env.JAWSDB_URL);
  } else {
    connection = mysql.createConnection({
      host: 'k3xio06abqa902qt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      username: 'e39lnmb7jol1xkky',
      password: 'z53nk04jmjrtbfs1',
      database: 'tennis_db'
    });
  }
// = new Sequelize("tennis_db", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });
connection.connect();
// Exports the connection for other files to use
module.exports = connection;
