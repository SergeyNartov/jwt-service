const jwt = require('jsonwebtoken');

class TokenService {
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
