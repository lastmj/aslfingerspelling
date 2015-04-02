var app = angular.module('aslFingerSpelling', []);

app.controller('MainController', ['$scope', '$timeout',
	function($scope, $timeout) {
		
		$scope.letters = '';
		$scope.showPlayButton = false;
		
		var currentTimeout;
		$scope.$watch('letters', function() {
			$timeout.cancel(currentTimeout);
			$scope.showPlayButton = false;
			
			if($scope.letters.trim() === '') {
				$scope.imgSrc = 'images/transparent.png';
				return;
			}
			
			currentTimeout = $timeout(function() {
				if ($scope.letters !== '') {
					$scope.showPlayButton = true;
				}
			}, 1500);
			
			var lowercase = $scope.letters.toLowerCase();
			$scope.imgSrc = 'images/' + lowercase[lowercase.length - 1] + '.png';
		});
		
		$scope.play = function() {
			
			$scope.showPlayButton = false;
			
			var newLetters = $scope.letters;
			newLetters = newLetters.toLowerCase();
			newLetters = newLetters.split(' ').join('');
			$scope.imgSrc = 'images/' + newLetters[0] + '.png';
			
			if (newLetters[1]) {
				showDelayed(newLetters, 1);
			}
		};
		
		var returnCount = 0;
		function showDelayed(newLetters, index) {
			currentTimeout = $timeout(function() {
				$scope.imgSrc = 'images/' + newLetters[index++] + '.png';
				
				if (newLetters[index]) {
					showDelayed(newLetters, index);
				}
				else {
					currentTimeout = $timeout(function() {
						$scope.showPlayButton = true;
					}, 1500);
				}
			}, 1500);
		}
	}
]);