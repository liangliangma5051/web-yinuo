var sYear={};
var oDate = new Date();
var year =  oDate.getFullYear();  // 年
var month =  oDate.getMonth();  // 月( 0-11 )
var date =  oDate.getDate();  // 日
var dataBegin = oDate.getFullYear()

var niankk;

var mySwiperNian,mySwiperYue,mySwiperTian;
// 渲染
var id;
function selectTime(selectNian,a) {
    id=a
    $('#data-mask').show();
    $('.data-select').slideDown()
    niankk = Math.ceil(selectNian)
    nian()
    yue();
    tian();
    mySwiperNian = new Swiper('.swiper-container-nian',{
        direction: 'vertical',
        height:'50'
    });
    mySwiperYue = new Swiper('.swiper-container-yue',{
        direction: 'vertical',
        height:'50'
    });
    mySwiperTian = new Swiper('.swiper-container-tian',{
        direction: 'vertical',
        height:'50',
    })
}
// 渲染年
function nian() {
    // debugger
    let dataLi =$('<li class="swiper-slide" onclick="selectYears(this)"></li>')
    $('.data-years').html('')
    if(niankk < year){
        for(let s=year;s>=niankk;s--){
            dataLi.text(s)
            $('.data-years').append(dataLi.clone())
        }
    }
    else if(niankk-year === 1){
        for(let i=niankk;i>=year;i--){
            dataLi.text(i)
            $('.data-years').append(dataLi.clone())
        }
    }
    else{
        for(let i=niankk;i>=year;i--){
            dataLi.text(i)
            $('.data-years').append(dataLi.clone())
        }
    }

}

// 选择年
function selectYears(event) {
    sYear = {
        n:event.innerHTML,
        y:null,
        d:null,
        id: id
    };
    $(event).addClass('current').siblings().removeClass('current');
    oDate.setFullYear(sYear.n);
    yue()
}



// 渲染月
function yue() {
    let dataLi2 =$('<li class="swiper-slide" onclick="selectMonth(this)"></li>')
    let dataLino =$('<li class="swiper-slide col999"></li>')
    let arr=["01","02","03","04","05","06","07","08","09","10","11","12"];
    $('.data-month').html('')
    if(niankk< dataBegin){
        if(sYear.n == niankk){
            for(let y=0;y<arr.length;y++){
                if(y<month){
                    dataLino.text(arr[y]);
                    $('.data-month').append(dataLino.clone())
                }else{
                    dataLi2.text(arr[y]);
                    $('.data-month').append(dataLi2.clone())
                }

            }
        }
        else if(sYear.n == dataBegin){
            for(let y=0;y<arr.length;y++){
                if(y>month){
                    dataLino.text(arr[y]);
                    $('.data-month').append(dataLino.clone())
                }else{
                    dataLi2.text(arr[y]);
                    $('.data-month').append(dataLi2.clone())
                }

            }
        }
        else{
            for(let y=0;y<arr.length;y++){
                dataLi2.text(arr[y]);
                $('.data-month').append(dataLi2.clone())
            }


        }
    }else{
        if(sYear.n == dataBegin){
            for(let y=0;y<arr.length;y++){
                if(y<month){
                    dataLino.text(arr[y]);
                    $('.data-month').append(dataLino.clone())
                }else{
                    dataLi2.text(arr[y]);
                    $('.data-month').append(dataLi2.clone())
                }

            }

        }
        else if(sYear.n == niankk){
            for(let y=0;y<arr.length;y++){
                if(y>month){
                    dataLino.text(arr[y]);
                    $('.data-month').append(dataLino.clone())
                }else{
                    dataLi2.text(arr[y]);
                    $('.data-month').append(dataLi2.clone())
                }

            }
        }
        else{
            for(let y=0;y<arr.length;y++){
                dataLi2.text(arr[y]);
                $('.data-month').append(dataLi2.clone())
            }
        }
    }
}


// 渲染天
function tian(p) {
    let nian = oDate.getFullYear()
    let dataLi3 =$('<li class="swiper-slide" onclick="selectDay(this)"></li>')
    let dataLino =$('<li class="swiper-slide col999"></li>')
    let yue = oDate.getMonth(); //当前月
    let setDat = new Date(nian,yue,1 - 1);
    let setTian = oDate.getDate();
    // 判断是否是闰年(29) 平年(28)
    function isLeapYear() {
        if(((nian % 4)==0) && ((nian % 100)!=0) || ((nian % 400)==0)) {
            return 1;
        } else {
            return 0;
        }
    }
    let monthDaysArr = [31, 28+isLeapYear(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    $('.data-date').html('')

    if(niankk< dataBegin){
        if(sYear.n == dataBegin && sYear.y == month+1){
            for(let s=1;s<= monthDaysArr[yue]; s++){

                if(s > p){
                    dataLino.text(s);
                    $('.data-date').append(dataLino.clone())
                }else{
                    dataLi3.text(s);
                    $('.data-date').append(dataLi3.clone())
                }

            }
        }
        else{
            for(let s=1;s<= monthDaysArr[yue]; s++){

                if(s < p){
                    dataLino.text(s);
                    $('.data-date').append(dataLino.clone())
                }else{
                    dataLi3.text(s);
                    $('.data-date').append(dataLi3.clone())
                }

            }
        }
    }else{
        if(sYear.n == niankk && sYear.y == month+1){
            for(let s=1;s<= monthDaysArr[yue]; s++){

                if(s > p){
                    dataLino.text(s);
                    $('.data-date').append(dataLino.clone())
                }else{
                    dataLi3.text(s);
                    $('.data-date').append(dataLi3.clone())
                }

            }
        }
        else{
            for(let s=1;s<= monthDaysArr[yue]; s++){

                if(s < p){
                    dataLino.text(s);
                    $('.data-date').append(dataLino.clone())
                }else{
                    dataLi3.text(s);
                    $('.data-date').append(dataLi3.clone())
                }

            }
        }
    }




}

// 选择月
function selectMonth(event){
    if(isNaN(parseInt(sYear.n))){
    }else{
        oDate.setFullYear(parseInt(sYear.n));
    }
    sYear.y= event.innerHTML;
    sYear.d=null;
    oDate.setMonth(parseInt(sYear.y)-1);
    // debugger
    if(niankk < dataBegin){
        if(sYear.n == niankk && parseInt(sYear.y) == month+1){
            tian(date)
        }
        else if(sYear.n == dataBegin &&  parseInt(sYear.y) == month+1){
            tian(date)
        }
        else{
            tian()
        }
    }else{
        if(sYear.n == niankk && parseInt(sYear.y) == month+1){
            tian(date)
        }
        else if(sYear.n == dataBegin &&  parseInt(sYear.y) == month+1){
            tian(date)
        }
        else{
            tian()
        }
    }



    $(event).addClass('current').siblings().removeClass('current');
}
// 选择天
function selectDay(event) {
    sYear.d= event.innerHTML;
    // debugger
    $(event).addClass('current').siblings().removeClass('current');
}




function getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if(day <= n) {
        if(mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    sYear ={
        n:year,
        y:mon < 10 ? ('0' + mon) : mon,
        d:day < 10 ? ('0' + day) : day
    }

    return sYear;
}
console.log();//今天的日期
console.log(getBeforeDate(32));//前七天的日期  　

