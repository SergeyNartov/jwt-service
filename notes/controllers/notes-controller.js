const NotesService = require('../service/notes-service');

class NotesController {
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
}

module.exports = new NotesController();
