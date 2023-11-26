const json = require("jsonwebtoken");

function tokenToUserData (token) {
    try {

        // json.verify(token, process.env.SECRET_KEY);
        // let data = json.decode(token)
        return true
    } catch(error) {
        // console.error("failed to verify JWT token")
        return false
    }
}

module.exports = tokenToUserData