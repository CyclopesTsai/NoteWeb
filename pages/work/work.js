var app = angular.module('workApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('workCtrl',function($scope, $http, $cookies, $window, dialogs) {

	$scope.itemName = '';

	angular.element(document).ready(function () {
		$scope.getWorkList();
	});
	
	$scope.getWorkList = function() {
		var param = 'func=workJson';
		
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
		}).then(function (response){
			//debugger;
			$scope.workList = response.data;
			
			waitingDialog.hide();
		});
	}
	
	$scope.changeStatus = function(work) {
		if(work) {
			var param = 'func=workJson';
			
			waitingDialog.show();
			$http({
				method: 'GET',
				url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
			}).then(function (response){
				
				work.status = 'Y';
				
				waitingDialog.hide();
			});
		}
	}
	
	$scope.test = function(work) {
		if(work) {
			var param = 'func=workUpd';
			param += 
			
			waitingDialog.show();
			$http({
				method: 'POST',
				url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
			}).then(function (response){
				
				work.status = 'Y';
				
				waitingDialog.hide();
			});
		}
	}
});