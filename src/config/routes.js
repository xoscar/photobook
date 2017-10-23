module.exports.routes = {

  '/': {
    view: 'homepage',
  },

  'get /contacts': 'ContactController.get',
  'get /contacts/:id': 'ContactController.getOne',
  'delete /contacts/:id': 'ContactController.delete',
  'put /contacts/:id': 'ContactController.update',
  'post /contacts': 'ContactController.create',
  'post /contacts/:id/image': 'ContactController.uploadImage',
};
