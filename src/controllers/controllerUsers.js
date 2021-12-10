import User from '../models/users.js'
export const viewlogin = (req, res) => {
  res.status(200).render('login')
}
export const viewRegister = (req, res) => {
    res.status(200).render('register')
  }

export const failureLogin = (req,res) =>{
    res.status(200).render('failureLogin')
}

export const login = (req,res) =>{
    res.status(200).redirect('/productos')
}

export const register = async (req,res) =>{
    try{
         const user = await new User(req.body)
         await user.save()
         res.status(200).redirect('/productos')
    }catch(e){
         console.log(e)
    }
}
