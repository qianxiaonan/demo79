$(function () {
    // ========================================发送ajax请求获取用户信息==============================
    let form = layui.form
    function getUserInfo() {
        axios.get('/my/userinfo').then(res => {
            // console.log(res.data.data)
            //给表单赋值  //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
            form.val("form", res.data.data);
        })
    }
    getUserInfo() 

    //========================================   表单校验  ========================================
    form.verify({
        //对用户昵称做个长度的限制
        nickname: function (value, item) {
            // console.log(value)
            if (value.length > 6) {
                return "昵称长度需要在1-6个字符"
            }
        }
      });      

    //========================================  实现修改功能  ========================================
    // 需要在子页面  去修改父页面index页面的内容
    //通过ajax提交表单数据
    //给form表单注册submit事件
    $('#form').on('submit', function (e) {
        //阻止表单默认跳转
        e.preventDefault()
        let data = $(this).serialize()
        // console.log(data);  //  id=600&username=demo456&nickname=test%20&email=123456%40qq.com
        axios.post('/my/userinfo', data).then(res => {
            console.log(res)
            //判断  
            if (res.data.status !== 0) {
                return layer.msg('修改用户信息失败')
            }
            layer.msg('修改用户信息成功！')

            //window.parent =>可以获取父元素index页面的window对象 里有getUserInfo的方法
            // console.log(window.parent)
            window.parent.getUserInfo()
        })
    })


    //======================================== 重置功能  ========================================
    //点击重置按钮  绑定事件
    // $('#resetBtn').click(function (e) {
    //     //阻止默认跳转行为
    //     e.preventDefault()
    //     // console.log(1)
    //     //再次发送ajax请求,获取用户信息
    //     getUserInfo() 
    // })
})