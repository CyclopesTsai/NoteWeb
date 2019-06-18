var app = angular.module('noteApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('noteCtrl',function($scope, $http, $cookies, $window, dialogs) {

	angular.element(document).ready(function () {
		$scope.getMenuList();
	});
	
	$scope.getMenuList = function() {
		var param = 'func=menuJson';
		
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
		}).then(function (response){
			
			$scope.menuList = response.data;
			
			waitingDialog.hide();
		});
	}
	
	$scope.changeRightFrame = function(menu) {
		if(menu) {
			var url = ("pages/"+menu.url+"/"+menu.url+".html");
			$("#rightFrame").attr("src",url);
		} else {
			$("#rightFrame").attr("src","");
		}
	}
});