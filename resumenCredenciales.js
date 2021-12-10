
//1 armar las vistas con hbs para login y fallaLogin. (si quieren pueden usar bootstrap)
//las vistas login y deben tener formularios post para mandar los datos al controlador

//2 crear un archivo routesUsers.js dentro de la carpeta routes
//armar las rutas para el logeo y falla del login
/*
 const routesUsers = app => {
    app.get('/login',controlleUsers.viewlogin)
    app.get('/failure',controlleUsers.failure)
}

export default routesUsers
*/


//3 crear un archivo controllerUsers.js dentro de la carpeta controller
// armar el controlador para la vistas del logeo y la falla en el login ej:
/*
export const viewlogin = (req, res) => {
  res.status(200).render('login')
}

export const failure = (req,res) =>{
    res.status(200).render('failure')
}
*/

//3 importar el controllerUser dentro de routessUser
// importar el routesUser dentro de el archivo de inicio del servidor (server.js o index.js)
// los controller deben direccionar a la vista de la pagina principal (o la que necesites)



//4 Crear la carpeta middleware dentro de la carpeta src 
//dentro de esta carpeta crea un archivo que va a cumplir la tarea de verificar si el usuario esta registrado middlewareUser.js
// ejemplo de estructura de un middleware
/*
export const auth =(req,res,next)=>{

    if(req.body.email == "maxi@asd.com" && req.body.password == "123") {
       next()  
    } else {
        res.status(200).redirect('/fallaingreso')
}}

*/

//5) importar el middleware en el controller de los usuarios
// ej : import * as middlewareUser from '../middleware/middlewareUser.js'
// usar el middlewareUser en el controllerUser con la funcion que necesites
//: ej app.post('/login',middlewareUser.auth,controlleUsers.login)
 
//---------------------------------------------------------------------------
//hasta aca tenemos un login simple pero tiene algunos problemas
 //Primer problema: no se pueden registrar usuarios, el programador lo tiene que hacer a mano


//Solucion:
//crear un archivo dentro de models con el nombre users.js
//importa mongoose dentro del archivo users.js
//luego armar el codigo para el modelo de la base de datos (se pueden agregar todos los datos que se quieran) ej:
/*
const usersCollection = 'users'

const usersSchema = new mongoose.Schema({

  username: { type: String, require: true },
  password: { type: String, require: true }


})

export default mongoose.model(usersCollection, usersSchema)
*/
//agregar una vista registro y con un formulario post (tambien agregar una vista el caso de fallas al registrase)
//agregar todas las rutas y funciones (routes,controllers,middlewares) para hacer funcionar el registro(ver video)
//modificar el login (en controller y middleware) para que consulte la base de datos(ver video)


 //segundo problema : si la persona entra directo con la url la pagina no pide credenciales
 //tercer problema: las claves no son seguras por que no esta encriptadas
//1)
//crear en la carpeta config el archivo passport.js
//dentro del archivo passport.js importar mongoose , bcrypt , passport y passport-local
//instalar todos los modulos que agregamos que no esten instalados
/*
npm i bcrypt@5.0.1
npm i passport@0.4.1
npm i passport-local@1.0.0
*/

//dentro de passport.js pegar el siguiente codigo de configuracion

/*

mongoose.set('useCreateIndex', true)
const LocalStrategy = Local.Strategy

const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password)
}
const createHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export const ConectarPassport = () => {
  passport.use('login', new LocalStrategy({ passReqToCallback: true },
    function (req, username, password, done) {
      User.findOne({ username: username },
        function (err, user) {
          if (err) return done(err)
          if (!user) return done(null, false)
          if (!isValidPassword(user, password)) return done(null, false)
          return done(null, user)
        })
    })
  )

  passport.use('register', new LocalStrategy({ passReqToCallback: true },
    function (req, username, password, done) {

      const findOrCreateUser = function () {
        User.findOne({ username: username },
          function (err, user) {
            if (err) return done(err)
            if (user) {
              return done(null, false)
            } else {
              const newUser = new User()
              newUser.username = username
              newUser.password = createHash(password)
              newUser.email = req.body.email,
              newUser.tel = req.body.tel,
              newUser.address = req.body.address,
              newUser.name=req.body.name 

              newUser.save(function (err) {
                if (err) { throw err }
                return done(null, newUser)
              })
            }
          })
      }
 
      process.nextTick(findOrCreateUser)
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (err) {
        console.log(err.stack)
      }
      done(null, user)
    })
  })
}

*/

