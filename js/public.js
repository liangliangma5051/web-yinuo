



$.fn.extend({
    // 图片上传
    uploadImg:function(options){
        let _self = this,
            _this = $(this);
        let defaults = {type:'checkbox',len:5,};
        let settings = $.extend({},defaults, options);





        _self.checkImg = function (img) {
            var size = img / 1024
            // 验证图片格式
            if(!/image\/\w+/.test(img.type)){
                alert("请确保文件为图像类型");
                return false;
            }
            //验证图片大小
            if(size>5000){
                alert("单张图片不能大于5M");
                return false;
            }

        };

        _this.change(function () {
            for(let i = 0;i<this.files.length;i++){



              /*  $('#btn').click(function () {
                    $('#loadImg').attr('src', $('.container > img').cropper('getCroppedCanvas').toDataURL())

                })*/

                _self.checkImg(this.files[i]);
                let reader = new FileReader();
                reader.readAsDataURL(this.files[i]);
                reader.onload = function(e){
                    $('.cropper-mask .container img').attr('src',this.result)
                    $('.cropper-mask').show()
                    $('.container > img').cropper({
                        aspectRatio: 4 / 3,
                        viewMode: 1,
                    });

                    $('#btn').click(function () {
                        let item = ' <div class="item">\n' +
                            '<img src="'+$('.container > img').cropper('getCroppedCanvas').toDataURL()+'" alt="">\n' +
                            '<div class="delete-img" onclick="deleteImg(this)"><s></s></div>'
                        '</div>'
                        _this.parent().before(item)
                        $('.cropper-mask').hide()
                    })





                }


               /* _self.checkImg(this.files[i]) //验证图片
                console.log(settings.id)
                let reader = new FileReader();
                reader.readAsDataURL(this.files[i]);
                reader.onload = function(e){
                    console.log(settings.id)
                    if(settings.type === 'checkbox'){
                        let item = ' <div class="item">\n' +
                            '<img src="'+this.result+'" alt="">\n' +
                            '<div class="delete-img" onclick="deleteImg(this)"><s></s></div>'
                        '</div>'
                        if(_this.parent().siblings('.item').length + 1 > settings.len){
                            _this.parent().hide()
                        }else{
                            _this.parent().before(item)
                            if(_this.parent().siblings('.item').length === settings.len){
                                _this.parent().hide()
                            }
                        }
                    }
                    else {
                        let itemId = ' <img src="'+this.result+'" alt="">';
                        _this.parent().after(itemId);
                        _this.parent().siblings('.delete-load-id').show();
                        _this.parent().siblings('.id-bj').hide();
                        _this.parent().hide();
                    }
                }*/
            }
        })
    },

    // 等待付款倒計時
    countDown: function (options) {
        let _self = this,
            _this = $(this);
        let defaults = {second:3600,hour:false,num:0,isShowH:false};
        let settings = $.extend({}, defaults, options);

        _self.addZero = function (e) {
            if(parseInt(e)  <= 9){
                return  "0"+ parseInt(e)
            }else{
                return e
            }
        };
        _self.timer = function () {
            setInterval(function (){_self.second()}, 1000);
        };
        _self.second = function () {

            let minH =  Math.floor(settings.second / 3600)
            let minutes = Math.floor(settings.second / 60);
            let seconds = Math.floor(settings.second % 60);
            let msg;
            if(settings.isShowH){


                if(minH < 1){
                    msg = _self.addZero(minutes) + ":" +  _self.addZero(seconds);
                }else{
                    msg = minH +'小时';
                }
                _this.text(msg);
                --settings.second;
            }
            else if (settings.second >= 0) {
                if(settings.hour){
                   if(minH === 1){
                       minutes = minutes - 60
                   }
                    msg = _self.addZero(minH) + ":" +_self.addZero(minutes) + ":" +  _self.addZero(seconds);
                }
                else{
                    msg = _self.addZero(minutes) + ":" +  _self.addZero(seconds);
                }
                _this.text(msg);
                --settings.second;
            }
            else{
                settings.num++
                if(settings.num === 1){
                    clearInterval(_self.timer);
                    titleMsg("时间到，结束!");
                }

            }
        };
        _self.timer()
    },

    //验证
    verification:function (options) {
        let _self = this,
            _this = $(this);
        let defaults = {num:0};
        let settings = $.extend({}, defaults, options);
        let isTrue = true
        _self.isNull = function () {
            _this.find('[pattern]').each(function (index,current) {
                if(current.getAttribute('pattern').split(',')[0] == 1){
                    if(current.value === "" && current.value.trim() === "" ){
                        isTrue = false
                        titleMsg(current.getAttribute('label')+'不能为空')
                        return false;
                    }
                }
                else if(current.getAttribute('pattern') == 'itemIsNull'){
                    if($(current).find('.item').length === 0){
                        isTrue = false
                        titleMsg(current.getAttribute('label')+'不能为空')
                        return false;
                    }
                }
            })
        };
        _self.isOk = function () {
            _this.find('[pattern]').each(function (index,current) {
                if (current.getAttribute('pattern').split(',')[1] && !eval(current.getAttribute('pattern').split(',')[1]).test(current.value)) {
                    isTrue = false
                    titleMsg(current.getAttribute('label') + '输入有误')
                    return false;
                }
            })
        };
        _self.isNull();
        if(isTrue){
            _self.isOk()
        }
        if(isTrue){
            return true
        }else{
            return false
        }

    },



    //年月日时间选择
    selectDate: function (options) {
        let _self = this,
            _this = $(this);
        let defaults = {num:0};
        let settings = $.extend({}, defaults, options);
        data()
    }

});






// 提示信息
function titleMsg(msg) {
    let titleText =$(" <!--报错信息-->\n" +
        "  <div class=\"title-msg\" onclick=\"this.style.display='none'\">\n" +
        "    <div class=\"col\">\n" + msg+
        "    </div>\n" +
        "  </div>")
    let titleDom= $('.title-msg');
    if($(document.body).find(titleDom) && $(document.body).find(titleDom).length === 0){
        $(document.body).append(titleText)
    }
    $('.title-msg .col').text(msg)
    $('.title-msg').show();
    setTimeout(function () {
        $('.title-msg').hide()
    },3000)
}






