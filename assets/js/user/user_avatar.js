$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //============================ 点击上传,模拟点击文件域  ============================ 
    $('#chooseBtn').click(function () {
        $('#file').click()
    })

    //============================  文件域 有一个change事件  ============================
    $('#file').on('change', function () {
        // console.log('-------------');
        //1.获取到用户选择的图片  文件域DOM对象有个files属性
        let file = this.files[0]   //[0]转为DOM对象
        // console.log(file);   //用户选择的文件
        //2.把用户选择的图片设置到裁剪区域   预览区域和裁剪区域的图片大小都要改变
        
        //判断 如果file不存在,用户没有选择图片,后续操作不执行  //不设置就会报错
        if (!file) {
            return
        }
        let newImgURL = URL.createObjectURL(file)  //file拿到的是用户选择的文件

        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })

    //============================  点击确定,实现上传头像  ============================  
    $('#sureBtn').click(function () {
        // console.log(1);
        let dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // console.log(dataURL)  //选择的图片转为base64 格式的字符串
        
        //发送ajax请求
        // axios.post('/my/update/avatar', '查询字符串格式')
        //以下写法错误的base64 格式的字符串含有特殊符号,必须得对编码进行特殊处理
        // axios.post('/my/update/avatar', 'avatar=' + dataURL).then(res => {
        //     console.log(res)
        // })
        axios.post('/my/update/avatar', 'avatar=' + encodeURIComponent(dataURL)).then(res => {
            // console.log(res)

            //提示
            if (res.data.status !== 0) {
                return layer.msg('更新头像失败')
            }
            layer.msg('更新头像成功')

            //更新头像成功 让页面头像与index页面头像一致 统一更换  
            // console.log(window.parent);  //有getUserInfo的方法
            window.parent.getUserInfo()
        })
    })
})