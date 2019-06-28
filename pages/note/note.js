var app = angular.module('noteApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('noteCtrl',function($scope, $http, $cookies, $window, dialogs) {

	$scope.tmpData = {
		subject: '',
		class: '',
		content: ''
	};

	$scope.onUpd = false;

	angular.element(document).ready(function () {
		$scope.getNoteList();
	});
	
	$scope.getNoteList = function() {
		var param = 'func=noteWithClassJson';
		
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
		}).then(function (response){
			//debugger;
			$scope.noteList = response.data.noteList;
			$scope.classList = response.data.classList;
			
			waitingDialog.hide();
		});
	}
	
	$scope.add = function() {
		if($scope.tmpData) {
			if(!$scope.tmpData.subject || !$scope.tmpData.class || !$scope.tmpData.content){
				return;
			}
			
			var param = 'func=noteAdd';
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
						class: '',
						content: ''
					};
				}
				
				param = 'func=noteJson';
				$http({
					method: 'GET',
					url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
				}).then(function (response){
					$scope.noteList = response.data
					
					waitingDialog.hide();
				});
			});
		}
	}
	
	$scope.upd = function(note) {
		if(note) {
			var param = 'func=noteUpd';
			param += ('&data=' + encodeURIComponent(angular.toJson(note)));
			
			waitingDialog.show();
			$http({
				method: 'POST',
				url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec',
				data : param,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response){
				
				param = 'func=noteJson';
				$http({
					method: 'GET',
					url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
				}).then(function (response){
					$scope.noteList = response.data;
					
					$scope.onUpd = false;
					waitingDialog.hide();
				});
			});
		}
	}
	
	$scope.del = function(note) {
		if(note) {
			var dlg = dialogs.confirm();
			dlg.result.then(function(btn) {
				var param = 'func=noteDel';
				param += ('&data=' + encodeURIComponent(angular.toJson(note)));
				
				waitingDialog.show();
				$http({
					method: 'POST',
					url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec',
					data : param,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function (response){
					
					param = 'func=noteJson';
					$http({
						method: 'GET',
						url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
					}).then(function (response){
						$scope.noteList = response.data;
						
						waitingDialog.hide();
					});
				});
			});
		}
	}
	
	$scope.doUpd = function(note) {
		$scope.tmpData = angular.copy(note);
		
		note.onUpd = true;
		$scope.onUpd = true;
	}
	
	$scope.doCancel = function(note) {
		note.onUpd = false;
		
		$scope.tmpData = {
			subject: '',
			class: '',
			content: ''
		};
		
		$scope.onUpd = false;
	}
});