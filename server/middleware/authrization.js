const jwt = require('jsonwebtoken');

function authorization(req, res, next) {

    const token = req.cookies.token;

    if(req.cookies.token === undefined){
      res.status(401);
      return;
    }
   
    const secretKey = 'qqwewdxc';
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401);
        } else {
          req.userId = decoded;
          next(); // Continue processing the request
        }
      });

  }

module.exports = {authorization}