
var TreeMenuData = [
	{
	"name": "河北省",
	"children": [{
		"name": "石家庄市",
		"children": []
	}, {
		"name": "唐山市",
		"children": [{
			"name": "HB20180801",
		}, {
			"name": "HB20180901",
		}]
	}]
},
{
	"name": "山东省",
	"children": [{
		"name": "潍坊市",
		"children": []
	}, {
		"name": "安丘市",
		"children": [{
			"name": "HB20180801",
		}, {
			"name": "HB20180901",
		}]
	}]
},
{
	"name": "河南省",
	"children": [{
		"name": "河南好啊",
		"children": []
	}, {
		"name": "真不错",
		"children": [{
			"name": "HB20180801",
		}, {
			"name": "HB20180901",
		}]
	}]
}
]

window.ListSuspects = {
	SetbodyContent_title: function(title) {
		$(".bodyContent_title").html(title)
	},
	TreeMenuInit: function(data) {
		var html = '';
		$.each(data, function(key, val) {
			html += '<li class="treeMemuQ_li1 ">' + '<a class="treeMemuQ_li_a1 fa fa-certificate">' + val.name + '</a>' +
				ListSuspects.TreeMenuTwoUl(val.children, val.name) + '</li>'
		})
		$("#treeMemuQ_Div").html('<ul class="treeMemuQ">' + html + '</ul>')
		ListSuspects.oneli_aClick();
		ListSuspects.twoli_aClick();
        ListSuspects.threeli_aClick();
        // $(".treeMemuQ2").css({ "height": $("#treeMemuQ_Div").height() - ($(".treeMemuQ").children().length * 32)  + "px" })
	},
	TreeMenuTwoUl: function(data, rootname) {
		if (data.length == 0) {
			return ''
		}
		var ul = '';
		$.each(data, function(key, val) {
			if (val.children.length > 0) {
				ul += '<li><a class="treeMemuQ_li_a2 "><span class="badageLeft">' + val.name + '</span><span class="badage">' +
					val.children.length + '</span></a>' +
					ListSuspects.TreeMenuThreeUl(val.children, val.name, rootname) + '</li>'
			}
			else{
                ul += '<li><a class="treeMemuQ_li_a2 " href="#" url="' + val.URL + '" data-addtab="' + val.FUNCTION_ID + '">' + val.FUNCTION_NAME+'</a></li>'
			}
		})
		return '<ul class="treeMemuQ2">' + ul + '</ul>'
	},
	TreeMenuThreeUl: function(data, parentname, rootname) {
		if (data.length == 0) {
			return ''
		}
		var ul = '';
		$.each(data, function(key, val) {
			// console.log(val)
			ul += '<li><a class="treeMemuQ_li_a3" data-parentname="' + parentname +
				'" data-rootname="' + rootname + '" >' + val.name + '</a></li>'
		})
		return '<ul class="treeMemuQ3">' + ul + '</ul>'
	},
	oneli_aClick: function() {
		$(".treeMemuQ_li_a1").click(function() {
			if (!$(this).hasClass("active_li_a1")) {
				$(this).addClass("active_li_a1")
				$(".treeMemuQ_li_a1").next().slideUp(function() {
					$(this).prev().removeClass("active_li_a1")
				})
				$(this).next().slideDown(function() {
					$(this).prev().addClass("active_li_a1")
				});
			} else {
				$(this).removeClass("active_li_a1")
				$(this).next().slideUp(function() {
					$(this).prev().removeClass("active_li_a1")
				})
			}
		})
	},
	twoli_aClick: function() {
		$(".treeMemuQ_li_a2").click(function() {
			$(".treeMemuQ_li_a2").next().slideUp()
			if (!$(this).hasClass("flagDown")) {
				$(".treeMemuQ_li_a2").removeClass("flagDown")
				$(this).next().slideDown()
				$(this).addClass("flagDown")
			} else {
				$(this).removeClass("flagDown")
			}
			$(".li2_active").removeClass("li2_active")
			$(this).parent().addClass("li2_active");
		});
	},
	threeli_aClick: function() {
		$(".treeMemuQ_li_a3").click(function() {
			$(".li_a3_active").removeClass("li_a3_active")
			$(this).addClass("li_a3_active");
			ListSuspects.SetbodyContent_title($(this).attr("data-rootname") + ">" + $(this).attr("data-parentname") + ">" +
				$(this).html())

		});
	}
}


