const bcrypt = require('bcryptjs')
const { User } = require('../../models')

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
                next({
                    message : 'There seems to be some validation problem',
                    status: 422,
                    errors: {
                        password: 'the password is not confirmed'
                    }
                })
            }
        } catch (error){
            console.log(error)
        }
    }
}

module.exports = new RegisterCtrl 