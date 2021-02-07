function getDayNew(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    var tTime = today.getHours() + ":" + today.getMinutes();
    tMonth = doHandleMonthNew(tMonth + 1);
    tDate = doHandleMonthNew(tDate);
    return tYear + "-" + tMonth + "-" + tDate + " " + tTime;
}

function doHandleMonthNew(month) {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}

window.AppEnter = {
    //公用的轮询变量
    junminInterval: null,
    hszyddInterval: null,
    RemoveInterval: function () {
        clearInterval(AppEnter.junminInterval)
        clearInterval(AppEnter.hszyddInterval)
    },
    //公用信息提示框
    ComAlert: function (title, html, width, height, fun) {
        this.ShowAlert = function (title, html, btntext, fun) {
            AppEnter.ComAlertClose()
            var Html = '';
            if (btntext != "") {
                Html = '<div id="comalertMess" class="ComAlert" style="width:' + (width != "" && width != undefined ? width : '') + ' ;height: ' + (height != "" && height != undefined ? height : '') + ';">'
               + '<div id="comalertMessT" class="ComAlertTitle">' + title + '</div>'
               + '<div class="ComAlertContent">'
               + html
               + '</div>'
                + '<div id="" style="text-align: right;font-size: 1.7vh;color: #fff;margin-top:15px"><span id="zhyspthbtnOn" class="zhyspthbtn">' + btntext + '</span></div>'
               + '</div>'
            }
            else {
                Html = '<div id="comalertMess" class="ComAlert" style="width:' + (width != "" && width != undefined ? width : '') + ' ;height: ' + (height != "" && height != undefined ? height : '') + ';">'
               + '<div id="comalertMessT" class="ComAlertTitle">' + title + '</div>'
               + '<div class="ComAlertContent">'
               + html
               + '</div>'
               + '</div>'
            }
            if ($("#comZheZhao").length <= 0) {
                Html = Html + '<div id="comZheZhao" style="z-index: 998;background: rgba(0,0,0,0.5);width: 100vw;height: 100vh;position: fixed"></div>'
            }
            $("body").prepend(Html)
            if (typeof fun == "function") {
                $("#zhyspthbtnOn").unbind("click").click(function () {
                    fun()
                    AppEnter.ComAlertClose()
                })
            }
            else {
                $("#zhyspthbtnOn").unbind("click").click(function () {
                    AppEnter.ComAlertClose()
                })
            }
        }
    },
    ComAlertClose: function () {
        $(".ComAlert").remove()
        $("#comZheZhao").remove()
    },
    //公用表单验证-因时间有限，操作dom没有封装，后期改正
    formCheckCom: function (formid, callback) {
        function BJ(bigobj, smallobj) {
            var flag2 = true
            if (smallobj.val() >= bigobj.val()) {
                smallobj.removeClass("tableError tableSucess").addClass("tableErrorJw");
                bigobj.removeClass("tableError tableSucess").addClass("tableErrorJw");
                if (bigobj.next().length > 0) {
                    $(this).next().remove()
                }
                bigobj.after(
                    '<div class="formCheckMessage">' + bigobj.attr("data-dbmessage")
                    + '</div>')
                bigobj.parent().parent().css("margin-bottom",
                    bigobj.next().height() + 5 + "px")
                flag2 = false
            }
            //回调
            if (typeof callback == "function") callback && callback(flag2)
            return flag2
        }

        var flag = true;
        $("#" + formid + " input[data-require=require]" + ",#" + formid + " textarea[data-require=require]").each(function () {
            var reg = eval($(this).attr("data-reg"));
           
           
            if ($(this).val() == "") {
                $(this).addClass("tableError");
                flag = false;
            }
            else {
                if (reg == "" || reg == undefined || reg == null) {
                    $(this).removeClass("tableError tableErrorJw").addClass(
                        "tableSucess");

                }
                else if (!reg.test($(this).val())) {
                    $(this).removeClass("tableError tableSucess").addClass(
                        "tableErrorJw");
                    flag = false;
                    if ($(this).next().length > 0) {
                        $(this).next(".formCheckMessage").remove()
                    }
                    $(this).after(
                        '<div class="formCheckMessage">' + $(this).attr("data-yzmessage")
                        + '</div>')
                    $(this).parent().parent().css("margin-bottom",
                        $(this).next().height() + 5 + "px")
                    //
                }
                else {
                    $(this).removeClass("tableError tableErrorJw").addClass(
                        "tableSucess");
                    if ($(this).next().length > 0) {
                        $(this).next(".formCheckMessage").remove()
                    }
                    if ($(this).parent().parent().find(".formCheckMessage").length == 0) {
                        $(this).parent().parent().css("margin-bottom", "15px")
                    }
                    if ($(this).attr("data-toname") != "" && $(this).attr("data-toname")
                        != undefined) {
                        flag = BJ($(this), $("input[name=" + $(this).attr("data-toname") + "]"))
                    }
                }
            }
        })
        return flag;
    },
    formCheckComReset: function (formid) {
        $("#" + formid + " input[data-require=require]").val("")
        $("#" + formid + " input[data-require=require]").removeClass(
            "tableError tableErrorJw tableSucess")
        $("#" + formid).find(".formCheckMessage").remove()
    },
    // 公用动画添加
    actionIn: function (obj, actionName, time, speed) {
        $(obj).show();
        $(obj).css({
            "animation": actionName + " " + time + "s" + " " + speed,
            "animation-fill-mode": "forwards"
        });
    },
    actionOut: function (obj, actionName, time, speed) {
        $(obj).css({ "animation": actionName + " " + time + "s" + " " + speed });
        var setInt_obj = setInterval(function () {
            $(obj).hide();
            clearInterval(setInt_obj);
        }, time * 1000);
    },
    //公用拖拽
    isDraging: false,
    g: function (id) {
        return document.getElementById(id)
    },
    //鼠标按下
    Move_Part_Mousedown: function (id, startid) {
        //声明需要用到的变量
        var mx = 0, my = 0;      //鼠标x、y轴坐标（相对于left，top）
        var dx = 0, dy = 0;      //对话框坐标（同上）

        //不可拖动
        AppEnter.g(startid).addEventListener('mousedown', function (e) {
            var e = e || window.event;
            mx = e.pageX;      //点击时鼠标X坐标
            my = e.pageY;      //点击时鼠标Y坐标
            dx = AppEnter.g(id).offsetLeft;
            dy = AppEnter.g(id).offsetTop;
            AppEnter.isDraging = true;      //标记对话框可拖动
        });
        document.onmousemove = function (e) {
            var e = e || window.event;
            var x = e.pageX;      //移动时鼠标X坐标
            var y = e.pageY;      //移动时鼠标Y坐标
            if (AppEnter.isDraging) {        //判断对话框能否拖动
                var moveX = dx + x - mx;      //移动后对话框新的left值
                var moveY = dy + y - my;      //移动后对话框新的top值
                AppEnter.g(id).style.left = moveX + 'px';       //重新设置对话框的left
                AppEnter.g(id).style.top = moveY + 'px';     //重新设置对话框的top

            }
        }
    },
    //鼠标离开
    Move_Part_Mouseup: function (id) {
        AppEnter.g(id).addEventListener('mouseup', function () {
            AppEnter.isDraging = false;
        })
    },
    //设置拖动范围
    Set_Area: function (id) {
        var pageW = document.documentElement.clientWidth;
        var pageH = document.documentElement.clientHeight;
        var JdialogW = AppEnter.g(id).offsetWidth;
        var JdialogH = AppEnter.g(id).offsetHeight;
        var maxX = pageW - JdialogW;       //X轴可拖动最大值
        var maxY = pageH - JdialogH;       //Y轴可拖动最大值
        var moveX = Math.min(Math.max(0, moveX), maxX);     //X轴可拖动范围
        var moveY = Math.min(Math.max(0, moveY), maxY);     //Y轴可拖动范围

        AppEnter.g(id).style.left = moveX + 'px';       //重新设置对话框的left
        AppEnter.g(id).style.top = moveY + 'px';        //重新设置对话框的top
    },
    //=========================================================================以此为分割线,下方属于改变内容
    //短信管理相关
    SendUser: function () {
        //AppEnter.formCheckComReset("DXForm")
        $("#pickList").html("")
        //点击筛选
        var pick;
        $("#UserSx").unbind("click").click(function () {
            //if (!AppEnter.formCheckCom("DXForm", function (e) {
            //  if (e) $("#pickList").html("")
            //})) return false
            new AppEnter.ComAlert().ShowAlert("系统提示", "正在筛选数据，请稍等...", "", function () { })

            var PicklistData = {}
            var PicklistDataSelect = {}
            // //输入参数点击筛选，返回数组
            $.ajax({
                type: 'POST',
                dataType: "json",//返回数据类型  
                data: $("#DXForm").parseForm(),
                //async: false,
                url: "/api/OnlyTestManage/GetPageNotPage",//请求的action路径 
                success: function (result) { //请求成功后处理函数。  取到Json对象data
                    if (result.data.length > 0) {
                        $.each(result.data, function (key, val) {
                            PicklistData[val.KHMC] = { "id": key, "text": val };
                            pick = $("#pickList").pickList({ data: PicklistData, dataSelect: PicklistDataSelect })
                            $("#messageInro").css("display", "block")
                        })
                    }
                    else {
                        swal("系统提示", "找不到筛选条件下的学员", "error")
                    }
                    AppEnter.ComAlertClose()
                },
                error: function () {//请求失败处理函数    
                    swal("系统提示", "网络异常请稍后重试。", "warning")
                    AppEnter.ComAlertClose()
                }
            })
            $("#fasongBtn").unbind("click").click(function () {
                if (pick.getValues().length <= 0) {
                    $(".pickListResult").addClass("tableErrorJw")
                    swal("系统提示", "请选择接收短信的学员。", "info")
                }
                else {
                    var aimcodes=""
                    $.each(pick.getValues(), function (i,v) {
                        aimcodes+= v.KHZH+","
                    })
                    aimcodes = aimcodes.substring(0, aimcodes.length - 1)
                    if (aimcodes.split(",").length > 4500) {
                        swal("系统提示", "单次群发最多只能选择4500学员。", "error")
                    }
                    else {
                        if ($("textarea[name=content]").val() == "") {
                            swal("系统提示", "请填写短信内容。", "error")
                            return false
                        }
                        else {
                            new AppEnter.ComAlert().ShowAlert("系统提示", "正在发送...", "", function () { })
                            $.ajax({
                                type: 'POST',
                                dataType: "json",//返回数据类型  
                                data: { aimcodes: aimcodes, content: $("textarea[name=content]").val() },
                                //async: false,
                                url: "/api/SendMessage/Send",//请求的action路径 
                                success: function (result) { //请求成功后处理函数。  取到Json对象data            
                                    if (result.success)
                                    {
                                        window.JAlertOptions.CloseTkAll()
                                        Query()
                                        swal("系统提示", "发送成功", "success")
                                    }
                                    else {
                                        swal("系统提示", "发送失败", "error")
                                    }
                                    AppEnter.ComAlertClose()
                                },
                                error: function () {//请求失败处理函数    
                                    swal("系统提示", "网络异常请稍后重试。", "warning")
                                    AppEnter.ComAlertClose()
                                }
                            })
                        }                        
                    }
                }
            })
        })

        $("#fasongBtn").unbind("click").click(function () {
            if ($("#messageInro").css("display")=="none") {
                swal("系统提示", "请点击筛选按钮，选择接收短信的学员。", "info")
            }
        })

        $("input[name=StartIime],input[name=EndTime]").datetimepicker({
            language: "zh-CN",
            autoclose: true,//选中之后自动隐藏日期选择框
            clearBtn: true,//清除按钮
            minView: 1,
            todayBtn: "linked",//今日按钮,"linked"为点击获取今日
            format: 'yyyy-mm-dd hh:ii'//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
        });
        //$('input[name=SIime]').datetimepicker('setDate', new Date(getDayNew(-1)));
        //$('input[name=ETime]').datetimepicker('setDate', new Date(getDayNew(0)));
    },
    InputSendMess: function () {
        $("#shouxieBtn").click(function () {
            if (!AppEnter.formCheckCom("InputSendForm", function (e) {
              console.log(e)
            })) return false

            new AppEnter.ComAlert().ShowAlert("系统提示", "正在发送...", "", function () { })
            $.ajax({
                type: 'POST',
                dataType: "json",//返回数据类型  
                data: { aimcodes: $("#aimcodesTwo").val(), content: $("textarea[name=contentTwo]").val() },
                //async: false,
                url: "/api/SendMessage/Send",//请求的action路径 
                success: function (result) { //请求成功后处理函数。  取到Json对象data            
                    if (result.success) {
                        window.JAlertOptions.CloseTkAll()
                        Query()
                        swal("系统提示", "发送成功", "success")
                    }
                    else {
                        swal("系统提示", "发送失败", "error")
                    }
                    AppEnter.ComAlertClose()
                },
                error: function () {//请求失败处理函数    
                    swal("系统提示", "网络异常请稍后重试。", "warning")
                    AppEnter.ComAlertClose()
                }
            })
        })
    }
};

