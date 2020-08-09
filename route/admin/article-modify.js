// 导入文章集合构造函数
const { Article } = require('../../model/article');
// 导入formidable 第三方模块
const formidable = require('formidable'); 
const path = require('path');

module.exports = async (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件的存储位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件的后缀
    form.keepExtensions = true;
    // 解析表单
    // 即将要修改的用户的id
    const id = req.query.id;
    form.parse(req, async (err, fields, files) => {
        // err：错误对象
        // fields：普通表单数据
        // files：上传文件数据
        await Article.updateOne({_id: id},{
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
        // 将页面重定向到文章列表页面
        res.redirect('/admin/article');
    });

}