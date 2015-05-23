angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SearchCtrl', function(
	$scope, $location, $ionicScrollDelegate, $ionicLoading, $timeout, $ionicModal, $ionicPopover) {

	$scope.search = function() {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-stable" icon="dots"></ion-spinner>'
		});
		$timeout(function(){
			$ionicLoading.hide();
			$location.hash('search-results');
			$ionicScrollDelegate.anchorScroll(true);
		}, 3000);
	};

	$ionicModal.fromTemplateUrl('templates/kalaam-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Kalaam Popover
	$ionicPopover.fromTemplateUrl('templates/kalaam-popover.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});

	// open kalaam
	$scope.openKalaam = function() {
		$scope.modal.show();
	}

	$scope.closeKalaam = function() {
		$scope.modal.hide();
	}

	// open popover
	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	}
})

.controller('KalaamCtrl', function($scope, $stateParams) {

})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
