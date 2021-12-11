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

export const failureRegister = (req,res) => {
    res.status(200).render('failureRegister')
}

export const login = (req,res) =>{
    res.status(200).redirect('/productos')
}

export const register = async (req,res) =>{

    res.status(200).redirect('/productos')

}
export const logout = async (req, res) => {
    try {
      const user = await User.find({ username: req.user.username }).lean()
      await req.session.destroy(err => {
        if (err) return err
        res.status(200).redirect('/ingresar')
      })
    } catch (e) { console.log(e) }
  }