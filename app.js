var app = angular.module('aslFingerSpelling', []);

app.controller('MainController', ['$scope', 
	function($scope) {
		
		$scope.letters = '';
		
		$scope.$watch('letters', function() {
			
			if($scope.letters === '') {
				$scope.imgSrc = 'images/transparent.png';
				return;
			}
			
			$scope.imgSrc = 'images/' + $scope.letters[$scope.letters.length - 1] + '.png';
		});
	}
]);