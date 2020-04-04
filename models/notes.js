'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    ref: DataTypes.STRING,
    name: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {});
  Notes.associate = function(models) {
    // associations can be defined here
  };
  return Notes;
};