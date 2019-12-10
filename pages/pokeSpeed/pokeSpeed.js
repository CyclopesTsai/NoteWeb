var app = angular.module('pokeSpeedApp', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.bootstrap', 'dialogs.main']);                                                                                                                                                                                                                        
app.controller('pokeSpeedCtrl',function($scope, $http, $cookies, $window, dialogs) {

	$scope.tmpData = {
		pokemon:null,
		H:'',
		A:'',
		D:'',
		SA:'',
		SD:'',
		S:'',
		nature:'',
		baseStats:0,
		iv:0,
		lv50Speed:0,
		lv100Speed:0
	};

	angular.element(document).ready(function () {
		$scope.getPokemonList();
	});
	
	$scope.getPokemonList = function() {
		var param = 'func=pokemonList';
		
		waitingDialog.show();
		$http({
			method: 'GET',
			url: 'https://script.google.com/macros/s/AKfycbxfRyruEEtLDd-oLNDxQeeUvJSJO9cG7jrzxY5UjVE2PkmP6mIi/exec?'+param
		}).then(function (response){
			$scope.pokemonList = response.data;
			if($scope.pokemonList){
				$scope.tmpData.pokemon = $scope.pokemonList[0];
				$scope.changePoke();
				$scope.textChange();
			}
			
			//debugger;
			waitingDialog.hide();
		});
	}
	
	$scope.changePoke = function() {
		if($scope.tmpData.pokemon) {
			$scope.tmpData.H = $scope.tmpData.pokemon.H;
			$scope.tmpData.A = $scope.tmpData.pokemon.A;
			$scope.tmpData.D = $scope.tmpData.pokemon.D;
			$scope.tmpData.SA = $scope.tmpData.pokemon.SA;
			$scope.tmpData.SD = $scope.tmpData.pokemon.SD;
			$scope.tmpData.S = $scope.tmpData.pokemon.S;
		}
	}
	
	$scope.textChange = function() {
		$scope.tmpData.H = getIntegerText($scope.tmpData.H);
		$scope.tmpData.A = getIntegerText($scope.tmpData.A);
		$scope.tmpData.D = getIntegerText($scope.tmpData.D);
		$scope.tmpData.SA = getIntegerText($scope.tmpData.SA);
		$scope.tmpData.SD = getIntegerText($scope.tmpData.SD);
		$scope.tmpData.S = getIntegerText($scope.tmpData.S);
		$scope.tmpData.baseStats = getIntegerText($scope.tmpData.baseStats);
		if($scope.tmpData.baseStats > 252) {
			$scope.tmpData.baseStats = 252;
		}
		$scope.tmpData.iv = getIntegerText($scope.tmpData.iv);
		if($scope.tmpData.iv > 31) {
			$scope.tmpData.iv = 31;
		}
		
		if(!$scope.tmpData.nature) {
			$scope.tmpData.natureVal = 1;
		} else if($scope.tmpData.nature=='Y') {
			$scope.tmpData.natureVal = 1.1;
		} else if($scope.tmpData.nature=='N') {
			$scope.tmpData.natureVal = 0.9;
		}
		
		$scope.tmpData.lv50Speed = Math.floor((((($scope.tmpData.S*2) + ($scope.tmpData.iv*1) + ($scope.tmpData.baseStats/4)) * 50/100) + 5) * $scope.tmpData.natureVal);
		$scope.tmpData.lv100Speed = Math.floor((((($scope.tmpData.S*2) + ($scope.tmpData.iv*1) + ($scope.tmpData.baseStats/4)) * 100/100) + 5) * $scope.tmpData.natureVal);
	}
	
	$scope.add = function() {
		if($scope.tmpData) {
			var param = 'func=pokeSpeedAdd';
			debugger;
			param += ('&data=' + encodeURIComponent(angular.toJson($scope.tmpData)));
			/*
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
			*/
		}
	}
});