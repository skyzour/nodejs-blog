const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递来的当前页参数
    let page = req.query.page || 1;
    page = page < 1 ? 1 : page;
    // 每一页显示的数据条数
    let pagesize = 5;
    // 查询用户数据的总数
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pagesize);
    page = page > total ? total : page;
    // 分页查询
    let users = await User.find().limit(pagesize).skip((page-1) * pagesize);

    // 渲染用户列表模块
    res.render('admin/user', {
        users,
        page: page,
        total: total
    });
}