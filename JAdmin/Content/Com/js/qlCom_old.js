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
  // 发送指令触发框
  MessageInfoShow: function () {
    var textAreaHtml = "<textarea class='textArearText'></textarea>"
    new AppEnter.ComAlert().ShowAlert("输入短信内容", textAreaHtml, "提交", function () {

    })
  },
  //公用信息提示框
  ComAlert: function (title, html, width, height, fun) {
    this.ShowAlert = function (title, html, btntext, fun) {
      AppEnter.ComAlertClose()
      var Html = '<div id="comalertMess" class="ComAlert" style="width:' + (width != "" && width != undefined ? width : '') + ' ;height: ' + (height != "" && height != undefined ? height : '') + ';">'
          + '<div id="comalertMessT" class="ComAlertTitle">' + title + '<button onclick="AppEnter.ComAlertClose()" class="ComAlertCloseBtn"></button></div>'
          + '<div class="ComAlertContent">'
          + html
          + '</div>'
          + '<div id="" style="text-align: right;font-size: 1.7vh;color: #fff;margin-top:15px"><span id="zhyspthbtnOn" class="zhyspthbtn">' + (btntext != "" && btntext != undefined ? btntext : "关闭") + '</span></div>'
          + '</div>'
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
      AppEnter.actionIn($("#comalertMess"), 'action_scale2', 0.2, "")
      AppEnter.Move_Part_Mousedown("comalertMess", "comalertMessT")
      AppEnter.Move_Part_Mouseup("comalertMessT");
      AppEnter.Set_Area("comalertMess");
    }
    var alertHtml = '<div id="comalert" class="ComAlert" style="width:' + (width != "" && width != undefined ? width : '') + ' ;height: ' + (height != "" && height != undefined ? height : '') + ';">'
        + '<div id="comalerttitle" class="ComAlertTitle">' + title + '<button onclick="AppEnter.ComAlertClose()" class="ComAlertCloseBtn"></button></div>'
        + '<div class="ComAlertContent">'
        + '<label style="width: 20%;float: left;font-size: 1.6vh">时间区间:</label>'
        + '<input data-require="require" class="DateTimeNew form-control-ql datepicker left40Com" name="QSTime" type="text" autocomplete="off" placeholder="起始时间">'
        + '<label style="float: left">-</label>'
        + '<input data-require="require" class="DateTimeNew form-control-ql datepicker left40Com" name="JZTime" type="text" autocomplete="off" placeholder="截止时间" >'
        + '</div>'
        + '<div id="quedingcom" style="text-align: right;font-size: 1.7vh;color: #fff;margin-top:15px"><span class="zhyspthbtn">确定</span></div>'
        + '</div>'
    if ($("#comZheZhao").length <= 0) {
      alertHtml = alertHtml + '<div id="comZheZhao" style="z-index: 998;background: rgba(0,0,0,0.5);width: 100vw;height: 100vh;position: fixed"></div>'
    }
    $("body").prepend(alertHtml)
    $("#quedingcom").unbind("click").click(function () {
      if (typeof fun == "function") {
        fun && fun({
          "startTime": $('input[name=QSTime]').val(),
          "endTime": $('input[name=JZTime]').val()
        })
      }
      ;
      AppEnter.ComAlertClose();
    })
    $(".DateTimeNew").datetimepicker({
      language: "zh-CN",
      autoclose: true,//选中之后自动隐藏日期选择框
      clearBtn: true,//清除按钮
      minView: 1,
      todayBtn: "linked",//今日按钮,"linked"为点击获取今日
      format: 'yyyy-mm-dd hh:ii'//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
    })
    $('input[name=QSTime]').datetimepicker('setDate', new Date(getDayNew(-1)));
    $('input[name=JZTime]').datetimepicker('setDate', new Date(getDayNew(0)));
    AppEnter.actionIn($("#comalert"), 'action_scale2', 0.2, "")
    AppEnter.Move_Part_Mousedown("comalert", "comalerttitle")
    AppEnter.Move_Part_Mouseup("comalerttitle");
    AppEnter.Set_Area("comalert");
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
      if (typeof  callback == "function") callback && callback(flag2)
      return flag2
    }

    var flag = true;
    $("#" + formid + " input[data-require=require]").each(function () {
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
    $(obj).css({"animation": actionName + " " + time + "s" + " " + speed});
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
  // 左侧菜单
  CloseAllLeftMenu: function () {
    AppEnter.top_right_modal_close() //清除民方力量右上角的弹框
    AppEnter.YgGkHide() //岸基渔港管控右上角弹框
    AppEnter.CloseTimeLine(); //时间轴
    clearAllGraphicsLayers();
    monitorLayers.hideAllMonitor();
    //清除风流场数据
    clearPrediction();
    closeRightMenuOne() //关闭右侧图表弹框
    AppEnter.jyRightInfoHide() //预案弹框
    AppEnter.TaskHide()//预案列表
    AppEnter.qlmodalHide() //军民融合搜救多行弹框
    AppEnter.SHHide() //扫海弹框
    AppEnter.bfyjzzModalHide()//边海防应急支持
    AppEnter.hszyddModalHide()//海上资源调度
  },
  OninputChange: function () {
    $("input[name=cs]").val(Math.ceil($("input[name=ds]").val() / 20))
  },
  labelClick: function () {
    $(".block_ul>li>label>input").on("click", function () {
      AppEnter.ZyDqClose();
      //清空军民融合搜救跟资源调度的轮询
      AppEnter.LoadingJunYanHide()
      AppEnter.RemoveInterval()
      // 清空救援相关图层
      JiuYuan.clear();
      RescueInfo.clearRescueRateLayer();
      portControl.clearAll();
      emergencySupport.clearAll();
      var civilForce = new CivilForce(map);
      //海上目标融合
      if ($(this).attr("name") == "hsmbrh") {
        AppEnter.modalshowBisShow = true
        AppEnter.top_right_modal_closeB()
        monitorLayers.hideAllMonitor();
        AppEnter.CloseTimeLine();
        window.clearAllGraphicsLayers();
        //清除风流场数据
        clearPrediction();
        if (this.checked) {
          if (!seaTarget.map) {
            seaTarget.initTool(map);
          }
          seaTarget.showLayer($(this).attr("data-value"));

        } else {
          seaTarget.hideLayer($(this).attr("data-value"));
        }
        $.each($("input:checkbox[name=hjjc]"), function (key, value) {
          $(this).parent().parent().removeClass("left_li_active")
          value.checked = false
        })
        $.each($("input:radio[name=mfll]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=szyb]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=jsyx]"), function (key, value) {
          value.checked = false
        })
        AppEnter.qlmodalHide()
        AppEnter.jyRightInfoHide()
        AppEnter.jybtnHide()
        AppEnter.TaskHide()
        AppEnter.SHHide()
        AppEnter.YgGkHide()
        AppEnter.bfyjzzModalHide()
        AppEnter.hszyddModalHide()
        closeRightMenuOne()
      }
      //民方力量
      if ($(this).attr("name") == "mfll") {
        AppEnter.modalshowBisShow = false
        AppEnter.top_right_modal_close()
        AppEnter.CloseTimeLine();
        window.clearAllGraphicsLayers();
        monitorLayers.hideAllMonitor();
        seaTarget.clearAll();
        //清除风流场数据
        clearPrediction();

        $.each($("input:checkbox[name=hsmbrh]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:checkbox[name=hjjc]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=szyb]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=jsyx]"), function (key, value) {
          value.checked = false
        })
        if ($(this).attr("data-value") == "maritimeTarget" || $(this).attr(
            "data-value") === "wholeCountry" || $(this).attr(
            "data-value") === "militaryExercise") {
          window.AppEnter.top_right_modal_show("top_right_modal",
              {
                title: $(this).attr("data-title"),
                sbsl: "",
                zdw: "",
                zcbsl: $(this).attr("data-zcbsl")
              })
        }
        else {
          window.AppEnter.top_right_modal_show("top_right_modal",
              {
                title: $(this).attr("data-title"),
                sbsl: "",
                zdw: "none",
                zcbsl: $(this).attr("data-zcbsl")
              })
        }
        civilForce.showGraphis($(this).attr("data-value"));
        closeRightMenuOne()
        AppEnter.qlmodalHide()
        AppEnter.jyRightInfoHide()
        AppEnter.jybtnHide()
        AppEnter.TaskHide()
        AppEnter.SHHide()
        AppEnter.YgGkHide()
        AppEnter.bfyjzzModalHide()
        AppEnter.hszyddModalHide()
      }
      //环境监测
      if ($(this).attr("name") == "hjjc") {
        AppEnter.modalshowBisShow = false
        AppEnter.top_right_modal_close()
        AppEnter.CloseTimeLine();
        window.clearAllGraphicsLayers();
        seaTarget.clearAll();
        //清除风流场数据
        clearPrediction();
        if (this.checked) {
          monitorLayers.loadMonitorData($(this).attr("data-value"));
          monitorLayers.showMonitorData($(this).attr("data-value"));
        } else {
          monitorLayers.hideMonitorData($(this).attr("data-value"));
        }

        $.each($("input:checkbox[name=hsmbrh]"), function (key, value) {
          value.checked = false
          $(this).parent().parent().removeClass("left_li_active")
        })
        $.each($("input:radio[name=mfll]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=szyb]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=jsyx]"), function (key, value) {
          value.checked = false
        })
        AppEnter.qlmodalHide()
        AppEnter.jyRightInfoHide()
        AppEnter.jybtnHide()
        AppEnter.TaskHide()
        AppEnter.SHHide()
        AppEnter.YgGkHide()
        AppEnter.bfyjzzModalHide()
        AppEnter.hszyddModalHide()
      }
      //数值预报
      if ($(this).attr("name") == "szyb") {
        AppEnter.modalshowBisShow = false
        AppEnter.top_right_modal_close()
        clearAllGraphicsLayers()
        monitorLayers.hideAllMonitor();
        seaTarget.clearAll();
        setMapExtent(119.211, 35.622, 121.342, 36.445);
        timelineType = $(this).attr("data-value");
        switch (timelineType) {
          case 'wind':
            $.getJSON('/map/getAllTime.json', {type: 1}, function (data) {
              var date = new Date();
              var today = date.Format("yyyy-MM-dd");
              if (data.indexOf(today) !== -1) {
                var now = date.Format("yyyy-MM-dd hh:mm:ss").substr(0, 13)
                    + ":00";
                AppEnter.CreateTimeLine(data, now);
              } else {
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.confirm('当前无预报数据！', {
                    btn: ['确定'],
                    yes: function (index) {
                      layer.close(index);
                    }
                  });
                });
              }
            });
            break;
          case 'current':
            $.getJSON('/map/getAllTime.json', {type: 2}, function (data) {
              var date = new Date();
              var today = date.Format("yyyy-MM-dd");
              if (data.indexOf(today) !== -1) {
                var now = date.Format("yyyy-MM-dd hh:mm:ss").substr(0, 13)
                    + ":00";
                AppEnter.CreateTimeLine(data, now);
              } else {
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.confirm('当前无预报数据！', {
                    btn: ['确定'],
                    yes: function (index) {
                      layer.close(index);
                    }
                  });
                });
              }
            });
            $("#legendRasterDiv").children().eq(0).trigger("click");
            break;
          case 'temp':
            $.getJSON('/map/getAllTime.json', {type: 1}, function (data) {
              var date = new Date();
              var today = date.Format("yyyy-MM-dd");
              if (data.indexOf(today) !== -1) {
                var now = date.Format("yyyy-MM-dd hh:mm:ss").substr(0, 13)
                    + ":00";
                AppEnter.CreateTimeLine(data, now);
              } else {
                layui.use('layer', function () {
                  var layer = layui.layer;
                  layer.confirm('当前无预报数据！', {
                    btn: ['确定'],
                    yes: function (index) {
                      layer.close(index);
                    }
                  });
                });
              }
            });
            break;
        }

        $.each($("input:checkbox[name=hsmbrh]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:checkbox[name=hjjc]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=mfll]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=jsyx]"), function (key, value) {
          value.checked = false
        })

        closeRightMenuOne()
        AppEnter.qlmodalHide()
        AppEnter.jyRightInfoHide()
        AppEnter.jybtnHide()
        AppEnter.TaskHide()
        AppEnter.SHHide()
        AppEnter.YgGkHide()
        AppEnter.bfyjzzModalHide()
        AppEnter.hszyddModalHide()
      }
      //军事演习
      if ($(this).attr("name") == "jsyx") {
        AppEnter.SaveRightInfo=""
        AppEnter.modalshowBisShow = false
        AppEnter.top_right_modal_close()
        clearAllGraphicsLayers();
        seaTarget.clearAll();
        AppEnter.CloseAllLeftMenu()
        $.each($("input:checkbox[name=hsmbrh]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:checkbox[name=hjjc]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=mfll]"), function (key, value) {
          value.checked = false
        })
        $.each($("input:radio[name=szyb]"), function (key, value) {
          value.checked = false
        })
        //军民融合搜救
        if ($(this).attr("data-value") == "rescue") {
          var jmrhsjtitle = $(this).attr("data-title")
          window.selectItemName = "rescue";
          // 后台获取数据加载表单
          var KHBMLOAD = new loadtable_ql({
            id: "#khbm",
            listname: "JWArray",
            columns: [
              {
                field: "JD",
                title: "经度",
                fieldStyle: 'width:81%',
              },
              {
                field: "WD",
                title: "纬度",
                fieldStyle: 'width:70%',
                addhtml: '<button tabindex="-1"  type="button" class="zuobiaoBtnTb" data-name="9"><span  class="spanZw">1</span></button>',
              },
              {
                field: "LX",
                type: "select",
                data: ["飞行员", "无动力船", "救生筏"],
                title: "类型"
              },
              {
                field: 'EDIT',
                formatter: function () {
                  var HTML = new Array();
                  HTML.push("<div class=\"btn-group\">");
                  // HTML.push("<span class='glyphicon glyphicon-trash' name='addbm' style=\"font-size:18px\">121</span>");
                  HTML.push(
                      '<span  style="cursor: pointer;color: #fff" onclick="deltable(this)" style="font-size:1.8vh">删除</span>');
                  HTML.push("</div>");
                  return HTML.join('');
                },
              }
            ],
            data: [],
            callback: function () {
              $("#addjy").unbind("click").click(function () {
                KHBMLOAD.addtable()
              })
            }
          })
          AppEnter.qlmodalShow(jmrhsjtitle)
          $("#closejy").unbind("click").click(function () {
            AppEnter.qlmodalHide()
            RescueInfo.clearRescueRateLayer();
          })
          $("#subjy").unbind("click").click(function () {
            RescueInfo.clearRescueRateLayer();
            var dataparm = $("#QForm").parseForm()
            if (!tableformcheck("QForm")) {
              return false
            }
            var dtp = []
            var dtp2 = []
            $.each(dataparm, function (k, v) {
              dtp.push(v)
            })
            for (i = 0; i < dtp.length / 3; i++) {
              dtp2.push({
                "id": i,
                "x": dataparm["JWArray[" + i + "].JD"],
                "y": dataparm["JWArray[" + i + "].WD"],
                "type": dataparm["JWArray[" + i + "].LX"]
              })
            }
            //弹出预案弹框
            AppEnter.TaskShow(false, jmrhsjtitle)
            JiuYuan.createNew(map).show(dtp2);
            AppEnter.qlmodalHide()
          })

          AppEnter.junminInterval = setInterval(function () {
            console.log("获取搜救数据")
            var formdata = AppEnter.ajaxGet("/api/sjZyd/getSjAllData.json")
            if (formdata && formdata.length > 0) {
              AppEnter.LoadingJunYanShow("接受到搜救信息!", function () {
                // 弹出多行数据提交表格-因组合使用，暂不不封装-s
                var KHBMLOAD = new loadtable_ql({
                  id: "#khbm",
                  listname: "JWArray",
                  columns: [
                    {
                      field: "JD",
                      title: "经度",
                      fieldStyle: 'width:81%',
                    },
                    {
                      field: "WD",
                      title: "纬度",
                      fieldStyle: 'width:70%',
                      addhtml: '<button type="button" class="zuobiaoBtnTb" data-name="9"><span  class="spanZw">1</span></button>',
                    },
                    {
                      field: "LX",
                      type: "select",
                      data: ["飞行员", "无动力船", "救生筏"],
                      title: "类型"
                    },
                    {
                      field: 'EDIT',
                      formatter: function () {
                        var HTML = new Array();
                        HTML.push("<div class=\"btn-group\">");
                        // HTML.push("<span class='glyphicon glyphicon-trash' name='addbm' style=\"font-size:18px\">121</span>");
                        HTML.push(
                            '<span  style="cursor: pointer;color: #fff" onclick="deltable(this)" style="font-size:1.8vh">删除</span>');
                        HTML.push("</div>");
                        return HTML.join('');
                      },
                    }
                  ],
                  data: formdata,
                  callback: function () {
                    $("#addjy").unbind("click").click(function () {
                      KHBMLOAD.addtable()
                    })
                  }
                })
                AppEnter.qlmodalShow(jmrhsjtitle)
                $("#closejy").unbind("click").click(function () {
                  AppEnter.qlmodalHide()
                  RescueInfo.clearRescueRateLayer();
                })
                $("#subjy").unbind("click").click(function () {
                  RescueInfo.clearRescueRateLayer();
                  var dataparm = $("#QForm").parseForm()
                  if (!tableformcheck("QForm")) {
                    return false
                  }
                  var dtp = []
                  var dtp2 = []
                  $.each(dataparm, function (k, v) {
                    dtp.push(v)
                  })
                  for (i = 0; i < dtp.length / 3; i++) {
                    dtp2.push({
                      "id": i,
                      "x": dataparm["JWArray[" + i + "].JD"],
                      "y": dataparm["JWArray[" + i + "].WD"],
                      "type": dataparm["JWArray[" + i + "].LX"]
                    })
                  }
                  //弹出预案弹框
                  AppEnter.TaskShow(false, jmrhsjtitle)
                  JiuYuan.createNew(map).show(dtp2);
                  AppEnter.qlmodalHide()
                })
                // 弹出多行数据提交表格-因组合使用，暂不不封装-e
              })
              AppEnter.actionIn($("#JunYanLoading"), 'action_scale3', 0.2, "")
              AppEnter.ajaxGet("/api/sjZyd/deleteAllData.json?type=1")
              AppEnter.RemoveInterval()
            }
          }, 1000)
        }
        //军事行动扫海
        else if ($(this).attr("data-value") == "jsxdsh") {
          clearAllGraphicsLayers();
          AppEnter.SHShow($(this).attr("data-title"))
        }
        //岸基渔港管控
        else if ($(this).attr("data-value") == "port") {
          // clearAllGraphicsLayers();
          // window.mapUtil.getLayer(map, "anjiyugangguankong").clear();
          // var ref = RefSupportBoat.createNew(map, "anjiyugangguankong");
          // anJiYuGangGuanKong(ref);
          //工具初始化
          portControl.initTool(map);
          //弹框
          AppEnter.YgGkShow($(this).attr("data-title"));
        }
        //边海防应急支持
        else if ($(this).attr("data-value") == "bhfyjzc") {
          clearAllGraphicsLayers();
          var title = $(this).attr("data-title")
          AppEnter.bfyjzzModalShow(title)
          // ShanDongYJYA.showBoat(map);
          // var BFLOAD = new loadtable_ql({
          //   id: "#BFFormTable",
          //   listname: "BFArray",
          //   columns: [
          //     {
          //       field: "X",
          //       title: "起点",
          //       placeholderv: "输入经度"
          //     },
          //     {
          //       field: "Y",
          //       title: "",
          //       placeholderv: "输入纬度"
          //     },
          //     {
          //       field: "XX",
          //       title: "终点",
          //       placeholderv: "输入经度"
          //     },
          //     {
          //       field: "YY",
          //       title: "",
          //       placeholderv: "输入纬度"
          //     },
          //     {
          //       field: 'EDIT',
          //       formatter: function () {
          //         var HTML = new Array();
          //         HTML.push("<div class=\"btn-group\">");
          //         HTML.push(
          //             '<span  style="cursor: pointer;color: #fff" onclick="deltable(this)" style="font-size:1.8vh">删除</span>');
          //         HTML.push("</div>");
          //         return HTML.join('');
          //       },
          //     }
          //   ],
          //   data: [],
          //   callback: function () {
          //     $("#addBf").unbind("click").click(function () {
          //       BFLOAD.addtable()
          //     })
          //   }
          // })

          var dataparm = null;
          obj = null;
          var shipPaths = [];
          //筛选
          $("#SxBfYj").unbind("click").click(function () {
            dataparm = $("#BFForm").parseForm()
            if (!AppEnter.formCheckCom("BFForm")) {
              return false
            }
            var dtp2 = [[{"x": dataparm.bfx0, "y": dataparm.bfy0,},
              {"x": dataparm.bfx1, "y": dataparm.bfy1,}]]
            emergencySupport.initTool(map, dtp2);
            var wait = setInterval(function () {
              if (emergencySupport.splitDone) {
                clearInterval(wait);
                //计算距离时间
                ShanDongYJYA.nearestPoint(map, emergencySupport.options,
                    function (e) {
                      obj = e;
                      //obj为ul数据源，一下拼接ul
                      if (obj.length > 0) {
                        $("#subBf").css("display", "initial")
                        var listr = ''
                        $.each(obj, function (key, value) {
                          listr += '<li>' + value.nearestBoat.name + '</li>'
                        })
                        $("#BfYjChaotUl").html(listr)
                      }
                      else {
                        alert("筛选无数据，请重新输入坐标")
                      }
                      //ul拼接结束

                      // //地图画箭头
                      // var points = [];
                      // var arrowLine = ArrowLineAndTime.createNew(map);
                      // for (var i = 0; i < obj.length; i++) {
                      //   var option = {
                      //     x0: obj[i].nearestBoat.x,
                      //     y0: obj[i].nearestBoat.y,
                      //     x1: obj[i].x,
                      //     y1: obj[i].y
                      //   };
                      //   arrowLine.draw(option);
                      //   shipPaths.push({
                      //     line: emergencySupport.lines[i],
                      //     x0: obj[i].nearestBoat.x,
                      //     y0: obj[i].nearestBoat.y,
                      //     x1: obj[i].x,
                      //     y1: obj[i].y,
                      //     boat: obj[i].nearestBoat
                      //   });
                      //   points.push({
                      //     x: obj[i].nearestBoat.x,
                      //     y: obj[i].nearestBoat.y,
                      //     mmsi: obj[i].nearestBoat.mmsi,
                      //     name: obj[i].nearestBoat.name,
                      //     zhx: obj[i].nearestBoat.zhx
                      //   })
                      // }
                      // ShanDongYJYA.addTempGraphic(points);
                    });
              }
            }, 10);
          })
          //提交
          $("#subBf").unbind("click").click(function () {
            // var dtp = []
            // var dtp2 = []
            // $.each(dataparm, function (k, v) {
            //   dtp.push(v)
            // })
            // for (i = 0; i < dtp.length / 4; i++) {
            //   dtp2.push([{
            //     "x": dataparm["BFArray[" + i + "].X"],
            //     "y": dataparm["BFArray[" + i + "].Y"]
            //   }, {
            //     "x": dataparm["BFArray[" + i + "].XX"],
            //     "y": dataparm["BFArray[" + i + "].YY"]
            //   }])
            // }

            //弹出预案弹框
            AppEnter.TaskShow(false, title)

            //短信弹框
            var dxmessage = "根据军方需求对相应的边防区域进行巡查,收到信息的船只,按照规定时间进行巡查任务."
            AppEnter.jyRightInfoShow("bhbfyh", "mmsis", dxmessage,
                function (mmsis, con) {
                  ObtainPoint.clear();
                  //船动画-s
                  //地图画箭头
                  var points = [];
                  var arrowLine = ArrowLineAndTime.createNew(map);
                  for (var i = 0; i < obj.length; i++) {
                    var option = {
                      x0: obj[i].nearestBoat.x,
                      y0: obj[i].nearestBoat.y,
                      x1: obj[i].x,
                      y1: obj[i].y
                    };
                    arrowLine.draw(option);
                    shipPaths.push({
                      line: emergencySupport.lines[i],
                      x0: obj[i].nearestBoat.x,
                      y0: obj[i].nearestBoat.y,
                      x1: obj[i].x,
                      y1: obj[i].y,
                      boat: obj[i].nearestBoat
                    });
                    // points.push({
                    //   x: obj[i].nearestBoat.x,
                    //   y: obj[i].nearestBoat.y,
                    //   mmsi: obj[i].nearestBoat.mmsi,
                    //   name: obj[i].nearestBoat.name,
                    //   zhx: obj[i].nearestBoat.zhx
                    // })
                  }
                  // ShanDongYJYA.addTempGraphic(points);
                  emergencySupport.drawShips(shipPaths);
                });
            AppEnter.bfyjzzModalHide()
          })
          $("#closeBf").unbind("click").click(function () {
            AppEnter.bfyjzzModalHide()
          })
        }
        //海上资源调度
        else if ($(this).attr("data-value") == "hszydd") {
          clearAllGraphicsLayers();

          // 加载山东渔船信息
          // ShanDongYJYA.showBoat(map);
          // 提交-发短信-确定触发
          // 画带有时间的箭头线
          // window.setTimeout(function () {
          //   var arrowLine = ArrowLineAndTime.createNew(map);
          //   for (var i = 0; i < obj.points.length; i++) {
          //     var option = {
          //       x0: obj.points[i].x,
          //       y0: obj.points[i].y,
          //       x1: obj.x,
          //       y1: obj.y
          //     }
          //     arrowLine.draw(option);
          //   }
          // }, 2000)
          // window.setTimeout(function () {
          //   var option = {
          //     "x0": qidian.x,
          //     "y0": qidian.y,
          //     "x1": zhongdian.x,
          //     "y1": zhongdian.y,
          //     "cs": cs,
          //     "ds": ds,
          //     "boats": obj.points
          //   }
          //   HSZYDD.createNew(map, option);
          // }, 4000);

          var title = $(this).attr("data-title")
          AppEnter.hszyddModalShow(title)
          // var DDLOAD = new loadtable_ql({
          //   id: "#DDFormTable",
          //   listname: "DDArray",
          //   columns: [
          //     {
          //       field: "X",
          //       title: "起点",
          //       placeholderv: "经度"
          //     },
          //     {
          //       field: "Y",
          //       title: "",
          //       placeholderv: "纬度"
          //     },
          //     {
          //       field: "XX",
          //       title: "终点",
          //       placeholderv: "经度"
          //     },
          //     {
          //       field: "YY",
          //       title: "",
          //       placeholderv: "纬度"
          //     },
          //     {
          //       field: "DS",
          //       title: "吨数",
          //       placeholderv: "",
          //       defalutValue: "20",
          //       onChangeFun: function () {
          //
          //       }
          //     },
          //     {
          //       field: "CS",
          //       title: "船数",
          //       defalutValue: "1",
          //       placeholderv: ""
          //     },
          //     {
          //       field: 'EDIT',
          //       formatter: function () {
          //         var HTML = new Array();
          //         HTML.push("<div class=\"btn-group\">");
          //         HTML.push(
          //             '<span  style="cursor: pointer;color: #fff" onclick="deltable(this)" style="font-size:1.8vh">删除</span>');
          //         HTML.push("</div>");
          //         return HTML.join('');
          //       },
          //     }
          //   ],
          //   data: [],
          //   callback: function () {
          //     $("#addDD").unbind("click").click(function () {
          //       DDLOAD.addtable()
          //     })
          //   }
          // })

          // 点击筛选
          var obj = null;
          var dataparm = null;
          $("#SxDD").unbind("click").click(function () {
            dataparm = $("#DDForm").parseForm()
            if (!AppEnter.formCheckCom("DDForm")) {
              return false
            }
            console.log(dataparm)
            // var dtp = []
            // var dtp2 = []
            // $.each(dataparm, function (k, v) {
            //     dtp.push(v)
            // })
            // for (i = 0; i < dtp.length / 6; i++) {
            //     dtp2.push({
            //         "x0": dataparm["DDArray[" + i + "].X"],
            //         "y0": dataparm["DDArray[" + i + "].Y"],
            //         "x1": dataparm["DDArray[" + i + "].XX"],
            //         "y1": dataparm["DDArray[" + i + "].YY"],
            //         "cs": dataparm["DDArray[" + i + "].CS"],
            //         "ds": dataparm["DDArray[" + i + "].DS"]
            //     })
            // }

            ShanDongYJYA.nearestCoordinate(map,
                {
                  x: dataparm.x0,
                  y: dataparm.y0,
                  x1: dataparm.x1,
                  y1: dataparm.y1,
                  count: dataparm.cs
                }, function (e) {
                  obj = e;
                  var dis = mapUtil.getDistance({
                    x0: dataparm.x0,
                    y0: dataparm.y0,
                    x1: dataparm.x1,
                    y1: dataparm.y1
                  });
                  ExtLine.createNew(map,dataparm);
                  var text = "大约" + (Math.ceil((Number(obj.maxDistance) + Number(dis)) / ArrowLineAndTime.speed) / 60).toFixed(1) + "小时后完成运输任务";
                  AppEnter.ZyDqShow(text);
                });
            console.log(obj)
            if (obj.points.length > 0) {
              $("#subDD").css("display", "initial")
              var listr = ''
              $.each(obj.points, function (key, value) {
                listr += '<li>' + value.name + '</li>'
              })
              $("#ddChaotUl").html(listr)
            }
            else {
              alert("筛选无数据，请重新输入坐标")
            }
          })
          // 点击提交
          $("#subDD").unbind("click").click(function () {
            // var dataparm = $("#DDForm").parseForm()
            // if (!tableformcheck("DDForm")) {
            //   return false
            // }
            // var dtp = []
            // var dtp2 = []
            // $.each(dataparm, function (k, v) {
            //   dtp.push(v)
            // })
            // for (i = 0; i < dtp.length / 6; i++) {
            //   dtp2.push({
            //     "x0": dataparm["DDArray[" + i + "].X"],
            //     "y0": dataparm["DDArray[" + i + "].Y"],
            //     "x1": dataparm["DDArray[" + i + "].XX"],
            //     "y1": dataparm["DDArray[" + i + "].YY"],
            //     "cs": dataparm["DDArray[" + i + "].CS"],
            //     "ds": dataparm["DDArray[" + i + "].DS"]
            //   })
            // }
            // console.log(dtp2);
            // HSZYDD.createNew(map, dtp2);

            //弹出预案弹框
            AppEnter.TaskShow(false, title)
            AppEnter.hszyddModalHide()
            var dxmessage = "根据海军提供需求信息,调度指定船只从指定地点" + dataparm.x0 + "°E," + dataparm.y0 + "°N,进行资源运输到达" + dataparm.x1 + "°E," + dataparm.y1 + "°N."
            AppEnter.jyRightInfoShow("zydddx", "code", dxmessage, function (mmsis, con) {
              // 发送短信
              // $.ajax({
              //     "url": "/api/shipinfo/tcpBdxt.json",
              //     "type": "get",
              //     "data": {"code": mmsis, "text": con},
              //     "dataType": "json",
              //     "success": function (data) {
              //         console.log(data);
              //     }
              // });
              ObtainPoint.clear();
              //船动画
              var arrowLine = ArrowLineAndTime.createNew(map);
              for (var i = 0; i < obj.points.length; i++) {
                var option = {
                  x0: obj.points[i].x,
                  y0: obj.points[i].y,
                  x1: obj.x,
                  y1: obj.y
                }
                arrowLine.draw(option);
              }
              var option = {
                "x0": dataparm.x0,
                "y0": dataparm.y0,
                "x1": dataparm.x1,
                "y1": dataparm.y1,
                "cs": dataparm.cs,
                "ds": dataparm.ds,
                "boats": obj.points
              }
              HSZYDD.createNew(map, option);
              // window.setTimeout(function () {
              //
              // }, 2000)
              // window.setTimeout(function () {
              //
              // }, 4000);
            });
          })
          //点击关闭
          $("#closeDD").unbind("click").click(function () {
            AppEnter.hszyddModalHide()
          })
        }
      }
    })
  },
  MenuInit: function (leftMenuData) {
    var html = '';
    $.each(leftMenuData, function (key, val) {
      html += '<div class="left_content_block ' + val.pclass
          + '"><div class="content_block_title">' + val.title + '</div>'
          + AppEnter.CreatUl(val.type, val.children, val.lclass, val.radioname)
          // +'<div class="block_ul_div"></div>'
          + '</div>'
    })
    $("#leftmunu").html(html)
    //初始化高度
    $(".huanjingjiance").find(".block_ul").css("height",
        "calc(100% - " + ($(".content_block_title").outerHeight(true) + 5)
        + "px)")
    $(".minfangliliang").find(".block_ul").css("height",
        "calc(100% - " + ($(".content_block_title").outerHeight(true) + 5)
        + "px)")
    $(".shuzhiyubao").find(".block_ul").css("height",
        "calc(100% - " + ($(".content_block_title").outerHeight(true) + 5)
        + "px)")
    $(".junshiyanxi").find(".block_ul").css("height",
        "calc(100% - " + ($(".content_block_title").outerHeight(true) + 5)
        + "px)")

    $.each($(".left_content_block"), function (key, value) {
      AppEnter.actionIn($(this), 'bounceInLeft', key + 1, "")
    })
    // 左侧绑定单机事件
    AppEnter.labelClick()
    //左侧样式渲染
    $(".checkql").click(function () {
      $(".radioql").parent().parent().removeClass("left_li_active")
      if ($(this)[0].checked) {
        $(this).parent().parent().addClass("left_li_active")
      }
      else {
        $(this).parent().parent().removeClass("left_li_active")
      }
    })
    $(".radioql").click(function () {
      $(".checkql").parent().parent().removeClass("left_li_active")
      $(".radioql").parent().parent().removeClass("left_li_active")
      $(this).parent().parent().addClass("left_li_active")
    })
    //延时模拟点击第一个label
    // setTimeout(function () {
    //   $("input[data-title=海上目标]").trigger("click")
    // }, 2800);
  },
  CreatUl: function (type, data, height, radioname) {
    var ulstr = ''
    if (type == "checkbox") {
      $.each(data, function (key, val) {
        ulstr += '<li  class=' + (height == undefined ? "" : height) + '>'
            + '<label class="my_checkql" ><input ' + AppEnter.SetAttr(val)
            + ' name ="' + radioname
            + '" class="checkql" type="checkbox" style="display: none"><span></span><font>'
            + val["data-title"] + '</font></label>'
            + '</li>	'
      })
    }
    if (type == "radio") {
      $.each(data, function (key, val) {
        ulstr += '<li  class=' + height + '>'
            + '<label class="my_radio" ><input ' + AppEnter.SetAttr(val)
            + '  name ="' + radioname
            + '" class="radioql" type="radio" style="display: none"><span></span><font>'
            + val["data-title"] + '</font></label>'
            + '</li>	'
      })
    }
    return '<ul class="block_ul">' + ulstr + '</ul>'
  },
  SetAttr: function (val) {
    var attrstr = ''
    $.each(val, function (key, val) {
      attrstr += key + '="' + val + '" '
    })
    return attrstr
  },
  // 右上角弹框
  modalshowBisShow: true,
  chartsOption: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
      },
      textStyle: {
        fontSize: 25,
      }
    },
    grid: {
      containLabel: true,
      x: "3%",
      y: "5%",
      x2: "8%",
      y2: "3%",
    },
    title: {
      // text: ' 船舶数量周统计',
      // // left: 'center',
      //   x:'center',
      //   y: '10px',
      // textStyle: {
      //   color: '#fff',
      //   fontWeight: 'bold',
      //   fontSize: "30"
      // }
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
          fontSize: "20"
        }
      },
      data: [],
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: 'rgba(255,255,255,1)',//左边线的颜色
          width: '1'//坐标线的宽度
        }
      },

    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          color: "#fff",
          fontSize: "20"
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: 'rgba(255,255,255,1)',//左边线的颜色
          width: '1'//坐标线的宽度
        }
      },
      splitLine: {
        show: true,
        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
          color: ['rgba(255,255,255,0.5)'],
          width: 1,
          type: 'solid'
        }
      },
    },
    series: [{
      data: [],
      type: 'bar',
      itemStyle: {

        normal: {
          color: "#fc9a00",
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            fontSize: "20"
          }
        }

      },
      barWidth: 40,
    }]

  },
  chartsXYdata: function (data) {
    var type;
    switch (data.title) {
      case "西海岸":
        type = "2";
        break;
      case "青岛":
        type = "1";
        break;
      case "山东":
        type = "";
        break;
    }
    var datata = AppEnter.ajaxGet("api/shipinfo/getWeekHistoryData.json", {type: type})
    var JsonData = {xdata: [], ydata: []}
    $.each(datata, function (key, value) {
      JsonData.xdata.push(value.tm)
      JsonData.ydata.push(value.count)
    })
    return JsonData
  },
  top_right_modal_showB: function (data, dtarray) {
    if (AppEnter.modalshowBisShow) {
      if ($("#top_right_modalB").length > 0) {
        $(".mldal_big0").html(dtarray[0])
        $(".mldal_big1").html(dtarray[1])
        $(".mldal_big2").html(dtarray[2])
      }
      else {
        var html = ""
        html = '<div class="top_right_modal" style="height: 35%" id="top_right_modalB">'
            + '<div class="top_right_top" style="height: 28%">' + data.title + '</div>'
            + '<div class="top_right_bottom" style="margin-bottom: 10px;height: calc(23% - 10px);"><span class="mldal_small marleft26">雷达</span><span class="mldal_big mldal_big0">'
            + dtarray[0] + '</span></div>'
            + '<div class="top_right_bottom" style="margin-bottom: 10px;height: calc(23% - 10px);"><span class="mldal_small marleft26">AIS数据</span><span class="mldal_big mldal_big1">'
            + dtarray[1] + '</span></div>'
            + '<div class="top_right_bottom" style="margin-bottom: 10px;height: calc(23% - 10px);"><span class="mldal_small marleft26">融合数据</span><span class="mldal_big mldal_big2">'
            + dtarray[2] + '</span></div>'
            + '</div>'
        $("body").append(html)
        AppEnter.actionIn($("#top_right_modalB"), 'action_scale', 1, "")
      }
    }
  },
  top_right_modal_closeB: function () {
    $("#top_right_modal").remove()
    $("#top_right_modal_charts").remove()
  },
  top_right_modal_show: function (id, data, dtarray) {
    if ($("#" + id).length > 0) {
      $("#" + id).remove()
    }
    if ($("#" + id + "_charts").length > 0) {
      $("#" + id + "_charts").remove()
    }
    var html = ""
    if (data.zdw != "none") {
      html = '<div class="top_right_modal" style="height: 20%;" id="' + id
          + '">'
          + '<div class="top_right_top">' + data.title + '区域' + '</div>'
          + '<div class="top_right_middle" style="height: 56%;"><span class="mldal_small">船舶数量(艘)</span><span class="mldal_big">'
          + (data.zcbsl == "" || data.zcbsl == "none" || data.zcbsl == null ? ''
              : data.zcbsl) + '</span> </div>'
          + '</div>'
      $("body").append(html)
      AppEnter.actionIn($("#" + id), 'action_scale', 1, "")
    }
    else if (data.name == "hsmbrh") {
      html = '<div class="top_right_modal" style="height: 35%" id="' + id + '">'
          + '<div class="top_right_top" style="height: 28%">' + data.title + '</div>'
          + '<div class="top_right_bottom" style="margin-bottom: 10px;height: calc(23% - 10px);"><span class="mldal_small marleft26">雷达</span><span class="mldal_big">'
          + dtarray[0] + '</span></div>'
          + '<div class="top_right_bottom" style="margin-bottom: 10px;height: calc(23% - 10px);"><span class="mldal_small marleft26">AIS数据</span><span class="mldal_big">'
          + dtarray[1] + '</span></div>'
          + '<div class="top_right_bottom" style="margin-bottom: 10px;height: calc(23% - 10px);"><span class="mldal_small marleft26">融合数据</span><span class="mldal_big">'
          + dtarray[2] + '</span></div>'
          + '</div>'
      $("body").append(html)
      AppEnter.actionIn($("#" + id), 'action_scale', 1, "")
    }
    else {
      html = '<div class="top_right_modal" style="height: 20%;" id="' + id
          + '">'
          + '<div class="top_right_top">' + data.title + '区域' + '</div>'
          + '<div class="top_right_middle" style="height: 56%;display: none"><span class="mldal_small">船舶数量(艘)</span><span class="mldal_big">'
          + (data.zcbsl == "" || data.zcbsl == "none" || data.zcbsl == null ? ''
              : data.zcbsl) + '</span> </div>'
          + '<div class="top_right_middle" style="height: 56%;"><span class="mldal_small">船舶数量(艘)</span><span class="mldal_big">'
          + (data.zcbsl == "" || data.zcbsl == "none" || data.zcbsl == null ? ''
              : data.zcbsl) + '</span> </div>'
          + '</div>'

          + '<div class="top_right_modal_charts" id="' + id + '_charts">'
          + '<div class="top_right_top" id="weektop" style="height: auto">在线船舶数量</div>'
          + '<div id="weekstatisZhu"></div>'
      '</div>'
      $("body").append(html)
      $("#weekstatisZhu").width($(".top_right_modal_charts").width())
      $("#weekstatisZhu").height($(".top_right_modal_charts").height() - $("#weektop").outerHeight(true))

      var WeekChart = null;
      var JsonDT = AppEnter.chartsXYdata(data)
      console.log(JsonDT)
      var Option = AppEnter.chartsOption;
      Option.xAxis.data = JsonDT.xdata
      Option.series[0].data = JsonDT.ydata
      WeekChart = echarts.init(document.getElementById('weekstatisZhu'));
      WeekChart.setOption(Option);
      AppEnter.actionIn($("#" + id), 'action_scale', 1, "")
      AppEnter.actionIn($("#" + id + "_charts"), 'action_scale', 1, "")
    }
  },
  top_right_modal_close: function () {
    // AppEnter.actionOut($("#"+id),'action_scaleOut',1,"")
    $(".top_right_modal").remove()
    $(".top_right_modal_charts").remove()
  },
  //时间轴
  DragAnddrop: function (obj, fillobj) {
    obj.mousedown(function (event) {
      var x = event.pageX;
      var y = event.pageY;
      console.log("开始")
      var marginleftvalue = parseInt(obj.css("margin-left").replace("px", ""));
      var fillwidth = parseInt(fillobj.css("width").replace("px", ""));
      obj.mousemove(function (event) {
        var moveDistance = parseInt(event.pageX - x)
        obj.css("margin-left", marginleftvalue + moveDistance + "px")
        fillobj.css("width", fillwidth + moveDistance + "px")

        //激活下方日期块状样式
        console.log(parseInt(
            parseInt(fillobj.css("width")) / $(".txspan").outerWidth(true)))
        var indexq = parseInt(
            parseInt(fillobj.css("width")) / $(".txspan").outerWidth(true))
        $(".timelineX").children().eq(indexq).addClass("active")
        $(".timelineX").children().eq(indexq).children().eq(0).css(
            {"border-color": "transparent transparent #ffa901"})

        var timedatat = [];
        for (i = 0; i < 25; i++) {
          if (i < 10) {
            timedatat.push("0" + i + ":00")
          } else {
            timedatat.push("" + i + ":00")
          }
        }
        var time24t = $(".txspan").outerWidth(true) / 24
        var q = parseInt($(".timeline_fill").width() / time24t - 24)
        console.log(q)

        $(".timeline_timeshow").html(
            $(".timelineX").children().eq(indexq).find("font").html() + " "
            + timedatat[q])
        // if ($(".timeline_fill").width() >= time24t * k) {
        //
        // }

        obj.mouseup(function (event) {//鼠标释放
          obj.unbind('mousemove')
          obj.unbind('mouseout')
          console.log("up解了")
        })
        obj.mouseout(function (event) {//鼠标释放
          obj.unbind('mousemove')
          obj.unbind('mouseup')
          console.log("out解了")
        })
      })

    })
  },
  CreateTimeLine: function (data, endDate) {
    if ($("#timeline").length > 0) {
      AppEnter.CloseTimeLine();
    }

    var html = '<div class="timeline" id="timeline">'
        + '<span class="timeline_paly"></span>'
        + '<span class="timeline_pause"></span>'
        + '<div class="timeline_fill_p">'
        + '<div class="timeline_timeshow"></div>'
        + '<div class="timeline_fill"></div><span class="btncir"></span>'
        + '</div>'
        + '<div class="timelineX"></div>'
        + '</div>'
    $("body").append(html)
    $("#timeline").css("bottom", $("#scaleDiv").outerHeight(true) * 3 + 10 + 'px')

    //拼接底部日期块
    var TxsapnWidth = $("#timeline").width() / (data.length)
    var txspan = ''
    $.each(data, function (k, v) {
      txspan += '<div class="txspan" data-index="' + k + '" style="width:'
          + (TxsapnWidth - 60)
          + 'px;margin:0 30px"><div class="triangle_border_up"></div><font>' + v
          + '</font></div>'
    })
    $(".timelineX").html(txspan)
    //24小时数组
    var timedata = [];
    for (i = 0; i < 25; i++) {
      if (i < 10) {
        timedata.push("0" + i + ":00")
      } else {
        timedata.push("" + i + ":00")
      }
    }
    //进度条所需要的参数
    var dateindex = 0
    var k = 0    //记录进度条跑了多少个时刻格子
    var dzi = 0  //记录进度条的宽度
    var index24 = 0 //记录时刻格子的宽度
    var indexk = 0  //记录进度条跑了多少个日期格子
    var time24 = $(".txspan").outerWidth(true) / 24 //每个时刻的宽度
    var txspanw = $(".txspan").outerWidth(true) / 2 - $(".btncir").width() / 2; //弃用
    //拖拽事件-s
    //拖拽事件-e

    // 点击进度条快进-s
    $(".timeline_fill_p").mousedown(function (event) {
      $(".timeline_pause").trigger("click")
      var kuaijinwidth = event.pageX - $(
          ".timeline_fill")[0].getBoundingClientRect().left;
      dzi = kuaijinwidth
      $(".timeline_fill").animate({"width": kuaijinwidth + "px"}, 300,
          function () {
          })
      $(".btncir").animate({"margin-left": kuaijinwidth - 8 + "px"}, 300,
          function () {
          })
      $(".timeline_timeshow").animate({"margin-left": kuaijinwidth - 8 + "px"},
          300, function () {
          })
      $(".txspan").removeClass("active")
      $(".triangle_border_up").css(
          {"border-color": "transparent transparent  rgba(0,0,0,0.35)"})
      indexk = parseInt(kuaijinwidth / $(".txspan").outerWidth(true))
      dateindex = indexk;
      index24 = parseInt(
          (kuaijinwidth - (indexk) * $(".txspan").outerWidth(true)) / time24)
      k = indexk * 24 + index24
      for (i = 0; i <= indexk; i++) {
        $(".timelineX").children().eq(i).addClass("active")
        $(".timelineX").children().eq(i).children().eq(0).css(
            {"border-color": "transparent transparent #ffa901"})
      }
      $(".timeline_timeshow").html(
          $(".timelineX").children().eq(dateindex).find("font").html()
          == undefined ? "" : $(".timelineX").children().eq(dateindex).find(
              "font").html() + " "
              + timedata[index24])
      // $(".timeline_paly").trigger("click")
    }).mouseup(function () {
      var stringdtNow = $(".timeline_timeshow").html() + ':00';
      var dateNow = Date.parse(stringdtNow);
      predictionRadioClick(timelineType, dateNow);
    })
    // 点击进度条快进-e

    //鼠标覆盖显示时间-s
    $(".timeline_fill_p").mouseover(function (event) {
      $(".timeline_fill_p").mousemove(function (event) {
        if ($("#timelineShowtime").length > 0) {
          $("#timelineShowtime").css({
            "left": event.pageX + "px",
            "top": (event.pageY - $(window).height() * 0.053) + "px"
          })
        }
        else {
          $("body").prepend("<div id='timelineShowtime' style='left: " + event.pageX + "px;top:" + (event.pageY - 60) + "px;'></div>")
        }
        var timedataOver = [];
        for (i = 0; i < 25; i++) {
          if (i < 10) {
            timedataOver.push("0" + i + ":00")
          } else {
            timedataOver.push("" + i + ":00")
          }
        }
        var leftwidth = event.pageX - $(
            ".timeline_fill")[0].getBoundingClientRect().left;
        var indexkOver = parseInt(leftwidth / $(".txspan").outerWidth(true))
        var dateindexOver = indexkOver;
        var index24Over = parseInt(
            (leftwidth - (indexkOver) * $(".txspan").outerWidth(true)) / time24)
        var kOver = indexkOver * 24 + index24Over

        $("#timelineShowtime").html(
            $(".timelineX").children().eq(dateindex).find("font").html()
            == undefined ? "" : $(".timelineX").children().eq(dateindexOver).find(
                "font").html() + " "
                + timedataOver[index24Over])
      })
    }).mouseleave(function () {
      $("#timelineShowtime").remove()
      $(".timeline_fill_p").unbind("mousemove")
    })
    //鼠标覆盖显示时间-e

    var timeoutValue;
    if (endDate != "" && endDate != undefined) {
      timeoutValue = 1
    }
    else {
      timeoutValue = 1600
    }
    //每一秒轮询一次
    var interval = setInterval(function () {
      if ($(".timeline_timeshow").css("min-width") == "0px") {
        $(".timeline_timeshow").css("min-width", ($(".timeline_timeshow").width() != 0 ? $(".timeline_timeshow").width() + 10 : '') + "px")
      }
      if ($(".timeline_fill").width() >= $(".timeline_fill_p").width()) {
        clearInterval(interval);
        AppEnter.CreateTimeLine(data)
      }

      if ($(".timeline_timeshow").html() == endDate) {
        $(".timeline_pause").trigger("click")
        $(".timeline_paly").trigger("click")
      }

      $(".timeline_fill").css({"width": dzi + "px"})
      $(".btncir").css({"margin-left": dzi - 8 + "px"})
      $(".timeline_timeshow").css({"margin-left": dzi - 8 + "px"})
      dzi += (time24 / 10);
      if ($(".timeline_fill").width() >= time24 * k) {
        $(".timeline_timeshow").html(
            $(".timelineX").children().eq(dateindex).find("font").html()
            == undefined ? "" : $(".timelineX").children().eq(dateindex).find(
                "font").html() + " "
                + timedata[index24])
        k++;
        index24++;
        if (index24 == 24) {
          dateindex++;
          index24 = 0
        } else {
        }
        //console.log("触发后台每小时节点")
        var stringdt = $(".timeline_timeshow").html() + ':00';
        var date = Date.parse(stringdt);
        var edate = Date.parse(endDate + ':00');
        if (date >= edate) {
          predictionRadioClick(timelineType, date);
        }
      }

      if ($(".timeline_fill").css("width").replace("px", "") >= (indexk * ($(
          ".txspan").outerWidth(true)))) {
        $(".timelineX").children().eq(indexk).addClass("active")
        $(".timelineX").children().eq(indexk).children().eq(0).css(
            {"border-color": "transparent transparent #ffa901"})
        indexk++;
        //console.log("触发后台日期节点")
      }

    }, timeoutValue);

    $(".timeline_paly").click(function () {
      $(this).css({"display": "none"}),
          $(".timeline_pause").css({"display": "block"})
      interval = setInterval(function () {
        if ($(".timeline_fill").width() >= $(".timeline_fill_p").width()) {
          clearInterval(interval);
          AppEnter.CreateTimeLine(data)
        }

        $(".timeline_fill").css({"width": dzi + "px"}),
            $(".btncir").css({"margin-left": dzi - 8 + "px"}),
            $(".timeline_timeshow").css({"margin-left": dzi - 8 + "px"}),
            dzi += (time24 / 10);
        if ($(".timeline_fill").width() >= time24 * k) {
          $(".timeline_timeshow").html(
              $(".timelineX").children().eq(dateindex).find("font").html()
              == undefined ? "" : $(".timelineX").children().eq(dateindex).find(
                  "font").html() + " "
                  + timedata[index24])
          k++;
          index24++;
          if (index24 == 24) {
            dateindex++;
            index24 = 0
          } else {
          }
          //console.log("触发后台每小时节点")
          var stringdt = $(".timeline_timeshow").html() + ':00';
          var date = Date.parse(stringdt);
          var edate = Date.parse(endDate + ':00');

          // if (date >= edate) {
          predictionRadioClick(timelineType, date);
          // }
        }

        if ($(".timeline_fill").css("width").replace("px", "") >= (indexk * ($(
            ".txspan").outerWidth(true)))) {
          $(".timelineX").children().eq(indexk).addClass("active")
          $(".timelineX").children().eq(indexk).children().eq(0).css(
              {"border-color": "transparent transparent #ffa901"})
          indexk++;
          //console.log("触发后台日期节点")
        }
      }, 1600);
    })

    $(".timeline_pause").click(function () {
      $(this).css({"display": "none"}),
          $(".timeline_paly").css({"display": "block"})
      dateindex = dateindex
      k = k
      dzi = dzi
      index24 = index24
      indexk = indexk
      clearInterval(interval);
    })
  },
  CloseTimeLine: function () {
    if ($("#timeline").length > 0) {
      window.clearAllGraphicsLayers();
      //清除风流场数据
      clearPrediction();
      $(".timeline_pause").trigger("click")
      $("#timeline").remove()
    }
  },
  // 3d柱形图
  threeZhu: function (value, height, width, title) {
    var html = '<div class="containerqq">'
        + '<div class="qipaoq">' + value + '</div>'
        + '<div class="cube">'
        + '<div class="plane-front" style="background: #0d98d9;height:' + height
        + 'px;width: ' + width + 'px; transform: rotateY(15deg) translateZ('
        + (width / 2) + 'px);"></div>'
        + ' <div class="plane-back" style="height:' + height + 'px;width: '
        + width + 'px; transform: rotateY(15deg) translateZ(-' + (width / 2)
        + 'px);"></div>'
        + '<div class="plane-left" style="background: #07628e;height:' + height
        + 'px;width: ' + width + 'px; transform: rotateY(105deg) translateZ(-'
        + (width / 2) + 'px);"></div>'
        + '<div class="plane-right" style="height:' + height + 'px;width: '
        + width + 'px; transform: rotateY(105deg) translateZ(' + (width / 2)
        + 'px);"></div>'
        + '<div class="plane-top" style="background: #3dc3ff;height:' + width
        + 'px;width: ' + width
        + 'px; transform: rotateX(90deg) rotateZ(-15deg) translateZ(' + (width
            / 2) + 'px);"></div>'
        + ' <div class="plane-bottom" style=";height:' + width + 'px;width: '
        + width + 'px;transform:rotateX(90deg) rotateZ(-15deg) translateZ('
        + ((height - width / 2) < 0 ? (height - width / 2).toString().replace(
            "-", "") : "-" + (height - width / 2)) + 'px)"></div>'
        + '</div>'
        + '<div class="botttombiaoti" style="top:' + (height) + 'px">' + title
        + '</div>'
        + '</div>'

    // $(".plane-front,.plane-back,.plane-left,.plane-right").css("height",height+"px")
    // $(".plane-bottom").css("transform","rotateX(90deg) rotateZ(-15deg) translateZ(-"+(height-50)+"px)")
    return html
  },
  //救援专用modal框
  qlmodalShow: function (title) {
    $("input[data-value=sjlfx]")[0].checked = false
    $("input[data-value=sclfx]")[0].checked = false
    $("input[data-value=jykxxfx]")[0].checked = false
    $("#qlmodal_title").html(title)
    AppEnter.actionIn($("#qlmodal"), 'action_scale', 1, "")
    AppEnter.Move_Part_Mousedown("qlmodal", "qlmodal_title")
    AppEnter.Move_Part_Mouseup("qlmodal_title");
    AppEnter.Set_Area("qlmodal");



    var dayIndex=0
    $("#zjqdayInput").val(getDayNew(0).split(" ")[0])
    $("#nextzjqday").unbind("click").click(function () {
        if(dayIndex>=-2 && dayIndex<0)
        {
        $("#zjqdayInput").val(getDayNew(dayIndex+1).split(" ")[0])
        dayIndex++
        }
        else{
            new AppEnter.ComAlert().ShowAlert("系统提示","无数据","关闭",function () {})
        }
    })
    $("#nextzjqday").css("width",$("#nextzjqday").height()+"px")

    $("#prezjqday").unbind("click").click(function () {
        if(dayIndex>-2)
        {
          $("#zjqdayInput").val(getDayNew(dayIndex-1).split(" ")[0]);
            dayIndex--
        }
        else {
            new AppEnter.ComAlert().ShowAlert("系统提示","无数据","关闭",function () {})
        }
    })
    $("#prezjqday").css("width",$("#prezjqday").height()+"px")

    // $("body").prepend('<div class="qlmodalzz"></div>');
  },
  qlmodalHide: function () {
    $("#qlmodal").css("display", "none")
    // $(".qlmodalzz").remove()
  },
  jybtnShow: function (callback) {
    // AppEnter.jybtnHide()
    // $("body").prepend('<div id="ptt"  class="jybigbtn"></div>')
    // AppEnter.actionIn($("#ptt"), 'action_scale', 1, "")
    // $("#ptt").click(function () {
    //   callback && callback();
    //     // chromeJsObject.callServer(null, new Date());
    //     var paraArr = "{'ScreenPosition':{'Width':'900','Height':'150'},'TalkGroupInfo':{'TalkGroupID':'123','TalkGroupNumber':'10','TalkGroupMember':[{'MemberID':'10001','MemberType':'6','MemberName':'01头船'},{'MemberID':'10002','MemberType':'61','MemberName':'02头船'}]}}";
    //     chromeJsObject.callShip(null, paraArr);
    //     AppEnter.jybtnHide()
    // })
  },
  jybtnHide: function () {

    if ($("#ptt").length > 0) {
      $("#ptt").remove()
    }
  },
  jyRightInfoShow: function (id, code, text, fun) {
    if ($("#" + id).length > 0) {
      $("#" + id).remove()
    }
    var marginright = ''
    if ($(".JYYXRihtgInfro").length > 0 || $(".top_right_top").length > 0) {
      $(".rightInfoPar").css("right", "calc(28% - 30px)")
    }
    else {
      $(".rightInfoPar").css("right", "10px")
    }

    var html = '<div class="rightInfo" id="' + id + '" style=" '
        // +$(".rightInfo").length * $(".rightInfo").outerHeight()
        + '">'
        + '<div class="rightInfoContent">' +
        text +
        '</div>' +
        '<div class="rightInfoEdit">' +
        '<div class="rconfim" data-id="'+id+'" data-text="'+text+'" data-code="'+code+'">确定</div>' +
        '<div class="rcancel" data-id="'+id+'" data-text="'+text+'" data-code="'+code+'">取消</div>' +
        '</div>' +
        '</div>'
    $(".rightInfoPar").prepend(html)
    $("#" + id).find(".rightInfoEdit").find(".rcancel").click(function () {
      AppEnter.jyRightInfoHide(id)
    })
    $("#" + id).find(".rightInfoEdit").find(".rconfim").click(function () {
      if (typeof fun == "function") {
        fun(code, text)
      }
      AppEnter.jyRightInfoHide(id)
    })
    AppEnter.actionIn($(".rightInfo"), 'action_scale', 1, "")
    AppEnter.SaveRightInfo+=html
  },
  SaveRightInfo:"",
  SendSaveInfo:function () {
      if(AppEnter.SaveRightInfo!="")
      {
          $(".rightInfoPar").html(AppEnter.SaveRightInfo);
          $(".rconfim").click(function () {
                  $.ajax({
                      "url": "/api/shipinfo/tcpBdxt.json",
                      "type": "get",
                      "data": {"code": $(this).attr("data-code").split(","), "text": $(this).attr("data-text")},
                      "dataType": "json",
                      "success": function (data) {
                          console.log(data);
                      }
                  })
                  AppEnter.jyRightInfoHide($(this).attr("data-id"))
          })
          $(".rcancel").click(function () {
              AppEnter.jyRightInfoHide($(this).attr("data-id"))
          })
          AppEnter.actionIn($(".rightInfo"), 'action_scale', 1, "")
      }
      else {
          new AppEnter.ComAlert().ShowAlert("提示","暂无短信可以重发。")
      }
  },
  jyRightInfoHide: function (id) {
    if (id != "" && id != undefined) {
      if ($("#" + id).length > 0) {
        $("#" + id).remove()
      }
    }
    else {
      $(".rightInfo").remove()
    }
    // AppEnter.jybtnHide()
  },
  //志愿船视频通话
  VideoTalk: function (parm) {
    console.log(parm)
    chromeJsObject.callServer(null, "456123123456");
  },

  // 军演船 语音通话
  VoiceCall: function (obj) {
    console.log("名称：" + obj);
    chromeJsObject.callServer(null, obj);
  },
  //救援船语音通话
  AudioTalk: function (paraArr,check) {
    // var pars = JSON.stringify(paraArr);
    // chromeJsObject.callShip(null, pars);
    // colseInfoWindow();
    // window.setTimeout(function () {
    //   JiuYuan.rescueMove(paraArr.TgInfo.TgId);
    // },5000);

    if(check && $("#AudioTalk").html()=="语音通话"){
      $("#AudioTalk").html("完成通话")
      chromeJsObject.callServer(null, paraArr.TgInfo.TgName);
    }
    else{
        if($("#AudioTalk").html()=="完成通话"){
            JiuYuan.rescueMove(paraArr.TgInfo.TgId);
            colseInfoWindow();
            $("#AudioTalk").html("语音通话")
        }
    }
  },
  AudioTalkReturn: function (parm) {
    JiuYuan.rescueMove(parm);
  },
  //预案弹框A
  ajaxGet: function (url, data) {
    $.ajax({
      type: 'GET',
      dataType: "json",//返回数据类型
      async: false,
      data: data,
      url: url,//请求的action路径
      success: function (r) { //请求成功后处理函数。  取到Json对象data
        data = r.result
      }
    })
    return data;
  },
  TastTimeOut: null,
  TaskContentLoading: function (title, orgParm) {
    var JYBMTASKDATA;
    var middle = '';
    JYBMTASKDATA = AppEnter.ajaxGet("api/shipinfo/searchTaskByOrgType.json", {
      "plantype": title,
      "orgName": orgParm
    })

    $.each(JYBMTASKDATA, function (k, v) {
      middle += '<div id="' + v.gid + v.orgName + v.plantype
          + '" class="BMContentChild ' + (v.isexecution == 1
              ? 'BMContentChild_active' : '') + '">'
          + '<div class="BMChildTitle">' + (k + 1) + '/' + JYBMTASKDATA.length
          + ' <span class="BMTIME ' + (v.timeStr == undefined ? 'hidebmtime'
              : '') + '">' + v.timeStr + '</span> </div>'
          + '<div class="BMChildText">' + v.taskdescription + '</div>'
          + '<div class="BMChildStatus"></div>'
          + '</div>'
          + '<div class="BMZX"></div>'
    })
    return middle;
  },
  TaskShow: function (isanimate, title, orgParm) {
    AppEnter.TaskHide()
    $(".JYYXIcon").css("display", "none").unbind("click").click(function () {
      AppEnter.TaskShow(false, title)
    })
    if ($(".rightInfo").length > 0) {
      $(".rightInfoPar").css("right", "calc(28% - 30px)")
    }
    $(".rightBottomPanel").animate({"right": "30.5%"}, 500, function () {
    })
    var BMMCSTR = ''
    var middle = '';
    var html = ''
    //请求服务加载部门
    var BMMC = AppEnter.ajaxGet("api/shipinfo/searchOrgByType.json",
        {"plantype": title})
    $.each(BMMC, function (k, v) {
      BMMCSTR += '<div>' + v + '</div>'
    })
    BMMCSTR = '<div class="BMPar"><div class="BMDIV">' + BMMCSTR
        + '</div></div>'
    //请求服务加载任务
    html = '<div class="JYYXRihtgInfro">'
        + '<div class="JYYXTitle" id="yatkid">'
        + '<div class="JYYXTitleText" >' + title + '预案</div>'
         +'<div class="InFoRepeatSend">发送指令</div>'
        + '<div class="JYYXTitleClose"><img class="JYYXTitleCloseBtn" src="/static/img/qlmain/btn_close.png"/></div>'
        + '</div>'
        + BMMCSTR + '<div class="BMContent">' + (BMMC.length > 0
            ? AppEnter.TaskContentLoading(title, BMMC[0]) : '') + '</div>'
        + '</div>'
    $("body").append(html)
    if (isanimate) {
      $(".JYYXRihtgInfro").css("display", "block")
    }
    else {
      AppEnter.actionIn($(".JYYXRihtgInfro"), 'bounceInRight', 1, "")
    }
    $(".BMContent").height(
        $(".JYYXRihtgInfro").height() - $("#yatkid").outerHeight(true) - $(
        ".BMPar").outerHeight(true) - 40)
    $(".JYYXTitleCloseBtn").click(function () {
      AppEnter.TaskHide(true)
      $(".JYYXIcon").css("display", "flex")
    })
    $(".BMDIV > div").click(function () {
      $(".BMDIV > div").removeClass("BMDIV_actice")
      $(this).addClass("BMDIV_actice")
      $(".BMContent").html(AppEnter.TaskContentLoading(title, $(this).html()))
    })
    $(".BMDIV").children().eq(0).addClass("BMDIV_actice")
    // 正式版
    AppEnter.TastTimeOut = setInterval(function () {
      var activeData = AppEnter.ajaxGet("api/shipinfo/searchTaskByOrgType.json",
          {
            "plantype": title,
            "isStart": "1",
            "orgName": $(".BMDIV_actice").html()
          })
      $.each(activeData, function (k, v) {
        $("#" + v.gid + v.orgName + v.plantype).addClass(
            "BMContentChild_active")
        $("#" + v.gid + v.orgName + v.plantype).children().find(
            "span").removeClass("hidebmtime").html(v.timeStr.toString())
      })
    }, 5000)

    $(".InFoRepeatSend").unbind("click").click(function () {
        AppEnter.SendSaveInfo()
    })
  },
  TaskHide: function (changewidth) {
    $(".JYYXIcon").css("display", "none")
    clearTimeout(AppEnter.TastTimeOut)
    if (changewidth) {
      $(".rightInfoPar").css("right", "10px")
    }
    if ($(".JYYXRihtgInfro").length > 0) {
      $(".rightBottomPanel").animate({"right": "20px"}, 500, function () {
      })
      $(".JYYXRihtgInfro").remove()
    }
  },
  // 扫海弹框
  formCheck: function (id) {
    // e.preventDefault();
  },
  SHShow: function (title) {
    clearAllGraphicsLayers();
    AppEnter.formCheckComReset("LForm");
    $("#SCModalTitle").html(title)
    $("#LFormbtn").unbind("click")
    $("#LFormbtnClose").unbind("click")
    $("#LFormbtn").click(function () {
      var dataparm = $("#LForm").parseForm()
      console.log(dataparm)
      if (!AppEnter.formCheckCom("LForm")) {
        return false
      }
      AppEnter.SHHide()
      //弹出预案弹框
      AppEnter.TaskShow(false, title)
      var dxmessage = "根据军方需求对相应区域进行扫海行动,收到信息的船只,按照规定时间进行扫海任务."
      AppEnter.jyRightInfoShow("jsxdsh", "mmsis", dxmessage, function (mmsis, con) {
        ObtainPoint.clear();
        SaoHai.stratMove();
        // $.ajax({
        //     "url": "/api/shipinfo/tcpBdxt.json",
        //     "type": "get",
        //     "data": {"code": mmsis, "text": con},
        //     "dataType": "json",
        //     "success": function (data) {
        //         console.log(data);
        //     }
        // });
      });
      SaoHai.creatrNew(map, dataparm)
    })
    $("#LFormbtnClose").click(function () {
      AppEnter.SHHide()
    })
    AppEnter.actionIn($(".SCModal"), 'action_scale', 1, "")
    AppEnter.Move_Part_Mousedown("SCModaltd", "SCModalTitle")
    AppEnter.Move_Part_Mouseup("SCModalTitle");
    AppEnter.Set_Area("SCModaltd");

    $("input[name=SIime],input[name=ETime]").datetimepicker({
      language: "zh-CN",
      autoclose: true,//选中之后自动隐藏日期选择框
      clearBtn: true,//清除按钮
      minView: 2,
      todayBtn: "linked",//今日按钮,"linked"为点击获取今日
      format: 'yyyy-mm-dd'//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
    });
    $('input[name=SIime]').datetimepicker('setDate', new Date(getDayNew(-1)));
    $('input[name=ETime]').datetimepicker('setDate', new Date(getDayNew(0)));
    // AppEnter.Move_Part_Mousedown("SCModaltd")
    // AppEnter.Move_Part_Mouseup("SCModaltd");
    // AppEnter.Set_Area("SCModaltd");

  },
  SHHide: function () {
    // AppEnter.actionOut($(".SCModal"), 'action_scaleOut', 1, "")
    $(".SCModal").css("display", "none")
  },
  // 岸基渔港弹框
  YgGkShow: function (title) {
    AppEnter.formCheckComReset("AJForm")
    $("#pickList").html("")
    //点击筛选
    var pick;
    $("#YgGkSx").unbind("click").click(function () {
      if (!AppEnter.formCheckCom("AJForm", function (e) {
        if (e) $("#pickList").html("")
      })) return false
      var dataparm = $("#AJForm").parseForm()
      //此处传值获取地图obj&加载左右框
      var PicklistData = {}
      var PicklistDataSelect = {}
      $("#yggkedit").css("display", "block")
      // //输入参数点击筛选，返回数组
      portControl.loadMilitaryArea(dataparm.maxWd, dataparm.minWd,
          dataparm.minJd, dataparm.maxJd, dataparm.shfw);
      var data = portControl.selectPort();
      $.each(data.unSelectedPorts, function (key, val) {
        PicklistData[val.attributes.StationName] = {"id": key, "text": val};
      })
      $.each(data.selectedPorts, function (key, val) {
        PicklistDataSelect[val.attributes.StationName] = {
          "id": key,
          "text": val
        };
      })
      pick = $("#pickList").pickList(
          {data: PicklistData, dataSelect: PicklistDataSelect});
    })
    //点击提交获取地图obj
    $("#AJYGSubmit").unbind("click").click(function () { //弹出预案弹框
      ObtainPoint.clear();
      if (pick.getValues().length <= 0) {
        $(".pickListResult").addClass("tableErrorJw")
      }
      else {
        AppEnter.TaskShow(false, title)
        var dxmessage = "根据军方需求对相应的渔港进行沿岸管控,收到信息的船只按照规定时间,进行管控任务."
        AppEnter.jyRightInfoShow("ajyggk", "mmsis", dxmessage, function (mmsis, con) {
          ObtainPoint.clear();
          // $.ajax({
          //     "url": "/api/shipinfo/tcpBdxt.json",
          //     "type": "get",
          //     "data": {"code": mmsis, "text": con},
          //     "dataType": "json",
          //     "success": function (data) {
          //         console.log(data);
          //     }
          // });
          $(".pickListResult").removeClass("tableErrorJw")
          var data = {
            "unSelectedPorts": pick.getValuesUn(),
            "selectedPorts": pick.getValues()
          }
          portControl.showShip(data);
        });
        AppEnter.YgGkHide()
      }
    })
    $("#AJYGClose").unbind("click").click(function () {
      AppEnter.YgGkHide()
    })

    $("input[name=ygSIime],input[name=ygETime]").datetimepicker({
      language: "zh-CN",
      autoclose: true,//选中之后自动隐藏日期选择框
      clearBtn: true,//清除按钮
      minView: 2,
      todayBtn: "linked",//今日按钮,"linked"为点击获取今日
      format: 'yyyy-mm-dd'//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
    });
    $('input[name=ygSIime]').datetimepicker('setDate', new Date(getDayNew(-1)));
    $('input[name=ygETime]').datetimepicker('setDate', new Date(getDayNew(0)));

    AppEnter.actionIn($(".YgGkModal"), 'action_scale', 1, "")
    AppEnter.Move_Part_Mousedown("YgGkModal", "YgGkModalTitle")
    AppEnter.Move_Part_Mouseup("YgGkModalTitle");
    AppEnter.Set_Area("YgGkModal");
  },
  YgGkHide: function () {
    $(".YgGkModal").css("display", "none")
    $("#yggkedit").css("display", "none")
  },
  LoadingJunYanShow: function (text, fun) {
    RescueInfo.clearRescueRateLayer();
    AppEnter.LoadingJunYanHide()
    $("body").prepend(
        '<div class="JunYanLoading" id="JunYanLoading"><img class="deng" src="/static/img/qlmain/deng.gif">'
        + ' <h3 class="gradient-text gradient-text-two" data-content="' + text + '">' + text + '</h3>'
        + '<div class="JunYanLoadingEdit"><button class="JunYanLoadingBtn" id="JunYanLoadingBtn">确 定</button> </div>'
        + '</div><div class="zhezhaoql"></div>');

    if (typeof fun == "function") {
      $("#JunYanLoadingBtn").unbind("click").click(function () {
        fun()
        AppEnter.LoadingJunYanHide()
      })
    }
    else {
      $("#JunYanLoadingBtn").unbind("click").click(function () {
        AppEnter.LoadingJunYanHide()
      })
    }
  },
  LoadingJunYanHide: function () {
    if ($(".zhezhaoql").length > 0) {
      $(".zhezhaoql").remove()
    }
    if ($(".JunYanLoading").length > 0) {
      $(".JunYanLoading").remove()
    }
    if ($(".deng").length > 0) {
      $(".deng").remove()
    }
  },
  // 边海防应急预案
  bfyjzzModalShow: function (title) {
    $("#bfyjzzModalTitle").html(title)
    $("input[name=bfSIime],input[name=bfETime]").datetimepicker({
      language: "zh-CN",
      autoclose: true,//选中之后自动隐藏日期选择框
      clearBtn: true,//清除按钮
      minView: 2,
      todayBtn: "linked",//今日按钮,"linked"为点击获取今日
      format: 'yyyy-mm-dd'//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
    });
    $('input[name=bfSIime]').datetimepicker('setDate', new Date(getDayNew(-1)));
    $('input[name=bfETime]').datetimepicker('setDate', new Date(getDayNew(0)));

    AppEnter.actionIn($("#bfyjzzModal"), 'action_scale', 1, "")
    AppEnter.Move_Part_Mousedown("bfyjzzModal", "bfyjzzModalTitle")
    AppEnter.Move_Part_Mouseup("bfyjzzModalTitle");
    AppEnter.Set_Area("bfyjzzModal");
  },
  bfyjzzModalHide: function () {
    $("#bfyjzzModal").css("display", "none")
    $("#BfYjChaotUl").html("")
    $("#subBf").css("display", "none")
    AppEnter.formCheckComReset("BFForm")
  },
  // 海上资源调度
  hszyddModalShow: function (title) {
    // $("input[name=ds]").val(20)
    // $("input[name=cs]").val(1)
    $("#hszyddModalTitle").html(title)
    // 后台获取数据加载表单
    AppEnter.actionIn($("#hszyddModal"), 'action_scale', 1, "")
    AppEnter.hszyddInterval = setInterval(function () {
      console.log("获取调度数据")
      var formdata = AppEnter.ajaxGet("/api/sjZyd/getZydAllData.json")
      if (formdata && formdata.length > 0) {
        AppEnter.LoadingJunYanShow("接受到资源调度信息!", function () {
          $("#DDForm").setForm(formdata[0])
          AppEnter.actionIn($("#hszyddModal"), 'action_scale', 1, "")
          AppEnter.Move_Part_Mousedown("hszyddModal", "hszyddModalTitle")
          AppEnter.Move_Part_Mouseup("hszyddModalTitle");
          AppEnter.Set_Area("hszyddModal");
        })
        AppEnter.actionIn($("#JunYanLoading"), 'action_scale3', 0.2, "")
        AppEnter.RemoveInterval()
        AppEnter.ajaxGet("/api/sjZyd/deleteAllData.json?type=0")
      }
    }, 1000)
    AppEnter.Move_Part_Mousedown("hszyddModal", "hszyddModalTitle")
    AppEnter.Move_Part_Mouseup("hszyddModalTitle");
    AppEnter.Set_Area("hszyddModal");
  },
  hszyddModalHide: function () {
    $("#subDD").css("display", "none")
    $("#hszyddModal").css("display", "none")
    $("#ddChaotUl").html("")
    AppEnter.formCheckComReset("DDForm")
  },
  // 查询备选框
  SearchBxInit: function () {
    //移动
    $(".moveDivChhild").click(function () {
      var listp = $("#searchResult ul");
      var p = listp.find("li label input:checkbox:checked").parent().parent();
      p.clone().appendTo($(".searchBxul"));
      // 获取所有li元素
      var li = $(".searchBxul li").map(function () {
        return '<li>' + $(this).html() + '</li>';
      }).get();
      // 剔除重复值
      $.unique(li);
      // 删除之前的li元素
      $(".searchBxul li").remove();
      // 创建无重复的li元素
      $.each(li, function (index, val) {
        $(".searchBxul").append(val)
      });
      $("#qxsearch").removeClass("qxflag").addClass("qxflag").html("全选")
    })
    //提交
    $("#tjsearch").click(function () {
      var textAreaHtml = "<textarea class='textArearText'></textarea>"
      new AppEnter.ComAlert().ShowAlert("输入短信内容", textAreaHtml, "提交", function () {
        $.each($(".searchBxul").find("li label input:checkbox:checked"), function (key, value) {
          AppEnter.jyRightInfoShow("search" + key, $(this).attr("data-code"), $(".textArearText").val(), function (mmsis, con) {
            // $.ajax({
            //     "url": "/api/shipinfo/tcpBdxt.json",
            //     "type": "get",
            //     "data": {"code": mmsis, "text": con},
            //     "dataType": "json",
            //     "success": function (data) {
            //         console.log(data);
            //     }
            // });
          });
        })
      })
    })
    //删除
    $("#scsearch").click(function () {
      $(".searchBxul").find("li label input:checkbox:checked").parent().parent().remove()
    })
    //全选
    $("#qxsearch").click(function () {
      if (!$(this).hasClass("qxflag")) {
        $(this).addClass("qxflag")
        $.each($(".searchBxul  li label input:checkbox"), function (key, value) {
          value.checked = false
        })
        $(this).html("全选")
      }
      else {
        $(this).removeClass("qxflag")
        $.each($(".searchBxul  li label input:checkbox"), function (key, value) {
          value.checked = true
        })
        $(this).html("撤销")
      }
    })
  },
  SearchDivClose: function () {
    $("#searchDiv").css("display", "none")
    $(".searchBxul li").remove()
  },
  //资源调度到期框
  ZyDqShow: function (text) {
    var html = '<div class="ZyDqShow" id="ZyDqShow">'
        // + '<div class="ZyDqShowTitle" id="ZyDqShowTitle">信息提示<button onclick="AppEnter.ZyDqClose()" class="ComAlertCloseBtn"></button></div>'
        + '<div class="ZyDqContent">' + text + '</div>'
        // + '<div class="ZyDqEdit">'
        // + '<span class="zhyspthbtn" onclick="AppEnter.ZyDqClose()">关闭</span>' + '</div>'
        + '</div>'
    $("body").prepend(html)
    AppEnter.actionIn($("#ZyDqShow"), 'action_scale', 0.2, "")
    AppEnter.Move_Part_Mousedown("ZyDqShow", "ZyDqShow")
    AppEnter.Move_Part_Mouseup("ZyDqShow");
    AppEnter.Set_Area("ZyDqShow");
  },
  ZyDqClose: function () {
    $(".ZyDqShow").remove()
  },
  //=========================================================================以此为分割线,下方属于改变内容
  //短信管理相关
  SendUser: function (title) {
      AppEnter.formCheckComReset("DXForm")
      $("#pickList").html("")
      //点击筛选
      var pick;
      $("#YgGkSx").unbind("click").click(function () {
          if (!AppEnter.formCheckCom("AJForm", function (e) {
            if (e) $("#pickList").html("")
          })) return false
          var dataparm = $("#AJForm").parseForm()
          //此处传值获取地图obj&加载左右框
          var PicklistData = {}
          var PicklistDataSelect = {}
          $("#yggkedit").css("display", "block")
          // //输入参数点击筛选，返回数组
          portControl.loadMilitaryArea(dataparm.maxWd, dataparm.minWd,
              dataparm.minJd, dataparm.maxJd, dataparm.shfw);
          var data = portControl.selectPort();
          $.each(data.unSelectedPorts, function (key, val) {
              PicklistData[val.attributes.StationName] = { "id": key, "text": val };
          })
          $.each(data.selectedPorts, function (key, val) {
              PicklistDataSelect[val.attributes.StationName] = {
                  "id": key,
                  "text": val
              };
          })
          pick = $("#pickList").pickList(
              { data: PicklistData, dataSelect: PicklistDataSelect });
      })
   

      $("input[name=ygSIime],input[name=ygETime]").datetimepicker({
          language: "zh-CN",
          autoclose: true,//选中之后自动隐藏日期选择框
          clearBtn: true,//清除按钮
          minView: 2,
          todayBtn: "linked",//今日按钮,"linked"为点击获取今日
          format: 'yyyy-mm-dd'//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
      });
      $('input[name=ygSIime]').datetimepicker('setDate', new Date(getDayNew(-1)));
      $('input[name=ygETime]').datetimepicker('setDate', new Date(getDayNew(0)));
  },
};

// 格式化日期
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1,
          (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(
              ("" + o[k]).length)));
    }
  }
  return fmt;
};

function anJiYuGangGuanKong(ref) {

  $.ajax({
    type: "get",
    url: "http://" + window.location.host + "/api/shipdata/zycwz.json",
    data: {},
    dataType: "json",
    success: function (data) {
      if (data.success) {
        var Point = require("esri/geometry/Point");
        var SpatialReference = require("esri/SpatialReference");
        map.centerAndZoom(new Point(120.30127222222222, 35.925405555555555,
            new SpatialReference({wkid: 4326})), 11);
        for (var i = 0; i < data.result.length; i++) {
          if (data.result[i].code.indexOf("中国渔政") > -1) {
            ref.update(data.result[i]);
          }
        }
      }
    }
  });
}