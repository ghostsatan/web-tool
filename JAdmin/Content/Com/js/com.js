function IsStarCom(rec) {
    var recstr = decodeURI(rec);
    var parm = JSON.parse(recstr);
    var str=""
    if (parm.IsStar == "1") {
        str="确定要取消标记？"
    }
    else {
        str ="确定标记该条数据已经打印?"
    }
    swal({
        title: "",
        text: str,
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#058be9",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: 'POST',
                dataType: "json",  
                data: parm,
                async: false,
                url: "/api/WorkFlow/SetIsStar",
                success: function (result) { 
                    Query()
                    swal.close()
                },
                error: function (e) {//请求失败处理函数    
                    console.log(e)
                    swal.close()
                }
            })
        } else {
            swal.close()
        }
    })
}
function checkZhaoTao() {
    if (localStorage.getItem("ZHANGTAO_CODE")) {
        return true
    }
    else {
        swal({
            title: "",
            text: "尚未选择账套",
            type: "",
            confirmButtonText: "关闭"
        }, function () { })
        return false
    }
}
function getZhaoTaoObj() {
    var obj = {
        "DANWEI_CODE": localStorage.getItem("DANWEI_CODE"),
        "DANWEI_NAME": localStorage.getItem("DANWEI_NAME"),
        "DANWEI_SHORT_NAME": localStorage.getItem("DANWEI_SHORT_NAME"),
        "ZHANGTAO_CODE": localStorage.getItem("ZHANGTAO_CODE"),
        "ZHANGTAO_NAME": localStorage.getItem("ZHANGTAO_NAME")
    }
    return obj;
}
function setUserCom() {
    var obj = JSON.parse($("#USER").val());
    localStorage.setItem("USER_ID", obj.USER_ID);
    localStorage.setItem("USER_NAME", obj.USER_NAME);
    localStorage.setItem("FULL_NAME", obj.FULL_NAME);
    localStorage.setItem("USER_DANWEI_CODE", obj.DANWEI_CODE);
    localStorage.setItem("USER_DANWEI_SHORT_NAME", obj.DANWEI_SHORT_NAME);
    localStorage.setItem("ROLE_NAME", obj.ROLE_NAME);
    localStorage.setItem("isukeycheck", obj.isukeycheck);

    localStorage.setItem("MoneyID", obj.MoneyID);
    localStorage.setItem("ImportantID", obj.ImportantID);
    localStorage.setItem("SealID", obj.SealID);
}
function getUserCom() {
    var obj = {
        "USER_ID": localStorage.getItem("USER_ID"),
        "USER_NAME": localStorage.getItem("USER_NAME"),
        "FULL_NAME": localStorage.getItem("FULL_NAME"),
        "USER_DANWEI_CODE": localStorage.getItem("USER_DANWEI_CODE"),
        "USER_DANWEI_SHORT_NAME": localStorage.getItem("USER_DANWEI_SHORT_NAME"),
        "ROLE_NAME": localStorage.getItem("ROLE_NAME"),
        "isukeycheck": localStorage.getItem("isukeycheck"),
        "MoneyID": localStorage.getItem("MoneyID"),
        "ImportantID": localStorage.getItem("ImportantID"),
        "SealID": localStorage.getItem("SealID")
    }
    return obj;
}
function clearUserCom() {
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_NAME");
    localStorage.removeItem("FULL_NAME");
    localStorage.removeItem("USER_DANWEI_CODE");
    localStorage.removeItem("USER_DANWEI_SHORT_NAME");
    localStorage.removeItem("ROLE_NAME");
}
function getweekdata(KHID, NOWDATE) {
    $.ajax({
        type: 'POST',
        url: '/api/OnlyTestManage/GetOnlyTestUserAnalysisZx',
        data: { KHID: KHID, UPDATETIME: NOWDATE },
        dataType: 'json',
        async: false,
        success: function (result) {
            var xdate = [];
            $.each(result.data[1], function (k, v) {
                xdate.push(v.split('T')[0].substring(5).replace("-", '.'))
            })
            chartinit(result.data[0], xdate);
        },
        error: function (dt) {
        }
    })
}

