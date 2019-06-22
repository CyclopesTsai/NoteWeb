var app = angular.module('noteClassApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('noteClassCtrl',function($scope, $http, $cookies, $window, dialogs) {

	$scope.tmpData = {
		name: ''
	};

	$scope.onUpd = false;

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
	
	$scope.add = function() {
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
	
	$scope.upd = function(noteClass) {
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
					
					$scope.onUpd = false;
					waitingDialog.hide();
				});
			});
		}
	}
	
	$scope.del = function(noteClass) {
		if(noteClass) {
			var dlg = dialogs.confirm();
			dlg.result.then(function(btn) {
				var param = 'func=noteClassDel';
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
			});
		}
	}
	
	$scope.doUpd = function(noteClass) {
		noteClass.onUpd = true;
		$scope.onUpd = true;
	}
	
	$scope.doCancel = function(noteClass) {
		noteClass.onUpd = false;
		$scope.onUpd = false;
	}
});