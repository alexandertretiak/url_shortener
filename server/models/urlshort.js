/*
	Model for urls storage
*/

'use strict';

var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var auto_increment = require( 'mongoose-auto-increment' );
var config = require( '../../config/config.js' );
var connection = mongoose.createConnection( config.db );


//initialize auto_increment
auto_increment.initialize( connection );


/*
Schema for generated
urls
*/
var ShortUrlsShcema = new Schema( {
	longUrl: String
	,created: {
		type: Date
		,default: Date.now
	}
} );

ShortUrlsShcema.plugin( auto_increment.plugin, {
	model: 'ShortUrl'
	,field: '_id'
	,startAt: 1000
} );

connection.model( 'ShortUrl', ShortUrlsShcema );