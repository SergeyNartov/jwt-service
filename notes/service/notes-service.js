const { Notes } = require('../db/models');
const ApiError = require('../exception/api-error');

class NotesService {
  async create(userId, content) {
    const note = await Notes.create({ user_id: userId, content });
    return note;
  }

  async allNotesUser(userId) {
    const allNotes = await Notes.findAll({ where: { user_id: userId } });
    return allNotes;
  }

  async update(userId, noteId, newContent) {
    const note = await Notes.findOne({ where: { id: noteId } });
    const userIdNote = note.dataValues.user_id;
    if (userId !== userIdNote) {
      return ApiError.UnauthorizedError();
    }
    note.content = newContent;
    await note.save();
    return note
  }
}

module.exports = new NotesService();
