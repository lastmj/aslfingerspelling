var app = angular.module('aslFingerSpelling', []);

//Taken from here: not sure about the license, I think it might be small enough to not matter: http://stackoverflow.com/questions/22754393/in-a-chrome-app-using-angularjs-can-i-use-the-ngsrc-directive-directly-for-inte
app.config([
  '$compileProvider',
  function ($compileProvider) {
      //  Default imgSrcSanitizationWhitelist: /^\s*(https?|ftp|file):|data:image\//
      //  chrome-extension: will be added to the end of the expression
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):|data:image\//);
  }
]);

app.controller('MainController', ['$scope', '$timeout',
	function($scope, $timeout) {
		
		$scope.letters = '';
		$scope.showPlayButton = false;
        $scope.showSpeedMenu = false;
		
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
			}, $scope.medium);
			
			$scope.imgSrc = 'images/' + lowercase[lowercase.length - 1] + '.png';
		});
        
        $scope.fast = 500;
        $scope.medium = 1000;
        $scope.slow = 1500;
        $scope.speed = $scope.fast;
        $scope.speedText = 'fast';
		
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
					}, $scope.medium);
				}
			}, $scope.speed);
		}
        
        $scope.speedMenuItemClick = function(speedText) {
            
            $scope.showSpeedMenu = !$scope.showSpeedMenu;
            
            if (speedText === 'fast') {
                $scope.speed = $scope.fast;
                $scope.speedText = speedText;
                return;
            }
            
            if (speedText === 'medium') {
                $scope.speed = $scope.medium;
                $scope.speedText = speedText;
                return;
            }
            
            if (speedText === 'slow') {
                $scope.speed = $scope.slow;
                $scope.speedText = speedText;
                return;
            }
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