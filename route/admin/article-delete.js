// 导入文章集合构造函数
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 获取从客户端传递来的id值
    let id = req.query.id;
    // 通过id值将文章从数据库中删除
    await Article.findOneAndDelete({_id: id});
    // 将页面重定向回文章列表页面
    res.redirect('/admin/article');
}