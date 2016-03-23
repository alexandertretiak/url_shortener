/*
	Server-Side controller
*/

var mongoose = require( 'mongoose' );
var ShortUrlSchema = require( '../models/urlshort.js' );
var ShortUrl = mongoose.model( 'ShortUrl' );
var config = require( '../../config/config.js' );

//for code and decode base58 string
var abt = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var base = abt.length;

//make short url
exports.make_short = function( req, res ){
	var long_url = req.body.url;
	var sh = null;

	if( !long_url ){
		return res.status( 500 ).json( { error: "No long url sended!" } );
	}

	ShortUrl.findOne( { longUrl: long_url } ).exec( function( err, data ){

		if( err ){
			console.log( err );
			return res.status( 500 ).json( { error: 'Cannot create short url!' } );
		}
		
		if( data ){
			//encode founded url
			short_url = config.hostname + '/' + encodeBase58( data._id );
			return res.send( { short_url: short_url } );
		}else{	
			sh = new ShortUrl( { longUrl: long_url } );
			sh.save( function( error, short_data ){
				var short_url = '';
				if( error ){
					console.log( error );
					return res.status( 500 ).json( { error: 'Cannot create short url!' } );
				}
				//encode new url
				short_url = config.hostname + '/' + encodeBase58( sh._id );

				res.send( { short_url: short_url } );
			} );
		}
	} );

};


/*
Convert base 10 integer to base58 string
*/
function encodeBase58( num )
{
	var ret = '';
	var rem = null;
	while( num ){
		rem = num % base;
		num = Math.floor( num / base );
		ret = abt[rem].toString() + ret;
	}
	return ret;
}


/*
Decode base58 string to base 10 integer
*/
function decodeBase58( str )
{
	var ret = 0;
	var index = -1;
	var power = 0;
	while( str ){
		index = abt.indexOf( str[0] );
		power = str.length - 1;
		ret += index * Math.pow( base, power );
		str = str.substring( 1 );
	}
	return ret;
}