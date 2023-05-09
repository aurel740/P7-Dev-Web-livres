/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

const booksCtrl = require('../controllers/books');

router.post('/', auth, booksCtrl.createBook);

router.put('/:id', auth, multer, booksCtrl.modifyBooks);

router.delete('/:id', auth, booksCtrl.deleteBooks);

router.get('/:id', booksCtrl.getOneBooks);

router.get('/', booksCtrl.getAllBooks);

module.exports = router;
