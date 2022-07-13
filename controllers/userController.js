const poolPromise = require('../config/pool');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userControllers ={
    Register:async(req, res, next)=>{
        const {userName, email, password} = req.body;
        try {
            let pool = await poolPromise();
            const hashedPwd = await bcrypt.hash(password, 1);
            console.log(hashedPwd)
         let insertQry= pool.query(`INSERT INTO users(userName, email, userPassword) values ('${userName}','${email}', '${hashedPwd}')`)
             if(insertQry){
                const token = jwt.sign({email:email}, process.env.TOKEN,{
                    expiresIn:'20m'
                } )
                    res.status(201).json({
                        success:true,
                        user: {userName, email},
                        message:'user added',
                        token
                    }); return;
                }   

    
        } catch (error) {
           console.log(error)
           res.status(500).json({
                status:500,
                message: error.message
           })
        }
    },

    // login:async()=>{

    // },
}

module.exports = {...userControllers}