function CheckState(IsChecked, IsNeedLimitCheck,IsPassLimitCheck) {
    if (IsChecked == "1") {
        if (IsNeedLimitCheck == "1" && IsPassLimitCheck == "1") {
            return "待支付"
        }

        if (IsNeedLimitCheck == "1" && IsPassLimitCheck != "1") {
            return "待大额审批"
        }

        if (IsNeedLimitCheck != "1") {
            return "待支付"
        }
    }
    else {
        return "待审核"
    }
}
function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}
function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}
//截取url 参数
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1)
        return "";
    return result[1];
}
//-------------日期 增加 格式转换 例子:new Date(data[0].PUBLISHDATE).addDays(1).Format("yyyy年M月d日")  start
function formatDuring(mss) {
    if (mss == "" || mss == null || mss == undefined) return ""
    var hours = mss.substring(0,2)
    var minutes = mss.substring(2, 4)
    var seconds = mss.substring(4, 6)
    return hours + ":" + minutes + ":" + seconds;
}
function formatymd(mss) {
    var year = mss.substring(0, 4)
    var month = mss.substring(4, 6)
    var day = mss.substring(6, 8)
    return year + "-" + month + "-" + day;
}
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//将指定的毫秒数加到此实例的值上
Date.prototype.addMilliseconds = function (value) {
    var millisecond = this.getMilliseconds();
    this.setMilliseconds(millisecond + value);
    return this;
};
//将指定的秒数加到此实例的值上
Date.prototype.addSeconds = function (value) {
    var second = this.getSeconds();
    this.setSeconds(second + value);
    return this;
};
//将指定的分钟数加到此实例的值上
Date.prototype.addMinutes = function (value) {
    var minute = this.addMinutes();
    this.setMinutes(minute + value);
    return this;
};
//将指定的小时数加到此实例的值上
Date.prototype.addHours = function (value) {
    var hour = this.getHours();
    this.setHours(hour + value);
    return this;
};
//将指定的天数加到此实例的值上
Date.prototype.addDays = function (value) {
    var date = this.getDate();
    this.setDate(date + value);
    return this;
};
//将指定的星期数加到此实例的值上
Date.prototype.addWeeks = function (value) {
    return this.addDays(value * 7);
};
//将指定的月份数加到此实例的值上
Date.prototype.addMonths = function (value) {
    var month = this.getMonth();
    this.setMonth(month + value);
    return this;
};
//将指定的年份数加到此实例的值上
Date.prototype.addYears = function (value) {
    var year = this.getFullYear();
    this.setFullYear(year + value);
    return this;
};
//-------------日期 增加 格式转换 end



//-------------查看页面 禁用表单 start
function FormIsDisabled() {
    $("input,select,textarea").attr("disabled", "disabled")
}
//-------------查看页面 禁用表单 end

