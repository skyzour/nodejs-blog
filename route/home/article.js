// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入文章评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // 获取从客户端传递来的id值
    const id = req.query.id;
    // 根据id查询文章详细信息
    let article = await Article.findOne({_id: id}).populate('author');
    // 根据id查询文章评论信息
    let comments = await Comment.find({aid: id}).populate('uid');
    res.render('home/article', {
        article,
        comments
    });
}