const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Users = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    
  },
  phonenumber: {
    type: Sequelize.INTEGER,
    unique: true,
  },
});

module.exports = Users;