//-------------jquery表单加载扩展 strat
$.fn.extend({
    //表单加载json对象数据 
    //jsonValue json对象
    //isCover 是否覆盖，默认覆盖
    setForm: function (jsonValue, icover) {
        var obj = this;
        $.each(jsonValue, function (name, ival) {
            $("select[name=" + name + "]").val(ival)  //新增2017-7-17

            var _obj = obj.find("[name=" + name + "]");
            if (!icover && _obj.val()) {
                //有值，并且不要求覆盖则跳过
            }
            else {
                var dateFomt00000 = new RegExp(/(\d{4})-(\d{2})-(\d{2}T00:00:00)/);
                var dateFomthhmmss = new RegExp(/(\d{4})-(\d{2})-(\d{2}T(\d{2}):(\d{2}):(\d{2}))/);
                //时间处理
                if (dateFomt00000.test(ival)) {
                    ival = ival.replace("T00:00:00", "");
                }
                else if (dateFomthhmmss.test(ival)) {
                    ival = ival.replace(/T/g, "");
                }
                else {

                }
                var $oinput = obj.find("input[name=" + name + "]");



                if ($oinput.attr("type") == "checkbox") {
                    if (ival !== null) {
                        var checkboxObj = $("[name=" + name + "]");
                        var checkArray = ival.split(";");
                        for (var i = 0; i < checkboxObj.length; i++) {
                            for (var j = 0; j < checkArray.length; j++) {
                                if (checkboxObj[i].value == checkArray[j]) {
                                    checkboxObj[i].click();
                                }
                            }
                        }
                    }
                }
                else if ($oinput.attr("type") == "radio") {
                    $oinput.each(function () {
                        var radioObj = $("[name=" + name + "]");
                        for (var i = 0; i < radioObj.length; i++) {
                            if (radioObj[i].value == ival) {
                                radioObj[i].click();
                            }
                        }
                    });
                }
                else if ($oinput.attr("type") == "textarea") {
                    obj.find("[name=" + name + "]").html(ival);
                }
                else {
                    obj.find("[name=" + name + "]").val(ival);
                }
            }
        });

    },
    parseForm: function (jsonParm) {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        if (jsonParm) {
            $.each(jsonParm, function (key, val) {
                serializeObj[val.name] = val.value;

            })

        }
        return serializeObj;
    }
});
//-------------jquery表单加载扩展 end

//加载loading
function qlloading(messagestr) {
        if (messagestr == null || messagestr == "" || messagestr == undefined) {
            messagestr="请等待..."
        }
        var htmlstr = '<div id = "" class="vhcenter comloading" style = "display:flex;width:100vw;height:100vh;z-index:999999;background:rgba(0,0,0,0.3);position: fixed;font-size: 28px;color:#fff" >' + messagestr + '</div>'
        $("body").prepend(htmlstr);
   
}
function qlloadingClose() {
    $(".comloading").remove()
}


//Ukey操作相关-s
function GetUserUkey(ukeyid) {
    var re = null;
    $.ajax({
        type: 'POST',
        dataType: "json",
        data: { USER_ID: getUserCom().USER_ID, UKeyUid:ukeyid },
        async: false,
        url: "/api/User/GetUserUkey",//发起转账api
        success: function (result) { //请求成功后处理函数。  取到Json对象data
            re = result;
        },
        error: function () {//请求失败处理函数
            
        }
    })
    return re;
}
function K1mTokenMgrFindDevice(id) {
    var reobj = {
        keyObj: null,
        keycount: 0,
        message:""
    }
    var K1mTokenMgr = new mTokenMgr(id);
    K1mTokenMgr.LoadLibrary();
    reobj.keycount = K1mTokenMgr.K1Mgr_mTokenFindDevice();
    reobj.message = K1mTokenMgr.K1Mgr_mTokenGetLastError();
    reobj.keyObj = K1mTokenMgr;
    return reobj;
};
function K1mTokenMgrGetUID(obj) {
    var reobj = {
        id: "",
        message: ""
    }
    var K1mTokenMgr = obj;
    reobj.id = K1mTokenMgr.K1Mgr_mTokenGetUID(1);
    reobj.message = K1mTokenMgr.K1Mgr_mTokenGetLastError();
    return reobj
};
function OnPageLoadByUser(id) {
    var reobj = {
        keyObj: null,
        keycount: 0,
        message: ""
    }
    var K1mToken = new mToken(id);
    K1mToken.LoadLibrary();
    reobj.keycount = K1mToken.K1_mTokenFindDevice();
    reobj.message = K1mToken.K1_mTokenGetLastError();
    reobj.keyObj = K1mToken
    return reobj;
}
function K1mTokenGetUID(obj) {
    var reobj = {
        id: "",
        message: ""
    }
    var K1mToken = obj;
    reobj.id = K1mToken.K1_mTokenGetUID(1);
    reobj.message = K1mToken.K1_mTokenGetLastError();
    return reobj
}
//Ukey操作相关-e

function returnFloatQ(value) {
    var value = Math.floor(value * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}