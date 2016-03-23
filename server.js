/*
	main module
*/

var express = require( 'express' );
var app = express();
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var config = require( __dirname + '/config/config.js' );
var consolidate = require( 'consolidate' );
var ShortController = require( __dirname + '/server/controllers/urlshort.js' );

	//connect to DB
	mongoose.connect( config.db );

	//Set up App
	app.use( express.static( __dirname + '/public' ) );
	app.use( bodyParser.urlencoded( { extended: true } ) );
	app.use( bodyParser.json( { limit: '100kb' } ) );

	//app.engine( 'html', consolidate[config.templateEngine] );
	//app.set( 'view engine', 'html' );

	//simple routes
	app.get( '/', function( req, res ){
		res.redirect( '/index.html' );
	} );

	//create short link
	app.post( '/api/shorty', ShortController.make_short );

	//-----------------
	app.listen( config.port );
	console.log( 'app startted on port ' + config.port );