'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getArticleList() {
    const sql = 'select article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime , \'%Y-%m-%d %H:%I:%S\') as addTime, article.artical_content as content,article.view_count as view_count ,type.typeName as typeName from article left join type on article.type_id=type.id';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = HomeController;
