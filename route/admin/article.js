const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 接收客户端传递来的页码
    const page = req.query.page;
    // 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询所有文章信息
    // page：指定当前页，size：指定每页要显示的数据条数，display：指定客户端要显示的页码数量
    // 向数据库发送查询请求
    let articles = await pagination(Article).page(page).size(2).display(3).find().exec();
    console.log(articles);
    res.render('admin/article', {
        articles
    });
}