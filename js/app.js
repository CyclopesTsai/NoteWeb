var app = angular.module('noteApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('noteCtrl',function($scope, $http, $cookies, $window, dialogs) {

	angular.element(document).ready(function () {
		$scope.getItemList();
	});
	
	$scope.getItemList = function(){
		var param = 'func=itemArray';
		
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
		}).then(function (response){
			//debugger;
			$scope.itemList = response.data;
			$("#search").autocomplete({
				source:[$scope.itemList]
			});
			
			waitingDialog.hide();
		});
	}
	
	$scope.qryDataList = function(){
		if(commitCheck()){
			return;
		}
		
		var param = 'func=auctionJson';
			param+= '&itemName='+$scope.itemName;
		
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbzUuJYOIQ9lwyhbTRtLky_rl0tg-AS0oJtz2YWSSbhwZGROXodQ/exec?'+param
		}).then(function (response){
			//debugger;
			$scope.auctionList = response.data;
			
			waitingDialog.hide();
		});
	}
	
	function commitCheck(){
		var errMsg='';
		
		if(!$scope.itemName){
			errMsg += '請輸入物品名稱';
		}
		
		if(errMsg){
			//dialogs.notify(errMsg);
			return true;
		}
	}
});