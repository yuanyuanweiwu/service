
'use strict';

module.exports = app => {
  const { router, controller } = app;
  var adminauth=app.middleware.adminauth()
  router.post('/admin/checkLogin', controller.admin.admin.checkLogin);
  router.get('/admin/getTypeInfo',adminauth,controller.admin.admin.getTpeInfo)
  router.post('/admin/addArticle',adminauth,controller.admin.admin.addArticle)
};
