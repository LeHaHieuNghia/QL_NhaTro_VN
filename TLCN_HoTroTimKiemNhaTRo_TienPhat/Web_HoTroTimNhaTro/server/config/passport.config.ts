import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import User from "../models/User/user.model"
import bcrypt from "bcrypt"

passport.serializeUser((user: any, done: any) => {
  done(null, user.id)
})

passport.deserializeUser((id: string, done: any) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user)
  })
})

// Passport register
passport.use(
  "local.register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
   async (req: any, username: string, password: string, done: any) => {
      User.findOne(
        {
          "local.username": username,
        },
        (err: any, user: any) => {
          if (err) {
            return done(err)
          }
          if (user) {
            return done(
              null,
              false,
              req.flash(
                "signupMessage",
                "Tài khoản đã được sử dụng, vui lòng chọn tài khoản khác",
              ),
            )
          }
          let { email, firstname, lastname } = req.body
          var newUser = new User()
          newUser.local!.username = username
          newUser.local!.password = password
          newUser.local!.email = email
          newUser.infor!.firstname = firstname
          newUser.infor!.lastname = lastname
          bcrypt.hash(password, 10, async (err: any, hash: string) => {
            if (err) throw err
            newUser.local!.password = hash

            try {
              done(null, await newUser.save())
            } catch (err) {
              done(err)
            }
          })
        },
      )
    },
  ),
)

/* Passport login */
passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req: any, username: string, password: string, done: any) => {
      User.findOne(
        {
          "local.username": username,
        },
        (err: any, user: any) => {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(
              null,
              false,
              req.flash(
                "loginMessage",
                "Tài khoản này không tồn tại, vui lòng kiểm tra lại.",
              ),
            )
          }
          bcrypt.compare(
            password,
            user.local.password,
            (err: any, isMatch: boolean) => {
              if (err) {
                return done(err)
              }
              if (!isMatch) {
                return done(
                  null,
                  false,
                  req.flash("loginMessage", "Vui lòng kiểm tra lại mật khẩu"),
                )
              }
              return done(null, user)
            },
          )
        },
      )
    },
  ),
)
