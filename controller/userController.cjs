const catchAsync = require('../error/catchAsync.cjs');
const s3User = require('../model/s3user.cjs');
const jwt = require('jsonwebtoken');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (!name || !email || !password || !passwordConfirm)
    return next(new Error('no data'));
  const newUser = await s3User.create(req.body);
  newUser.password = undefined;
  console.log(newUser);
  const token = await jwt.sign({ id: newUser.id }, 'gogogo', {
    expiresIn: '30d',
  });
  res.cookie('jwt', token, { httpOnly: true });
  res.status(201).json({
    data: {
      token,
      newUser,
    },
  });
});
