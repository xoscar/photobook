/**
 * Contact Controller
 * Main controller for contact routes
 * @type {Object}
 */
module.exports = {
  /**
   * Retrieves all of the contacts from the database as well as the number of hits
   * @param  {Object} req Express request object
   * @param  {Object} res Express response object
   * @return {void}     Sends response json to the client with both contacts and hits.
   */
  get(req, res) {
    Promise.all([
      Contact.find(),
      Contact.count(),
    ])

      .then(([contacts, hits]) => {
        res.json({
          contacts,
          hits,
        });
      });
  },

  /**
   * Gets the informaton for an specific contact.
   * @param  {Object} req Express request object
   * @param  {Object} res Express response object
   * @return {void}     Sends contact information to the client.
   */
  getOne(req, res) {
    Contact.findOne({ id: req.params.id })

      .then(contact => (
        !contact ? Promise.reject({
          status: 404,
          text: 'Not found',
        }) : res.json({
          contact,
        })
      ))

      .catch(err => (
        res.status(err.status).json(err)
      ));
  },

  /**
   * Creates a contact from the request body, validation up to the model.
   * @param  {Object} req Express request object
   * @param  {Object} res Express response object
   * @return {void}     Sends response json to the client with the new contact.
   */
  create(req, res) {
    Contact.create(req.body)

      .then(contact => (
        res.status(201).json({
          contact,
        })
      ))

      // send model error to the client
      .catch((err) => {
        res.status(err.status).json(err.invalidAttributes);
      });
  },

  /**
   * Updates a contact basic info.
   * @param  {Object} req Express request object
   * @param  {Object} res Express response object
   * @return {void}     Sends updated contact json to the client.
   */
  update(req, res) {
    Contact.update({ id: req.params.id }, req.body)

      .then(([ updatedContact ]) => (
        res.json({
          contact: updatedContact,
        })
      ))

      // send model error to the client
      .catch((err) => {
        res.status(err.status).json(err.invalidAttributes);
      });
  },

  /**
   * Deletes a contact based from the id.
   * @param  {Object} req Express request object
   * @param  {Object} res Express response object
   * @return {void}     Sends accepted status code to the client.
   */
  delete(req, res) {
    Contact.destroy({ id: req.params.id })

      .then(() => (
        res.status(204).send('Ok')
      ));
  },

  /**
   * Upload file imaget to AWS S3 and updates the contact info.
   * @param  {Object} req Express request object
   * @param  {Object} res Express response object
   * @return {void}     Sends updated contact json to the client.
   */
  uploadImage(req, res) {
    Contact.findOne({ id: req.params.id })

      .then(contact => (
        req.file('image').upload({
          adapter: sails.config.aws.skipperS3,

          // credentials coming from the environment file
          key:  sails.config.aws.key,
          secret: sails.config.aws.secret,
          region: sails.config.aws.s3Region,
          bucket: sails.config.aws.bucketName,

          // use custom prefix and name for the file
          saveAs: (file, callback) => (
            callback(null, `photobobook-contact-img-${contact.id}-${Date.now()}.${file.filename.split('.')[file.filename.split('.').length - 1]}`)
          ),
        }, (err, [file]) => {
          // update image url for the contact and saving the changes
          contact.imageUrl = sails.config.aws.skipperType === 'disk' ? file.fd : file.extra.Location;
          return contact.save(() => (
            res.json({
              contact,
            })
          ));
        })
      ));
  },
};
