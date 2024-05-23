const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, 'Please provide a correct email format'],
      required: [true, 'Email is required'],
    },
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      select: false,
      minlength: 8,
      required: [true, 'Must enter your password'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Must enter your password confirmation'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
