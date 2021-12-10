import User from '../models/users.js'

export const auth = async (req,res,next)=>{
    try{ 
        const user = await User.find({email:req.body.email}).lean()
    
        if ((Object.entries(user).length === 0)) {
             return res.status(200).redirect("/fallaingreso")
        }

        if(req.body.email == user[0].email && req.body.password == user[0].password) {
             next()  
        } else {
            res.status(200).redirect('/fallaingreso')
        } 

    }catch(e){
        console.log(e)
    }
}