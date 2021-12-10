import * as middlewareUser from '../middleware/middlewareUser.js'
import * as controllerUsers from '../controllers/controllerUsers.js'

 const routesUsers = app => {

    app.get('/ingresar',controllerUsers.viewlogin)
    app.get('/fallaingreso',controllerUsers.failureLogin)
    app.post('/login',middlewareUser.auth,controllerUsers.login)
    app.get('/registro',controllerUsers.viewRegister)
    app.post('/register',controllerUsers.register)
}

export default routesUsers