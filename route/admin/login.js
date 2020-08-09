// 导入用户集合构造函数
const { User } = require('../../model/user');
// 引入bcrypt
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    // 接收请求参数
    const {email, password} = req.body;
    // 如果用户没有输入邮件地址
    if( email.trim().length == 0 || password.trim().length == 0 ){
        return res.status(400).render('admin/error', {msg: '邮件地址或密码错误'});
    }
    // 根据邮箱地址查询用户信息
    // 如果查询到用户则是对象类型，没有查询到用户则user变量为空
    let user = await User.findOne({email});
    if(user){
        // 比对密码信息
        let isValid = await bcrypt.compare(password, user.password);
        if(isValid){
            // 登录成功
            // 将用户存储在req中
            req.session.username = user.username;
            // 将用户角色存储在session对象中
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            // 对用户的角色进行判断
            if (user.role == 'admin'){
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            }else {
                // 重定向到博客首页
                res.redirect('/home/');
            }

            
        }else {
            // 登录失败
            res.status(400).render('admin/error', {msg: '邮箱地址或密码错误'});
        }
    }else {
        // 没有查询到用户
        res.status(400).render('admin/error', {msg: '邮箱地址或密码错误'});
    }
}