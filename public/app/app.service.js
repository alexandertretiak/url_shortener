/*
	Some services
*/

'use strict';

angular.module( 'smpUrlShortener' ).factory( 'Shortener', ['$http'
	,function( $http ){
		return {
			set: function( url, cbf ){
				$http.post( '/api/shorty', { url: url } )
				.success( function( data ){
					cbf( null, data );
				} )
				.error( function( err ){
					cbf( err, null );
				} );
			}
		};
	}
] );