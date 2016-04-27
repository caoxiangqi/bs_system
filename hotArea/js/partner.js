// partner
(function() {
    // load 
    //$('body').append('<div class="tip-box" id="J_tip_box"></div>');
    //$('#J_tip_box').load("/tip_ajax.html")
    // click remember
    var btn = jQuery('.J_btn_A');
    btn.click(function() {
        //$('#J_mask').show();
        //$('#J_tip_1').show();
        
        // close
        // $('#J_tip_1 .J_close_1').bind('click', function() {
        //     //$('#J_mask').hide();
        //     $('#J_tip_1').hide();
        // })


        // var url = parent.location.href;
        // var index = url.indexOf('=');
        var type = 4;
        jQuery.post('/OperationAjax/AddUserOperation', {'orderType': type}, function(data) {
            

        })
    })
    





    var url = location.href,
        index = url.indexOf('='),
        id = url.substr(index + 1);
    function setCookie(cookiename, cookievalue, hours) {
        var date = new Date();
        date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
        document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();

        }
            //read COOKIE
        function getCookie(cookiename) {
        var result;
        var mycookie = document.cookie;
        var start2 = mycookie.indexOf(cookiename + "=");
        if (start2 > -1) {
        start = mycookie.indexOf("=", start2) + 1;
        var end = mycookie.indexOf(";", start);

        if (end == -1) {
        end = mycookie.length;
        }

        result = unescape(mycookie.substring(start, end));
        }

        return result;
        }
        // get id
        setTimeout(function() {
            var id = document.getElementById('J_partner');
            
            if(id) {
                //clearInterval(timer);
                //console.log(id);
            }
		
            if(!id && parent.location.href.indexOf('template') != -1) {
		
                //alert('非法操作！！');
                setTimeout(function() {
                   // location.href = 'http://www.chuangweikeji.cn/res/nav/hezuo.html';

                }, 500);	

            } 
        }, 3500);
       

})();