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
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update("article", tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(result);
    this.ctx.body = {
      isSuccess: updateSuccess
    };
  }
  async getArticleByID() {
    let id = this.ctx.params.id;
    //  let id = this.ctx.query.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "article.addTime as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=?";
    const result =await this.app.mysql.query(sql, [id]);
    this.ctx.body = { data: result };
  }
  async deletArticle() {
    let id = this.ctx.params.id;
    const result = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = {
      data: result
    };
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
