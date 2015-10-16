var App = angular.module("App", ["ionic"]);

App.service('FreshlyPressed', ['$http', "$log", FreshlyPressed]);

App.controller('AppCtrl', ['$scope', "$log",  "FreshlyPressed", AppCtrl]);

function AppCtrl ($scope, $log, FreshlyPressed) {
	//all your var function
	$scope.posts = [];
	$scope.refresh = function () {
		// alert("button pressed");
		FreshlyPressed.getBlogs($scope);
	}
}

function FreshlyPressed($http, $log) {
	this.getBlogs = function($scope) {
		$http.jsonp("https://public-api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK")
			.success(function(result) {
				$scope.posts = result.posts;
				$scope.$broadcast("scroll.refreshComplete");
				// $log.info(JSON.stringify(result.posts));
			});
	};
}