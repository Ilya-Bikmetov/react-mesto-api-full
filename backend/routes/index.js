const routes = require('express').Router();
const { createUser, login, jwtClear } = require('../controllers/users');
const { loginValidator, createUserValidator } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../utils/errors/error_Not_Found');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
routes.post('/signup', createUserValidator, createUser);
routes.post('/signin', loginValidator, login);
routes.get('/jwtclear', jwtClear);
routes.use(auth);
routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

routes.use('*', (req, res, next) => {
  next(new ErrorNotFound('Такого запроса нет'));
});

module.exports = routes;
