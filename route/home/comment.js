// 导入文章集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    const { content, uid, aid } = req.body;
    // 将评论信息存储到数据库中
    await Comment.create({
        content,
        uid,
        aid,
        time: new Date()
    });

    // 将页面重定向回文章详情页面
    res.redirect(`/home/article?id=${aid}`);
}