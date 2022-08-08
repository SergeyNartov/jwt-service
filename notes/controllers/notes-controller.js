const NotesService = require('../service/notes-service');

class NotesController {
  async allNotesUser(req, res, next) {
    try {
      const userId = req.user.id;
      const allNotes = await NotesService.allNotesUser(userId);
      return res.json(allNotes);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { content } = req.body;
      const userId = req.user.id;
      const note = await NotesService.create(userId, content);
      return res.json(note);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const userId = req.user.id;
      const { newContent } = req.body;
      const noteId = req.params.id;
      const noteUpdate = await NotesService.update(userId, noteId, newContent);
      return res.json(noteUpdate)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotesController();
