const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{
   
    try{
        const token = req.headers.authorization;
        console.log(token);
        const verify = jwt.verify(token,'secretkey-jsonwebtoken');
        console.log(verify)
        next()
        /*
        //check if user admin ornot
        if(verify.userType == 'admin){
            next()
        }else{
            return res.status(401).json({
                msg:'not admin'
            })
        }
        */
    }catch(err)
    {
        return res.status(401).json({
            msg: "invalid token"
        })
    }
}