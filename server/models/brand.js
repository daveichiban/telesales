'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isURL: true
      },
    }
  }, {});
  Brand.associate = function(models) {
    // associations can be defined here
  };
  return Brand;
};