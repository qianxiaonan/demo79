$("#gotoRegi").click(function () {
  $(".regiBox").show();
  $(".loginBox").hide();
});
$("#gotoLogin").click(function () {
  $(".regiBox").hide();
  $(".loginBox").show();
});

let form = layui.form;
form.verify({
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

  repass: function (value, item) {
    let pwd = $(".regiBox [name=password]").val();
    // console.log(value, pwd)
    if (value !== pwd) {
      return "两次密码不一致";
    }
  },
});

//   -----------------------------------注册ajax
$(".regiBox form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  axios
    .post("/api/reguser", data)
    .then((res) => {
      console.log(res);
      if (res.data.status !== 0) {
        //注册失败
        return layer.msg(res.data.message);
      }
      //注册成功
      layer.msg("注册成功");
      $("#gotoLogin").click()
    });
});

// ------------------------------------登录ajax
$('.loginBox form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize()
    axios.post('/api/login', data).then((res) => {
        console.log(res)
        if (res.data.status !== 0) {
            //登录失败
            return layer.msg(res.data.message)
        }
        //存储到本地
        localStorage.setItem('token', res.data.token)
        layer.msg('登录成功,即将跳转至首页', function(){
            location.href = '/home/index.html'
          });
    })
})
