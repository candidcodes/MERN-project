const bcrypt = require('bcryptjs')
const { validationError, errorMsg } = require("@/lib")
const { User } = require("@/models")
const jwt = require('jsonwebtoken')

class LoginCtrl{
    login = async (req, res, next) => {
        try{
            const {email, password} = req.body

            const user = await User.findOne({email}).select('+password')

            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    if(user.status){
                        const token = jwt.sign({
                            uid: user._id,
                            iat: Math.floor(Date.now()/1000),
                            exp: Math.floor(Date.now()/1000) + 30*24*60*60
                        }, process.env.JWT_TOKEN)
    
                        res.send({token})
                    }else{
                        validationError(next, {
                            email: 'given email is not activated'
                        })
                    }

                }else{
                    validationError(next, {
                        password: "Incorrect Password"
                    })
                }

            }else{
                validationError (next, {
                    email: "Given Email is not registered"})
            }
        }catch(error){
            errorMsg(next, error)
        }

    }
}

module.exports = new LoginCtrl