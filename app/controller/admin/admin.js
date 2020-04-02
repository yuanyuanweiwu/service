"use strict";

const Controller = require("egg").Controller;

class AdminController extends Controller {
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = "select * from admin_user where userName=? and password=?";
    const res = await this.app.mysql.query(sql, [userName, password]);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: "success", openId };
    } else {
      this.ctx.body = { data: "failed" };
    }
  }
  async getTpeInfo() {
    const resType = await this.app.mysql.select("type");
    this.ctx.body = { data: resType };
  }
  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert("article", tmpArticle);
    console.log(result);
    const isSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess,
      insertId
    };
  }
  async updateArticle() {
    let tmpArticle= this.ctx.request.body
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(result)
    this.ctx.body={
        isSuccess:updateSuccess
    }
  }
  async getArticleList() {
    const result = await this.app.mysql.select("article", {
      orders: [["id", "desc"]]
    });
    this.ctx.body = {
      list: result
    };
  }
}

module.exports = AdminController;
