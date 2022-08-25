const { Router } = require('express');
const userController = require('../controllers/user-controller');

const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

/**
  * @openapi
  * /registration:
  *   post:
  *     consumes:
  *       application/json
  *     parameters:
  *       - in: body
  *         name: body
  *         schema:
  *           type: object
  *           properties:
  *             email:
  *               type: string
  *               format: email
  *             password:
  *               type: string
  *               format: password
  *     produces:
  *       - application/json
  *     description: New user registration
  *     responses:
  *       200:
  *         description: Success
  *         schema:
  *           type: object
  *           properties:
  *             accessToken:
  *               type: string
  *             refreshToken:
  *               type: string
  *             user:
  *               type: object
  *               properties:
  *                 email:
  *                   type: string
  *                   format: email
  *                 id:
  *                   type: integer
  *                 isActivated:
  *                   type: boolean
  *       400:
  *         description: Validation error
  *       500:
  *         description: Server internal error
  */
router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration,
);
// TODO create swagger
router.post('/login', userController.login);
// TODO create swagger
router.post('/logout', userController.logout);
// TODO create swagger
router.get('/activate/:link', userController.activate);
// TODO create swagger
router.get('/refresh', userController.refresh);
// TODO create swagger
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
