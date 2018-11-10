'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    standardCost: DataTypes.DOUBLE,
    listPrice: DataTypes.DOUBLE,
    sellStartDate: DataTypes.DATE,
    sellEndDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    slug: DataTypes.STRING,
    size: DataTypes.STRING,
    brandId: DataTypes.INTEGER,
    weight: DataTypes.DOUBLE,
    length: DataTypes.DOUBLE,
    width: DataTypes.DOUBLE,
    height: DataTypes.DOUBLE,
    imageUrl: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    taxClass: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};