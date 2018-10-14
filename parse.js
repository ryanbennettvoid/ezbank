
module.exports = ( text ) => {
  return new Promise( ( resolve, reject ) => {

    const obj = text
      .split( '\n' )
      // clean up gibberish
      .filter( ( row ) => {
        let idx = 0;
        while ( row.charAt( idx++ ) === ' ' )
          ;
        return idx === 6 && !isNaN( row.charAt( idx + 1 ) );
      } )
      .map( ( row ) => {
        const delim = '^^^^^^';
        return row
          .replace( /  +/g, delim ) // replace multiple spaces with delim
          .split( delim )
          .slice( 1, 4 ) // first col is blank, last is end-of-day balance
      } )
      .filter( ( row ) => {
        return row.length === 3;
      } )
      .map( ( row ) => {
        const str = 'Purchase authorized on';
        const str2 = 'Purchase authorized on XX/XX ';
        const [ date, desc, amount ] = row;
        if ( desc.substring( 0, str.length ) == str ) {
          row[ 1 ] = desc.substring( str2.length )
        }
        return row
      } )
      .map( ( row ) => {
        const str = 'Recurring Payment authorized on';
        const str2 = 'Recurring Payment authorized on XX/XX ';
        const [ date, desc, amount ] = row;
        if ( desc.substring( 0, str.length ) == str ) {
          row[ 1 ] = desc.substring( str2.length )
        }
        return row
      } )
      .reduce( ( acc, row ) => {
        const [ date, desc, amount ] = row;
        // const shortDesc = desc.substring( 0, 8 );
        const shortDesc = desc.split( ' ' )[ 0 ] + ( desc.split( ' ' )[ 1 ] || '' )
        acc[ shortDesc ] = acc[ shortDesc ] || []
        acc[ shortDesc ].push( row )
        return acc;
      }, {} )
      ;

      const results = Object.keys( obj ).map( ( k ) => {
        const rows = obj[ k ];
        const total = rows.reduce( ( acc, row ) => {
          return acc + parseFloat( row[ 2 ].split( ',' ).join( '' ) )
        }, 0 );
        return {
          desc: k,
          total: Math.floor( total ),
          count: rows.length,
          // rows
        };
      } )
      .sort( ( a, b ) => {
        return a.total - b.total;
      } )
      ;

      resolve( results );

  } )
  ;
}
;