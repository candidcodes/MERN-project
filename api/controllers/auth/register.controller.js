const bcrypt = require('bcryptjs')
const { User } = require('@/models')
const { validationError, errorMsg } = require('@/lib')

class RegisterCtrl {
    register = async(req, res, next) => {
        try{
            let { name, email, password, confirmPassword, phone, address} = req.body

            if(password == confirmPassword){
                const hash = bcrypt.hashSync(password, 10)

                await User.create({
                    name, email, password: hash, phone, address
                })

                res.send({
                    message: 'Thank you for regestering'
                })
            }else{
                validationError(next, {
                    password: 'The password is not confirmed'
                })
            }
        } catch (error){
            errorMsg(next, error)
        }
    }
}

module.exports = new RegisterCtrl 