/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const Books = require('../models/books');

exports.createBook = (req, res) => {
  delete req.body.userId;
  const book = new Books({
    ...req.body,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });

  book.save()
    .then(() => { res.status(201).json({ message: 'Objet enregistré !' }); })
    .catch((error) => { res.status(400).json({ error }); });
};

// exports.createBook = (req, res) => {
//   console.log('bookObject');
//   return res.send('<script>console.log(Hello world!)</script>');
// };

exports.modifyBooks = (req, res) => {
  Books.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBooks = (req, res) => {
  Books.findOne({ id: req.params.id })
    .then((books) => {
      if (books.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = books.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Books.deleteOne({ id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }); })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneBooks = (req, res) => {
  Books.findOne({ id: req.params.id })
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res) => {
  Books.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
