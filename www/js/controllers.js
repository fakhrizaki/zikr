angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SearchCtrl', function(
	$scope,
	$rootScope,
	$location,
	$ionicScrollDelegate,
	$ionicLoading,
	$http,
	$stateParams,
	KalaamService
	) {

	// load the categories
	KalaamService.categories().then(function(items) {
		$scope.categories = items;
	});

	// load the lyricists
	KalaamService.lyricists().then(function(items) {
		$scope.lyricists = items;
	});

	$scope.search = function(criteria) {
		$scope.searchResults = $rootScope.kalaams;
	};
})

.controller('KalaamCtrl', function($scope, $stateParams, $http, $ionicPopup, $state, Kalaams) {

	if($stateParams.kalaamId) {
		$scope.kalaam = Kalaams.single($stateParams.kalaamId);
	}

})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
