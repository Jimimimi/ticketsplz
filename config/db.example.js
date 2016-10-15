/*
  Example database configuration file

  Copy this file to db.js and edit accordingly
*/

var Sequelize = require('sequelize');

var databases = {

/* For example:
  development: {
    database: 'example',
    user:     'example-user',
    password: 'password',
    options: {
      logging: console.log
    }
*/
  }
}


module.exports = mountDB;

function mountDB (env){
  if (!databases[env]){
    console.error('No database configuration for environment:', env);
    return;
  } else {
    var db = databases[env];
    return new Sequelize(db.database, db.user, db.password, db.options);
  }
}
