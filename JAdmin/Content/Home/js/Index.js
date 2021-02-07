//初始化目录树并默认展开第一个功能
function initlefttree(data) {
	ListSuspects.TreeMenuInit(data);
	$(".treeMemuQ").children().eq(0).children().eq(0).trigger("click")
	//左侧树缩进按钮操作
	$(".daohangcd,.suojinlogo").click(function () {
		if ($(".ql_left_p").hasClass("showq")) {
			$(".suojinlogo").animate({
				"left": "0px"
			})
			$(".ql_left_p").animate({
				"width": "0px"
			}).removeClass("showq").css("display", "none")
			$(".ql_right_p").animate({
				"width": "100%"
			})
			$(".suojinlogo").attr("src", "/Img/Home/zhixiangyou.jpg")
			$(".suojinlogo").css("display", "block")
		} else {
			$(".suojinlogo").animate({
				"left": "240px"
			})
			$(".ql_left_p").animate({
				"width": "240px"
			}).addClass("showq").css("display", "block")
			$(".ql_right_p").css({
				"width": "calc(100% - 240px)"
			})
			$(".suojinlogo").attr("src", "/Img/Home/btn_sq.png")
			$(".suojinlogo").css("display", "none")
		}
	})
	$(".treeMemuQ_li1").click(function () {
		$(".treeMemuQ_li1").removeClass("active");
		$(this).addClass("active");
	})
	$(".ql_top_p .admin em").click(function (){

	})
	// $(".treeMemuQ .treeMemuQ2 li").click(function (){
	// 	var i = $(this).index();
	// 	$(".ql_right_p .contain").eq((i)).show().siblings().hide();
	// })

}
//创建左侧树的功能权限列表 并为主界面右上角的用户姓名赋值
function CreateMenu(FunData) {
	//加载功能权限
	initlefttree(FunData)
}
//初始化横向tab
function initAddTab() {
	$('#tabs').addtabs({
		iframeHeight: $(".ql_right_p").outerHeight(true) -
			$("#tabs > .nav").outerHeight(true) -
			6
	});
}
//初始化中间区域的高度
function initHeight() {
	$(".ql_left_p,.ql_right_p").height(
		$(window).innerHeight() -
		67 //61为顶部的高度
		//- 25  //25为底部的高度   
		-
		6
	)
}
$(function () {
	var fundata = [{
		"name": "系统管理",
		"isparent": false,
		"FUNCTION_ID": "1094adb0-33aa-44f1-851d-a8498706830a",
		"FUNCTION_NAME": "系统管理",
		"PARENT_ID": "#",
		"URL": "",
		"OPEN_TYPE": "",
		"FUNCTION_ICON": "",
		"children": [{
			"children": [],
			"name": "用户管理",
			"isparent": false,
			"FUNCTION_ID": "c4cee16b-d1c6-4921-991f-910e9f468503",
			"FUNCTION_NAME": "用户管理",
			"PARENT_ID": "1094adb0-33aa-44f1-851d-a8498706830a",
			"URL": "https://www.baidu.com/",
			"OPEN_TYPE": "2",
			"FUNCTION_ICON": "",
		}, {
			"children": [],
			"name": "角色管理",
			"isparent": false,
			"FUNCTION_ID": "18d3dbfb-1cc1-4ebf-ac63-38c89b18ce6f",
			"FUNCTION_NAME": "角色管理",
			"PARENT_ID": "1094adb0-33aa-44f1-851d-a8498706830a",
			"URL": "https://uland.taobao.com/",
			"OPEN_TYPE": "2",
			"FUNCTION_ICON": "",
		}, {
			"children": [],
			"name": "功能管理",
			"isparent": false,
			"FUNCTION_ID": "71e6c8ed-3f3f-477e-9099-15147f4cdc94",
			"FUNCTION_NAME": "功能管理",
			"PARENT_ID": "1094adb0-33aa-44f1-851d-a8498706830a",
			"URL": "https://www.baidu.com/",
			"OPEN_TYPE": "2",
			"FUNCTION_ICON": "",
		}]
	}, {
		"name": "基本设置",
		"isparent": false,
		"FUNCTION_ID": "1",
		"FUNCTION_NAME": "系统管理",
		"PARENT_ID": "#",
		"URL": "",
		"OPEN_TYPE": "",
		"FUNCTION_ICON": "",
		"children": [{
			"children": [],
			"name": "个人设置",
			"isparent": false,
			"FUNCTION_ID": "c4cee16b-d1c6-4921-991f-910e9f468503",
			"FUNCTION_NAME": "个人设置",
			"PARENT_ID": "2",
			"URL": "https://www.baidu.com/",
			"OPEN_TYPE": "2",
			"FUNCTION_ICON": "",
		}]
	}, {
		"name": "业务管理",
		"isparent": false,
		"FUNCTION_ID": "1094adb0-33aa-44f1-851d-a8498706830a",
		"FUNCTION_NAME": "业务管理",
		"PARENT_ID": "#",
		"URL": "",
		"OPEN_TYPE": "",
		"FUNCTION_ICON": "",
		"children": [{
			"children": [],
			"name": "123",
			"isparent": false,
			"FUNCTION_ID": "18d3dbfb-1cc1-4ebf-ac63-38c89b18ce6f",
			"FUNCTION_NAME": "123",
			"PARENT_ID": "1094adb0-33aa-44f1-851d-a8498706830a",
			"URL": "https://uland.taobao.com/",
			"OPEN_TYPE": "2",
			"FUNCTION_ICON": "",
		}]
	}]
	initAddTab();
	CreateMenu(fundata);
})
