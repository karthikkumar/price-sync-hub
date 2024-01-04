const Sequelize = require('sequelize');

const sequelize = new Sequelize('price-feed', 'username', 'password', { }); //TODO config

const Product = sequelize.define('product', {
  sku: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  price: Sequelize.FLOAT
});

sequelize.sync();

module.exports = Product;
