const Router = require('express');
const controller = require('./authController');
// const authMiddleware = require('./middleware/authMiddleware');
const router = new Router();
router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);
router.put('/update', controller.update);
module.exports = router;
