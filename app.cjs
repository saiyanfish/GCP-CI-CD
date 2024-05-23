const express = require('express');
const app = express();
const router = require('./router/router.cjs');
const view = require('./router/view.cjs');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter.cjs');

dotenv.config({ path: './config.env' });
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('db started');
});

app.use(router);
app.use(userRouter);
app.use(view);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});
app.listen(8000, () => {
  console.log('app starts');
});
