const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');
const TokenServise = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exception/api-error');

class UserService {
  async registration(email, password) {
    console.log(email, '888888888888888888888888');
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 2);
    const activationLink = uuid.v4();
    const user = await User.create({ email, password: hashPassword, activationLink });
    await MailService.sendActivationMessage(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = TokenServise.generateToken({ ...userDto });
    await TokenServise.saveToken(userDto.id, tokens.refreshToken);

    return {

      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка на активацию');
    }

    user.isActivated = true;
    await user.save();
  }
}
module.exports = new UserService();
