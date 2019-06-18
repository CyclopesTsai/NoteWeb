var app = angular.module('noteClassApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('noteClassCtrl',function($scope, $http, $cookies, $window, dialogs) {

	$scope.tmpData = {
		name: ''
	};

	angular.element(document).ready(function () {
		$scope.getNoteClassList();
	});
	
	$scope.getNoteClassList = function() {
		var param = 'func=noteClassJson';
		
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
		}).then(function (response){
			//debugger;
			$scope.noteClassList = response.data;
			
			waitingDialog.hide();
		});
	}
	
	$scope.changeStatus = function(noteClass) {
		if(noteClass) {
			var param = 'func=noteClassUpd';
			param += ('&data=' + encodeURIComponent(angular.toJson(noteClass)));
			
			waitingDialog.show();
			$http({
				method: 'POST',
				url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec',
				data : param,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response){
				
				param = 'func=noteClassJson';
				$http({
					method: 'GET',
					url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
				}).then(function (response){
					$scope.noteClassList = response.data;
				});
				
				waitingDialog.hide();
			});
		}
	}
	
	$scope.insert = function() {
		if($scope.tmpData) {
			if(!$scope.tmpData.name){
				return;
			}
			
			var param = 'func=noteClassAdd';
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
						name: ''
					};
				}
				
				param = 'func=noteClassJson';
				$http({
					method: 'GET',
					url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
				}).then(function (response){
					$scope.noteClassList = response.data;
				});
				
				waitingDialog.hide();
			});
		}
	}
});