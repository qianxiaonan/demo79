let form = layui.form;
// ======================================= 发送ajax请求 ============================
getArtCate()
function getArtCate() {
    
    axios.get('/my/article/cates').then(res => {
        // console.log(res)
        //将模板和数据相结合
        let htmlStr = template('trTpl', res.data)
        $('tbody').html(htmlStr)
    })
}

//============================点击添加按钮,绑定事件 ==========================
let index   //存储弹出层的索引，用于后面close关于弹出层使用
$('#addBtn').click(function () {
    //layui 弹出层里的open方法
     index = layer.open({
        type:1,  //页面层, 默认0是有确定按钮的
        title: '添加文章分类',  //标题
        content: $('#addFormTpl').html(),   //内容
        //通过添加分类的form表单模板的id,用html方法拿到内容
        area: '500px'   //设置宽度
      });
})

//===========================给form表单注册submit事件 ========================
//from表单是动态生成的,要用事件委托
// $('form').on('submit', function (e) {
//     e.preventDefault()
//     console.log(1);
// })

$('body').on('submit', '#addForm', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    //发送ajax请求获取数据
    axios.post('/my/article/addcates', data).then(res => {
        // console.log(res);
        if (res.data.status !== 0) {
            return layer.msg('新增文章分类失败！')
        }
        //成功
        //提示
        layer.msg('新增文章分类成功！')
        //关闭弹出层
        layer.close(index)
        //重新获取数据
        getArtCate()
    })
})

// ======================= 编辑功能 =====================
// 编辑按钮是动态创建的,要用事件委托注册点击事件
let editIndex   //存储弹出层的索引，用于后面close关于弹出层使用
$('body').on('click', '.enditBtn', function () {
    //获取当前编辑按钮上的自定义属性data-id的值,发送ajax请求获取到数据
    let id = $(this).attr('data-id')
    // console.log(id);

    //发送ajax请求
    axios.get('/my/article/cates/' + id).then(res => {
        // console.log(res);
        // 填充表单数据
        form.val('editForm', res.data.data)
    })

    //layui 弹出层里的open方法
    editIndex = layer.open({
        type:1,  //页面层, 默认0是有确定按钮的
        title: '修改文章分类',  //标题
        content: $('#editFormTpl').html(),   //内容
        //通过添加分类的form表单模板的id,用html方法拿到内容
        area: '500px'   //设置宽度
      });
})

//实现编辑功能   给表单注册submit事件 用事件委托的方法
$('body').on('submit', '#editForm', function (e) {
    e.preventDefault()

    let data = $(this).serialize()
    // console.log(data);

    //发送ajax请求
    axios.post('/my/article/updatecate', data).then(res => {
        // console.log(res);
        if (res.data.status !== 0) {
            //更新失败
            return layer.msg('更新失败')
        }

        //成功
        //提示成功
        layer.msg('更新分类数据成功')
        //关闭弹出层
        layer.close(editIndex)
        //重新获取数据
        getArtCate()
    })
})

//// ============= 删除功能 ==============
$('tbody').on('click', '.delBtn', function () {
    let id = $(this).attr('data-id')
    // console.log(id);
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
        //do something

        //发送ajax请求
        axios.get('/my/article/deletecate/' + id).then(res => {
            // console.log(res);

            if (res.data.status !== 0) {
                //失败
                return layer.msg('删除文章分类失败！')
            } 
            layer.msg('删除文章分类成功！')

            layer.close(index);
            getArtCate()
        })
        
      });
})