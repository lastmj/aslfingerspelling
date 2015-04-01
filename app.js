var app = angular.module('aslFingerSpelling', []);

app.controller('MainController', ['$scope', 
	function($scope) {
		
		$scope.letters = '';
		
		$scope.$watch('letters', function() {
			
			if($scope.letters === '') {
				$scope.imgSrc = 'images/transparent.png';
				return;
			}
			
			var lowercase = $scope.letters.toLowerCase();
			$scope.imgSrc = 'images/' + lowercase[lowercase.length - 1] + '.png';
		});
	}
]);