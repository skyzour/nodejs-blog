const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 接收客户端传递来的参数
    const { username, email, password, role, state } = req.body;
    // 即将要修改的用户的id
    const id = req.query.id;

    let user = await User.findOne({_id: id});
    // 比对密码
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
        // 密码正确
        // 将用户信息更新到数据库中
        await User.updateOne({_id: id}, {
            username,
            email,
            role,
            state
        });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    }else {
        // 密码错误
        let result = {path: `/admin/user-edit`, message: '密码错误，不能进行用户信息的修改', id};
        next(JSON.stringify(result));
    }
}