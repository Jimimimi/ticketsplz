'use strict';
module.exports = function(sequelize, DataTypes) {
  var updateSchema = {
    author: DataTypes.STRING,
    data: DataTypes.STRING,
  };

  var Update = sequelize.define('Update', updateSchema, {
    classMethods: {
      associate: function(models) {
        Update.belongsTo(models.Ticket);
      }
    }
  });

  return Update;
};
