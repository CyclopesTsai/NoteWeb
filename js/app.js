var app = angular.module('noteApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('noteCtrl',function($scope, $http, $cookies, $window, dialogs) {

	$scope.itemName = '';

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
			$("#itemName").autocomplete({
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
			for(var i in $scope.auctionList){
				$scope.auctionList[i].buyOne = Math.floor( $scope.auctionList[i].buyout / $scope.auctionList[i].quantity );
				$scope.auctionList[i] = transBid($scope.auctionList[i]);
			}
			
			waitingDialog.hide();
		});
	}
	
	function commitCheck(){
		var errMsg='';
		
		//TODO 問題待查
		$scope.itemName = $('#itemName').val();
		
		if(!$scope.itemName){
			errMsg += '請輸入物品名稱';
		}
		
		if(errMsg){
			//dialogs.notify(errMsg);
			return true;
		}
	}
	
	function transBid(auctionData){
		if(auctionData){
			if(auctionData.bid){
				auctionData.bid = auctionData.bid*1;
				auctionData.bidG = Math.floor(auctionData.bid/10000);
				auctionData.bidS =  Math.floor( (auctionData.bid - (auctionData.bidG*10000))/100 );
				auctionData.bidC = auctionData.bid - (auctionData.bidG*10000) - (auctionData.bidS*100);
			}
			if(auctionData.buyout){
				auctionData.buyout = auctionData.buyout*1;
				auctionData.buyoutG = Math.floor(auctionData.buyout/10000);
				auctionData.buyoutS =  Math.floor( (auctionData.buyout - (auctionData.buyoutG*10000))/100 );
				auctionData.buyoutC = auctionData.buyout - (auctionData.buyoutG*10000) - (auctionData.buyoutS*100);
			}
			if(auctionData.buyOne){
				auctionData.buyOne = auctionData.buyOne*1;
				auctionData.buyOneG = Math.floor(auctionData.buyOne/10000);
				auctionData.buyOneS =  Math.floor( (auctionData.buyOne - (auctionData.buyOneG*10000))/100 );
				auctionData.buyOneC = auctionData.buyOne - (auctionData.buyOneG*10000) - (auctionData.buyOneS*100);
			}
		}
		return auctionData;
	}
});