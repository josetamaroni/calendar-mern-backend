//* Para validar fecha se usó moment
const moment = require('moment');

const isDate = ( value, rest ) => {
    // console.log(value)
    // console.log(rest)
    if( !value ) return false;

    if ( moment(value).isValid() ) {
        return true;
    }else{
        return false;
    }
}

module.exports = { isDate };