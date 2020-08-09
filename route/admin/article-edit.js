// 引入文章集合构造函数
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 获取id参数
    const { message, id } = req.query;
    // 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 如果当前传递了id参数
    if(id){
        // 修改操作
        let article = await Article.findOne({_id: id});
        res.render('admin/article-edit', {
            message,
            article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    }else {
        // 添加操作
        res.render('admin/article-edit', {
            message,
            link: '/admin/article-add',
            button: '添加'
        });
    }
}