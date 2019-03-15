var app = angular.module('noteApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('noteCtrl',function($scope, $http, $cookies, $window, dialogs) {


	angular.element(document).ready(function () {
		$scope.getItemList();
	});
	
	$scope.getItemList = function(){
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?func=string'
		}).then(function (response){
			//debugger;
			$scope.itemList = response.data;
			$("#search").autocomplete({
				source:[$scope.itemList]
			});
			
			waitingDialog.hide();
		});
	}
});