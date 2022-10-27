const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    console.log(req.headers.authorization);
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token,'this is also password');
        console.log(verify);

        if(verify.userType == 'admin')
        {
            next();
        }
        else
        {
            return res.status(401).json({
                message:'user type is not valid'
            })
        }
    }
    catch(error)
    {
        return res.status(401).json({
            message:'unvalid token'
        })
    }
}