const { Router } = require('express');
const NotesController = require('../controllers/notes-controller');

const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', authMiddleware, NotesController.allNotesUser);
router.post('/', authMiddleware, NotesController.create);
router.put('/:id', authMiddleware, NotesController.update);
router.delete('/:id', authMiddleware, NotesController.destroy);

module.exports = router;
