const hash = require('js-md5');
const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Key = db.define('key', {
  key: Sequelize.STRING,
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  endpoint: Sequelize.STRING
});

Key.belongsTo(User);

Key.hook('beforeCreate', (instance) => {
  const modInstance = instance;

  modInstance.key = hash(`${Date.now()}${instance.id}entropy!!!!`);
});

module.exports = Key;
