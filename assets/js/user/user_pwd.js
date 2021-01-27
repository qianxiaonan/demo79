$(function () {
    //=============================  添加表单的自定义校验规则  =============================
    let form = layui.form
    form.verify({
        //对原密码的校验
       pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
       //对新密码的校验
       newPass : function (value) {
        //    console.log(value);
           //获取原密码的内容   跟新密码比较  如果相同提示新密码不能与原密码相同
           let oldPwd = $('[name=oldPwd]').val()
        //    console.log(oldPwd)
        if (oldPwd === value) {
            return '新密码不能与原密码相同'
        }
       },

       //确认新密码的校验
       reNewPass: function (value) {
           //获取到新密码  与确认密码进行比较  如果输入结果不相同  提示两次输入的密码不一致
           let newPwd = $('[name=newPwd]').val()
        //    console.log(newPwd)
        if (newPwd !== value) {
            return '两次输入的密码不一致'
        }
       }
      });
      
      //============================= 实现修改密码  ============================= 
      //给表单注册submit事件
      $('#form').on('submit', function (e) {
          //阻止表单默认跳转
          e.preventDefault()
          let data = $(this).serialize()
        //   console.log(data);
          //发送ajax请求
          axios.post('/my/updatepwd', data).then(function (res) {
            //   console.log(res);
            // 如果status !== 0 修改密码失败
            if (res.data.status !== 0) {
                //失败
                return layer.msg(res.data.message)
            }
            //成功
            layer.msg("更新密码成功! ")
            //表单重置功能
            $('#form')[0].reset()
          })
      })
})