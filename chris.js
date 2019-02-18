//所有功能JS的家
var chScrollBarMix = {
    checkDevice: function(){
        /*檢查是否為移動裝置*/
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var device = isAndroid || isiOS;

        return device;
    },
    scrollBarW: function(){
        /*算出scrollBar寬度*/
        var a = window.innerWidth,
            b = document.documentElement.clientWidth;

        return a - b;
    },
    lockScroll: function(){
        var checkDevice = chScrollBarMix.checkDevice();

        var body       = document.body,
            html       = document.documentElement,
            checkBar   = chScrollBarMix.scrollBarW(),
            scrollBarW = (checkBar) + 'px';

        var distance  = -( html.scrollTop + body.scrollTop);

        if ( checkDevice === false ) {

            if ( checkBar != 0 ) {
                //pc
                body.style.paddingRight = scrollBarW;
                body.style.overflowY = 'hidden';
            }else {
                //pc(safari)
                body.style.paddingRight = ''
                body.style.overflowY = 'hidden';
            }
            
        }else {
            //行動裝置
            setTimeout(function(){
                body.style.position = 'fixed';
                body.style.overflowY = 'hidden';
                body.style.top = distance;
            },500);
        }

        return distance;
    },
    unlockScroll: function(){
        document.body.style.position = '';
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';
        document.body.style.top = '';
    }
}
/*============================================================================================================================================*/
/*============================================================================================================================================*/
/*============================================================================================================================================*/


/*Ajax lightBox*/
var ajaxLBox = {
    wddBoolean: false,
    active: function(a, id){

        var lbox_switch = $(a);

        lbox_switch.on('click', function(e) {

            e.preventDefault();

            var lbox_checked = ajaxLBox.wddBoolean;

            if (lbox_checked == false) {

                var a = $(this).attr('data-page');

                var b = id;

                ajaxLBox.wddBoolean = true;

                var dist = $(window).scrollTop();

                ajaxLBox.lbox(a, b, dist);

                chScrollBarMix.lockScroll();

            }

        });
    },
    lbox: function(path, id, dist){
        $.ajax({
            url: path,
        })
        .done(function(data) {

            $("body").append("<article class='hideLightbox "+ id +"' data-dist='" + dist + "'></article>");

			$(".hideLightbox").html(data);

            ajaxLBox.func();

			/*給燈箱一個 open 讓動畫作動*/
			if ( $(".hideLightbox").length > 0 ) {

				setTimeout(function(){

					$(".hideLightbox").addClass('open');

				}, 100);

			}
        })
    },
    func: function(){
        if ( $('.textBox').length > 0 ) {

            //關閉按鈕事件
            ajaxLBox.close(800, '.closeBtn');

            //燈箱內要執行的事情
            setTimeout(function(){
                testBox.fire();
            }, 100);
            
        }
    },
    close: function(time, btn){

        var btn  = btn || '.hideLightbox .ajaxClose',
            time = time || 1000;

        var ajaxCloseBtn = $(btn);

        ajaxCloseBtn.on('click',function(){

            var obj = $(this).closest('.hideLightbox');

            var dist = obj.attr('data-dist');

            var lbox_checked = ajaxLBox.wddBoolean;

            if (lbox_checked === true) {

                ajaxLBox.wddBoolean = false;

                obj.addClass('close');

                setTimeout(function(){

                    obj.closest('.hideLightbox').remove();

                    chScrollBarMix.unlockScroll();
                    window.scrollTo(1, dist);

                }, time);

            }

        });
    }
}

var testBox = {
    fire: function(){
        console.log('執行燈箱內功能事件');
    }
}

/*============================================================================================================================================*/
/*============================================================================================================================================*/
/*============================================================================================================================================*/
//各單元頁面 執行的地方
$(document).ready( function(){

    ajaxLBox.active('.ajaxOpenBtn', 'testLightBox');

    console.log('chris.js OK');

});
