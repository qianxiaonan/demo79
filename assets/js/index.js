function getUserInfo() {
    //发送请求
    axios.get('/my/userinfo', {
    //     headers: {
    //     Authorization: localStorage.getItem('token')
    // },
}).then(res => {
        // console.log(res)
        //判断
        if (res.data.status === 1) {
            //失败
            return layer.msg('获取用户信息失败')
        }
        
        //获取用户信息成功  处理头像和名字
        avatarAndName(res.data)
    })
}
getUserInfo()

function avatarAndName(res) {
    // console.log(res)
    //处理名字, 优先展示nickname
    let name = res.data.nickname || res.data.username
    // console.log(name)
    $('#welcome').text('欢迎' + name)

    //处理头像
    if (res.data.user_pic) {
        //用户有自己的头像,展示,隐藏文字头像
        $('.layui-nav-img').attr('src', res.data.user_pic).show()
    } else {
        //用户有自己的头像,隐藏,显示文字头像
        let first = name[0].toUpperCase()
        $('.test_avatar').text(first).show()
    }
}

$('#loginOut').click(function () {
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        //删除token
        //跳转至登录页面
        localStorage.removeItem('token')
        location.href = '/home/login.html'
        layer.close(index);
      });
})