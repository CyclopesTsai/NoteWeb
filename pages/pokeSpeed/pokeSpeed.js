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
		nature:''
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
			}
			
			debugger;
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