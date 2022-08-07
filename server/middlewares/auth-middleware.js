const ApiError = require('../exception/api-error');
const TokenService = require('../service/token-service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log('1', req.headers)
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    console.log('2')
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = TokenService.validateAccessToken(accessToken);
    console.log('3')
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
