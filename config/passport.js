import mongoose from 'mongoose'
import passport from 'passport'
import Local from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../src/models/users.js'

mongoose.set('useCreateIndex', true)
const LocalStrategy = Local.Strategy

const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password)
}
const createHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

 const ConectarPassport = () => {
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
        console.log(username)
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

export default ConectarPassport