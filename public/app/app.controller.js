/*
	Angular Url Shortener Controller
*/

'use strict';

angular.module( 'smpUrlShortener' ).controller( 'UrlMainController', [ '$scope', 'Shortener', 
	function( $scope, Shortener ){

		//init default data
		$scope.initData = function(){
			$scope.long_url = '';
			$scope.short_url = '';
		};


		//send url to make short
		$scope.makeShort = function( isValid ){
			if( isValid ){
				Shortener.set( $scope.long_url, function( err, data ){
					$scope.short_url = data.short_url;
				} );
			}else{
				$scope.submitted = true;
			}
		};
	}
] );