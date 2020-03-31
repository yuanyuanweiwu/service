
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/admin/checkLogin', controller.admin.admin.checkLogin);
};
