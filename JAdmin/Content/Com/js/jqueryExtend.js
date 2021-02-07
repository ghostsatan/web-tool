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