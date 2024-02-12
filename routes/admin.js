const express = require('express')
const router = express.Router()
const userController = require('../controllers/admin');

// const User = require('../model/user')


router.get('/' , userController.getUser);

router.post('/' , userController.postUser);

router.delete('/:id' , userController.deleteUser);


router.put('/:id', userController.editeUser);


module.exports = router;