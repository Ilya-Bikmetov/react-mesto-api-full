require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const ErrorNotFound = require('./utils/errors/error_Not_Found');
const { createUser, login, jwtClear } = require('./controllers/users');
const { loginValidator, createUserValidator } = require('./middlewares/validators');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const { PORT = 3001, MONGO_URI = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(cookieParser());
app.use(express.json());
app.use(cors);
app.use(requestLogger);
app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginValidator, login);
app.get('/jwtclear', jwtClear);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);
app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Такого запроса нет'));
});

app.use(errors());
app.use(error);
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
