const Router = require('koa-router');
const userController = require('./controller/userController');
const addressController = require('./controller/addressController');

const router = new Router();

router.get('/users', userController.index);
router.get('/users/:id', userController.find);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.get('/users/:id/adresses', addressController.update);
router.get('/users/:id/adresses/:id', addressController.find);
router.post('/users/:id/adresses', addressController.create);
router.put('/users/:id/adresses/:id', addressController.update);
router.delete('/users/:id/adresses/:id', addressController.delete);

module.exports = router;
