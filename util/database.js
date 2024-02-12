const Sequelizer = require('sequelize');

const sequelize = new Sequelizer('appointmentdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequelize;