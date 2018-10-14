
const extract = require( 'pdf-text-extract' );

const opts = {
  splitPages: false
};

module.exports = ( filepath ) => {
  return new Promise( ( resolve, reject ) => {
    extract( filepath, opts, ( err, text ) => {
      if ( err ) {
        return reject( err );
      }
      resolve( text.join() );
    } )
    ;
  } )
}
;