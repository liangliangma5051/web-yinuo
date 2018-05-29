var fileThis;
var set;
var cropBoxData , canvasData;
var y=1;
var imgDom;
var  options = {
   /* aspectRatio: 16 / 9,
    viewMode: 1,

    cropBoxResizable:false,
    cropBoxMovable:false,
    dragCrop:false,
    dragMode: 'move',
    responsive:false,*/
}
$.fn.extend({
    // 图片上传
    uploadImg:function(options){
        let _self = this,
            _this = $(this);
        let defaults = {len:5,aspectNum: 3,id:''};
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
                let fileImg=this.files[i]
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
                    '<div class="cropper-left" onclick="cropperLeft(this,set)" style= "position: absolute;top:50px;left:100px;background: white">dkja</div>'+
                    '<div class="cropper-right" onclick="cropperRight(this,set)" style= "position: absolute;top:50px;right:100px;background: white">dkja</div>'+
                    '</div>');
                // cropperMask
                $(document.body).append(cropperMask)
                 imgDom=  $('.cropper-mask').eq(i).find('img');
                imgDom.attr('src',getObjectURL(this.files[i]))
                options= {
                    aspectRatio:2/1,
                    viewMode : 1,
                    dragMode:'move',
                    cropBoxMovable:false,
                    cropBoxResizable:false,
                    minCropBoxWidth:$(window).width(),
                    toggleDragModeOnDblclick: false,


                   /* viewMode: 3,
                    dragMode: 'move',
                    minCropBoxWidth:$(window).width(),
                    minCanvasWidth:$(window).width(),
                    dragCrop:false,
                    autoCropArea: 1,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    toggleDragModeOnDblclick: false,*/


                }
                // imgDom.cropper(options)

                var cropper = imgDom.cropper(options)
                console.log(cropper)
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



});
// 确定裁剪
function btnCropper(self,fileThis,settings,num) {

        let item = ' <div class="item">\n' +
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
        }
        $(self).parents('.cropper-mask').remove()
        $('.cropper-mask').eq(0).css('z-index',200)



}
// 取消裁剪
function btnCropperCancel(self) {
    $(self).parents('.cropper-mask').remove()
    $('.cropper-mask').eq(0).css('z-index',200)
}
//
function cropperLeft() {
    imgDom.cropper("rotate", 45);
    console.log(imgDom.rotate)

}
function cropperRight() {
    imgDom.cropper("rotate", -45);

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






