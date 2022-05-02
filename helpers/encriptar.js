const bcryptjs = require("bcryptjs");

const encriptarHash = ( password ) => {
    const salt = bcryptjs.genSaltSync();
    
    password = bcryptjs.hashSync(password, salt);

    return password;
}

module.exports = {
    encriptarHash
}