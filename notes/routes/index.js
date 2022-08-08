const { Router } = require('express');
const NotesController = require('../controllers/notes-controller');

const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/');
router.post('/', authMiddleware, NotesController.create);
router.put('/:id');
router.delete('/:id');

module.exports = router;
