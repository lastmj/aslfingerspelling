var app = angular.module('aslFingerSpelling', []);

app.controller('MainController', ['$scope', '$timeout',
	function($scope, $timeout) {
		
		$scope.letters = '';
		$scope.showPlayButton = false;
		
		var currentTimeout;
		$scope.$watch('letters', function() {
			$timeout.cancel(currentTimeout);
			$scope.showPlayButton = false;
			var lowercase = $scope.letters.toLowerCase();
			
			if(!isValidASLCharacter(lowercase[lowercase.length - 1])) {
				$scope.imgSrc = 'images/transparent.png';
				return;
			}
			
			currentTimeout = $timeout(function() {
				if ($scope.letters !== '') {
					$scope.showPlayButton = true;
				}
			}, 1500);
			
			$scope.imgSrc = 'images/' + lowercase[lowercase.length - 1] + '.png';
		});
		
		$scope.play = function() {
			
			$scope.showPlayButton = false;
			
			var newLetters = $scope.letters;
			newLetters = newLetters.toLowerCase();
			
			if(isValidASLCharacter(newLetters[0])) {
				$scope.imgSrc = 'images/' + newLetters[0] + '.png';
				var wordInput = document.getElementById('wordInput');
				wordInput.setSelectionRange(0, 1);
			}
			
			if (newLetters[1]) {
				showDelayed(newLetters, 1);
			}
		};
		
		var returnCount = 0;
		function showDelayed(newLetters, index) {
			currentTimeout = $timeout(function() {
				
				if (!isValidASLCharacter(newLetters[index])) {
					showDelayed(newLetters, index + 1);
					return;
				}
				
				$scope.imgSrc = 'images/' + newLetters[index] + '.png';
				
				var wordInput = document.getElementById('wordInput');
				wordInput.setSelectionRange(index, index + 1);
				
				index = index + 1;
				if (newLetters[index]) {				
					showDelayed(newLetters, index);
				}
				else {
					currentTimeout = $timeout(function() {
						$scope.showPlayButton = true;
						wordInput.setSelectionRange(0);
					}, 1500);
				}
			}, 1500);
		}
		
		function isValidASLCharacter(c) {
			var validASLCharacters = [
				'0',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z'
			];
			
			if (validASLCharacters.indexOf(c) === -1) {
				return false;
			}
			
			return true;
		}
	}
]);