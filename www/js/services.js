angular.module('starter.services', [])

.factory('Chats', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var chats = [{
		id: 0,
		name: 'Ben Sparrow',
		lastText: 'You on your way?',
		face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
	}, {
		id: 1,
		name: 'Max Lynx',
		lastText: 'Hey, it\'s me',
		face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
	},{
		id: 2,
		name: 'Adam Bradleyson',
		lastText: 'I should buy a boat',
		face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
	}, {
		id: 3,
		name: 'Perry Governor',
		lastText: 'Look at my mukluks!',
		face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
	}, {
		id: 4,
		name: 'Mike Harrington',
		lastText: 'This is wicked good ice cream.',
		face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
	}];

	return {
		all: function() {
			return chats;
		},
		remove: function(chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		get: function(chatId) {
			for (var i = 0; i < chats.length; i++) {
				if (chats[i].id === parseInt(chatId)) {
					return chats[i];
				}
			}
			return null;
		}
	};
})

.factory('KalaamService', function(
	$rootScope,
	$ionicLoading,
	$http,
	lodash,
	$q
	) {

	return {
		load: function() {

			var dfd = $q.defer();

			// if Kalaams already exists in the rootScope
			if($rootScope.kalaams) {
				dfd.resolve($rootScope.kalaams);
				return dfd.promise();
			}

			// fetch the results
			$http.get('data/kalaam.json').
				success(function(data) {
					$rootScope.kalaams = data;
					dfd.resolve(data);
				}).
				error(function() {
					// report an error
				});

				return dfd.promise;
		},

		categories: function() {

			var dfd = $q.defer(),
				categories = [];

			this.load().then(function(kalaams) {
				categories = lodash.uniq(kalaams, 'category');
				dfd.resolve(lodash.pluck(categories, 'category'));
			});

			return dfd.promise;
		},

		lyricists: function() {

			var dfd = $q.defer(),
				lyricists = [];

			this.load().then(function(kalaams) {
				lyricists = lodash.uniq(kalaams, 'lyricist');
				dfd.resolve(lodash.pluck(lyricists, 'lyricist'));
			});

			return dfd.promise;
		}

	}

});
