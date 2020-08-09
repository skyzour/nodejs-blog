const guard = (req, res, next) => {
    // 判断用户访问的是否为登录页面
    // 判断用户的登录状态
    if(req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    }else {
        // 用户已登录，且是普通用户
        if(req.session.role == 'normal'){
            return res.redirect('/home/');
        }
        next();
    }
}

module.exports = guard;