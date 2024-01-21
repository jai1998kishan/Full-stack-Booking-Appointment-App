const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const { Model } = require('sequelize');

const router = express.Router();

router.get('/user',adminController.getUser);

router.post('/user/add-users',adminController.postUser);

router.post('/user/get-users',adminController.getUserAfterReload);

module.exports = router;