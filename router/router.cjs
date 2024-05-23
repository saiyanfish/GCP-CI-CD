const express = require('express');
const upload = require('../upload.cjs');
const s3Photo = require('../model/s3photo.cjs');
const s3PhotoController = require('../controller/s3PhotoController.cjs');
const { default: catchAsync } = require('../error/catchAsync.cjs');

const router = express.Router();

router.post(
  '/upload',
  upload.single('file'),
  s3PhotoController.uploadWithUser,
  s3PhotoController.uploadEnd
);
router.get('/photo/:name', s3PhotoController.searchPhotoByUser);

module.exports = router;
