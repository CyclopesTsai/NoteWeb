var app = angular.module('workApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('workCtrl',function($scope, $http, $cookies, $window, dialogs) {

	$scope.tmpData = {
		subject: '',
		content: ''
	};

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
			//$scope.edit = parent.document;
			
			//debugger;
			waitingDialog.hide();
		});
	}
	
	$scope.changeStatus = function(work) {
		if(work) {
			var param = 'func=workUpd';
			param += ('&data=' + encodeURIComponent(angular.toJson(work)));
			
			waitingDialog.show();
			$http({
				method: 'POST',
				url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec',
				data : param,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response){
				if( response.data == 'true' ){
					work.status = 'Y';
				}
				waitingDialog.hide();
			});
		}
	}
	
	$scope.insert = function() {
		if($scope.tmpData) {
			if(!$scope.tmpData.subject || !$scope.tmpData.content){
				return;
			}
			
			var param = 'func=workAdd';
			param += ('&data=' + encodeURIComponent(angular.toJson($scope.tmpData)));
			
			waitingDialog.show();
			$http({
				method: 'POST',
				url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec',
				data : param,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response){
				if( response.data == 'true' ){
					$scope.tmpData = {
						subject: '',
						content: ''
					};
				}
				
				param = 'func=workJson';
				$http({
					method: 'GET',
					url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
				}).then(function (response){
					$scope.workList = response.data;
					
					waitingDialog.hide();
				});
			});
		}
	}
});