'use strict';
module.exports = function(sequelize, DataTypes) {
  var ticketSchema = {
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    status: DataTypes.STRING,
    author: DataTypes.STRING
  };

  var Ticket = sequelize.define('Ticket', ticketSchema, {
    classMethods: {
      associate: function(models) {
        Ticket.hasMany(models.Update);
      }
    }
  });

  return Ticket;
};
