var fileThis,set;
$.fn.extend({
    // 图片上传
    uploadImg:function(options){
        let _self = this,
            _this = $(this);
        let defaults = {len:5,aspectNum: 4,id:''};
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
            fileThis = _this;
             set = settings;
            for(var i=0;i<this.files.length;i++){
                _self.checkImg(this.files[i])
                let cropperMask= $('<div class="cropper-mask" style="display: block" >\n' +
                    '  <div class="container">\n' +
                    '    <img class=\'image\' src=\'\' >\n' +
                    '  </div>\n' +
                    '  <div class="btn-cropper" onclick="btnCropper(this,fileThis,set,1)">\n' +
                    '    确定\n' +
                    '  </div>\n' +
                    '  <div class="btn-cropper qx" onclick="btnCropperCancel(this)">\n' +
                    '    取消\n' +
                    '  </div>\n' +
                    '<div class="btn-cropper qx cropper-left" onclick="cropperLeft(this)" style= "top:50px">顺时针</div>'+
                    '<div class="btn-cropper cropper-right" onclick="cropperRight(this)" style= "top:50px">逆时针</div>'+
                    '<div class="btn-cropper  cropper-reset" onclick="cropperReset(this)" style= "top:50px;left:50%;margin-left: -35px">重置</div>'+
                    '</div>');
                $(document.body).append(cropperMask)
               var imgDom=  $('.cropper-mask').eq(i).find('img');
                imgDom.attr('src',getObjectURL(this.files[i]))
                var options= {
                    aspectRatio:4 / settings.aspectNum,
                    viewMode : 1,
                    dragMode:'move',
                    cropBoxMovable:false,
                    cropBoxResizable:false,
                    minCropBoxWidth:$(window).width(),
                    toggleDragModeOnDblclick: false
                }
               imgDom.cropper(options)
                $('.cropper-mask .container').css('height',$(window).height()+'px')
                $('.cropper-mask .container').css('width',$(window).width()+'px')
                $('.cropper-mask').eq(0).css('z-index',200)
            }
        })
    },

    // 等待付款倒計時
    countDown: function (options) {
        let _self = this,
            _this = $(this);
        let defaults = {second:3600,hour:false,num:0,isShowH:true};
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
                if(current.value){
                    if (current.getAttribute('pattern').split(',')[1] && !eval(current.getAttribute('pattern').split(',')[1]).test(current.value)) {
                        isTrue = false
                        titleMsg(current.getAttribute('label') + '输入有误')
                        return false;
                    }
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
});

/*// 确定裁剪
function btnCropper(self,fileThis,settings,num) {
    console.log($(self).siblings('.container').find('.image').cropper('getCroppedCanvas').toDataURL())
    /!*let item = ' <div class="item">\n' +
        '<img src="'+$(self).siblings('.container').find('.image').cropper('getCroppedCanvas').toDataURL()+'" alt="">\n' +
        '<div class="delete-img" onclick="deleteImg(this)"><s></s></div>'
    '</div>'
    console.log(settings.id)
    if(fileThis.parent().siblings('.item').length + 1 > settings.len){
        fileThis.parent().hide()
    }else{
        fileThis.parent().before(item)
        if(fileThis.parent().siblings('.item').length === settings.len){
            fileThis.parent().hide()
        }
    }*!/
    $(self).parents('.cropper-mask').remove()
    $('.cropper-mask').eq(0).css('z-index',200)
}*/
// 取消裁剪
function btnCropperCancel(self) {
    $(self).parents('.cropper-mask').remove()
    $('.cropper-mask').eq(0).css('z-index',200)
}
//顺时针旋转45度
function cropperLeft(self) {
    $(self).siblings('.container').find('.image').cropper("rotate", 45);

}
//逆时针旋转45度
function cropperRight(self) {
    $(self).siblings('.container').find('.image').cropper("rotate", -45);
}
//还原裁剪图片
function cropperReset(self) {
    $(self).siblings('.container').find('.image').cropper("reset")
}

function getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}




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

// 图片懒加载
$(function() {
    $("img").lazyload({
        skip_invisible : false,
        threshold : 300,
        effect : "fadeIn",
        event : "sporty",
    });
});
$(window).bind("load", function() {
    var timeout = setTimeout(function() {
        $("img").trigger("sporty")
    }, 300);
});



