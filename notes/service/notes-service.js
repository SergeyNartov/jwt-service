const { Notes } = require('../db/models');

class NotesService {
  async create(userId, content) {
    const note = await Notes.create({ user_id: userId, content });
    return note;
  }
}

module.exports = new NotesService();
