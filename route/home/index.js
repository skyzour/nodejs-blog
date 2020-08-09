// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    let page = req.query.page;
    // 从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // 渲染模板文件
    res.render('home/default', {
        result
    });
}