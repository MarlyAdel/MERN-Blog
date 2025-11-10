
const jwt = require("jsonwebtoken");


//^ Verify Token
function verifyToken(req,res,next){
  const authToken = req.headers.authorization;

  if(authToken){
    const token = authToken.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } 
    catch (error) {
       res.status(401).json({message: "Invalid Token, access denied"}) 
    }
  }
  else{
     res.status(401).json({message: "No Token Provided, access denied"});
  }
}

//^ Verify Token & Admin
function verifyTokenAndAdmin(req,res,next){
  verifyToken(req,res, () => {
    if(req.user.isAdmin){
        next();
    }
    else{
        return res.status(403).json({message: "Not allowed, Only Admin"})
    }
  })
}

//^ Verify Token And only User himself
function verifyTokenAndOnlyUser(req,res,next){
  verifyToken(req,res, () => {
    if(req.user.id === req.params.id){
        next();
    }
    else{
        return res.status(403).json({message: "Not allowed, Only User himself"})
    }
  })
}

//^ Verify Token And Authorization
function verifyTokenAndAuthorization(req,res,next){
  verifyToken(req,res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        next();
    }
    else{
        return res.status(403).json({message: "Not allowed, Only User himself or Admin"})
    }
  })
}


module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}