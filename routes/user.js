// req express
const express = require('express');
const { register, login } = require('../controller/user');
const { registerValidation, validation, loginValidation } = require('../middleware/validator');
const isAuth = require('../middleware/isAuth');
// router
const router = express.Router();


// register
router.post('/register', register, registerValidation(), validation);
// login
// router.get('/login', login, loginValidation(), validation)
// login
router.post('/login', login, loginValidation(), validation);

// current user
router.get('/current', isAuth, (req, res) => { res.send(req.user) }
)    
// export
module.exports = router;
