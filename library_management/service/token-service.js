const jwt = require('jsonwebtoken');
const Constant = require('../utils/constant');
const UserService = require('../service/user-service');
const TokenService= {
    isAuthenticate:async (req,res,next)=>{
        try{
            console.log('headers', req.headers);
            if(req.headers && req.headers.authorization){
                let token = req.headers.authorization;
            let payload = jwt.verify(token,Constant.SECRET_KEY);
            console.log('payload inside token--',typeof payload);
            let userDetail = await UserService.getUserDetail(payload.email);
            console.log('userDetail--', userDetail);
            if(userDetail){
                req['user']= payload;
            next();

            }else{
                res.status(500).send({response:'Unauthorized User'});
            }
            }else{
                res.status(500).send({response:'Token Required'});
            }
            
        }catch(error){
            res.status(500).send(error);
        }
       
    }
}
module.exports = TokenService;