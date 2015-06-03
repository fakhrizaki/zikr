angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SearchCtrl', function(
	$scope,
	$location,
	$ionicScrollDelegate,
	$ionicLoading,
	$timeout,
	$ionicModal,
	$http,
	$ionicPopover,
	$ionicPopup,
	$stateParams
	) {

	$scope.lyricists = ['Syedna Mufaddal Saifuddin (TUS)', 'Jamali', 'Abid', 'Husami'];
	$scope.categories = ['Naat', 'Manqebat', 'Matemi', 'Salaam', 'Ilteja', 'Nasihat', 'Rasa', 'Madeh'];
	$scope.subjects = ['Rasulullah', 'Maulana Ali', 'Imam Hussain', 'Syedna Mohammad Burhanuddin'];


	$scope.search = function(criteria) {

		$ionicLoading.show({
			template: '<ion-spinner class="spinner-stable" icon="dots"></ion-spinner>'
		});

		// fetch the results
		$http.get('data/index.json').
			success(function(data) {
				$scope.kalaams = data.kalaams;

				console.info({
					'Kalaams Found': $scope.kalaams.length,
					'Criteria': criteria
				});

				$ionicLoading.hide();
				$location.hash('search-results');
				$ionicScrollDelegate.anchorScroll(true);
			}).
			error(function() {
				$ionicLoading.hide();

				$ionicPopup.alert({
					title: 'Search Failed',
					template: 'Sorry! We couldn\'t find the kalaams you\'re looking for. Please broaden your search criteria'
				 }).
				then(function() {
					$state.go('tab.search');
				});
			});
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

.controller('KalaamCtrl', function($scope, $stateParams, $http, $ionicPopup, $state) {
	$http.get('data/' + $stateParams.kalaamId + '.json').
		success(function(data) {
			$scope.kalaam = data;
		}).
		error(function() {
			$ionicPopup.alert({
				title: 'Kalaam not Found',
				template: 'Sorry! We couldn\'t find the kalaam you\'re looking for'
			 }).
			then(function() {
				$state.go('tab.search');
			});
		});
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
