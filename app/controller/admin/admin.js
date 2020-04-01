'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    this.ctx.body = 'ddd';
  }
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = 'select * from admin_user where userName=? and password=?';
    const res = await this.app.mysql.query(sql, [ userName, password ]);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: 'success', openId };
    
    } else {
      this.ctx.body = { data: 'failed' };
    }
  }
  async getTpeInfo(){
    const resType=await this.app.mysql.select('type')
    this.ctx.body={data:resType}
  }
}

module.exports = AdminController;
