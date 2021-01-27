//这只根路径
axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'
// console.log(axios.defaults.baseURL)


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config)
    //         headers: {
    //     Authorization: localStorage.getItem('token')
    // },
    //判断 以my开头的接口需要身份验证
    if (config.url.indexOf('/my') !== -1) {
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  //添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    //对响应回来的status和message做比较
    if (response.data.status === 1 && response.data.message === "身份认证失败！") {
        //认证失败
        localStorage.removeItem('token')
        //跳转至登录界面
        location.href = '/home/login.html'
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  })