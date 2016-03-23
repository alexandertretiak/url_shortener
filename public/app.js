/*
	Register and Configure Angular application
*/

'use strict';

angular.module( 'smpUrlShortener', ['ui.router'] )
.config( function( $stateProvider, $urlRouterProvider ){
	$urlRouterProvider.otherwise( '/' );

	//root route
	$stateProvider.state( 'app', {
		url: '/'
		,templateUrl: 'app/main.html'
		//,controller: 'UrlMainController'
	} );
} )
.run( function(){

} );