const skipperS3 = require('skipper-s3');

module.exports = {
  get(req, res) {
    Promise.all([
      Contact.find(),
      Contact.count(),
    ])

      .then(([contacts, hits]) => {
        res.status(201).json({
          contacts,
          hits,
        });
      })

      .catch((err) => {
        res.json({
          err,
        });
      });
  },

  create(req, res) {
    Contact.create(req.body)

      .then(contact => (
        res.json({
          contact,
        })
      ))

      .catch((err) => {
        res.status(err.status).json(err.invalidAttributes);
      });
  },

  update(req, res) {
    Contact.update({ id: req.params.id }, res.body)

      .then(updatedContact => (
        res.json({
          contact: updatedContact,
        })
      ))

      .catch((err) => {
        res.status(err.status).json(err.invalidAttributes);
      });
  },

  delete(req, res) {
    Contact.destroy({ id: req.params.id })

      .then(() => (
        res.sendStatus(201)
      ))

      .catch(err => (
        res.send(err)
      ));
  },

  uploadImage(req, res) {
    Contact.findOne({ id: req.params.id })

      .then(contact => (
        req.file('image').upload({
          adapter: skipperS3,
          key: process.env.AWS_KEY,
          secret: process.env.AWS_SECRET,
          region: process.env.AWS_S3_REGION,
          bucket: process.env.BUCKET_NAME,
          saveAs: (file, callback) => (
            callback(null, `photobobook-contact-img-${contact.id}-${Date.now()}${file.filename.split('.')[file.filename.split('.').length - 1]}`)
          ),
        }, (err, [file]) => {
          if (err) return res.status(500).json(err.Message);

          contact.imageUrl = file.extra.Location;
          return contact.save(() => (
            res.json({
              contact,
            })
          ));
        })
      ));
  },

  getOne(req, res) {
    Contact.findOne({ id: req.params.id })

      .then(() => (
        res.sendStatus(201)
      ))

      .catch(err => (
        res.send(err)
      ));
  },
};
