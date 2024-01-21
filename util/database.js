const Sequelizer = require('sequelize');

const sequelize = new Sequelizer('appointment', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequelize;