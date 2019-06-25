const jwt = require("jsonwebtoken");
const config = require("config");
const jwtdecode = require("jwt-decode");

/**
 * Middleware function to authorize users based on JSON Web tokens.
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {callback} next Callback to call next middleware, if any
 *
 */
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token) {
    res.status(401).json({ msg: "No Token. Authorization denied!" });
  }
  try {
    //Verify token

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: `Token is not valid.${e}` });
  }
}

module.exports = auth;
