
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
			html += '<li class="treeMemuQ_li1">' + '<a class="treeMemuQ_li_a1">' + val.name + '</a>' +
				ListSuspects.TreeMenuTwoUl(val.children, val.name) + '</li>'
		})
		$("#treeMemuQ_Div").html('<ul class="treeMemuQ">' + html + '</ul>')
		ListSuspects.oneli_aClick();
		ListSuspects.twoli_aClick();
	},
	TreeMenuTwoUl: function(data, rootname) {
		if (data.length == 0) {
			return ''
		}
		var ul = '';
		$.each(data, function(key, val) {
			if (val.children.length > 0) {
				ul += '<li><a class="treeMemuQ_li_a2"><span class="badageLeft">' + val.name + '</span></a>' +
					ListSuspects.TreeMenuThreeUl(val.children, val.name, rootname) + '</li>'
			}
			else{
				 ul +='<li><a class="treeMemuQ_li_a2"><span class="badageLeft">'+val.name+'</span></a></li>'
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
	//二级菜单点击事件
	twoli_aClick: function() {
		$(".treeMemuQ_li_a2").click(function() {
			$(this).parent().siblings().children().removeClass("active");
			$(this).parents().find(".treeMemuQ2").children().children().removeClass("active");
			$(this).addClass("active");
		});
	}
}

window.onload = function() {
	ListSuspects.TreeMenuInit(TreeMenuData);
}
