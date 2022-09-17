const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../utils/errors/error_Not_Found');
const ErrorBadRequest = require('../utils/errors/error_Bad_Request');
const ErrorConflict = require('../utils/errors/error_Conflict');
const ErrorUnauthorized = require('../utils/errors/error_Unauthorized');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ErrorNotFound('Пользователь по указанному id не найден.');
    }
    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new ErrorBadRequest('Передан некорректный id пользователя'));
      return;
    }
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new ErrorNotFound('Пользователь не найден.');
    }
    res.send({ user });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const responseUser = user.toObject();
    delete responseUser.password;
    res.send(responseUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ErrorBadRequest('Переданы некорректные данные'));
      return;
    }
    if (err.code === 11000) {
      next(new ErrorConflict('Такой пользователь уже существует'));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ErrorUnauthorized('Неправильный email или пароль');
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new ErrorUnauthorized('Неправильный email или пароль');
    }
    const token = jwt.sign(
      { _id: user._id },
      'some-secret',
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, about, id = req.user._id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, about }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new ErrorNotFound('Пользователь с указанным id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.kind === 'ObjectId') {
      next(new ErrorBadRequest('Переданы некорректные данные при обновлении профиля'));
      return;
    }
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar, id = req.user._id } = req.body;
  try {
    if (!avatar) {
      throw new ErrorBadRequest('Переданы некорректные данные аватара');
    }
    const user = await User.findByIdAndUpdate(id, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new ErrorNotFound('Пользователь с указанным id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError' || err.kind === 'ObjectId') {
      next(new ErrorBadRequest('Переданы некорректные данные при обновлении аватара'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
