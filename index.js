
const Promise = require( 'bluebird' );
const fs = require( 'fs' );
const path = require( 'path' );
const extract = require( './extract.js' );
const parse = require( './parse.js' );

const dir = process.argv[ 2 ];
const files = fs.readdirSync( dir )
  .map( ( file ) => {
    return path.join( dir, file );
  } )
  ;

Promise
.reduce( files, ( acc, file ) => {
  return extract( file )
  .then( ( text ) => {
    return acc + '\n' + text;
  } )
  ;
}, '' )
.then( ( text ) => {
  return parse( text );
} )
.then( ( results ) => {
  console.log( JSON.stringify( results, null, 4 ) );
} )
.catch( ( err ) => {
  console.error( err );
  process.exit( 1 );
} )
;