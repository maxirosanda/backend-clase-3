import * as controllerUsers from '../controllers/controllerUsers.js'
import passport from 'passport'
 const routesUsers = app => {

    app.get('/ingresar', controllerUsers.viewlogin)
    app.get('/fallaingreso', controllerUsers.failureLogin)
    app.post('/login',passport.authenticate('login', { failureRedirect: 'fallaingreso' }),controllerUsers.login)
    app.get('/registro',controllerUsers.viewRegister)
    app.get('fallaRegistro', controllerUsers.failureRegister)
    app.post('/register',passport.authenticate('register', { failureRedirect: 'failureRegister' }),controllerUsers.register)
    app.get('/logout',controllerUsers.logout)
}

export default routesUsers