import * as controllerProducts from '../controllers/controllerProducts.js'
import * as middlewareUser from '../middleware/middlewareUser.js'

const routesProducts = (app) => {
    app.get('/productos',middlewareUser.auth, controllerProducts.viewProducts)
    app.get('/editproductos',middlewareUser.auth, controllerProducts.view)
    app.post('/editproductos',middlewareUser.auth, controllerProducts.create)
    app.delete('/editproductos',middlewareUser.auth, controllerProducts.del)
    app.put('/editproductos',middlewareUser.auth, controllerProducts.update)
}
export default routesProducts