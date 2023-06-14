const json = require("jsonwebtoken");

const tokenToUserData = (token) => {
    try {

        json.verify(token, process.env.SECRET_KEY);
        
    } catch(error) {

    }
}