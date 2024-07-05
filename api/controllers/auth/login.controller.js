const { validationError, errorMsg } = require("@/lib")
const { User } = require("@/models")

class LoginCtrl{
    login = async (req, res, next) => {
        try{
            const {email, password} = req.body

            const user = await User.findOne({email})

            if(user){

            }else{
                validationError (next, {email: "Given Email is not registered"})
            }
        }catch(error){
            errorMsg(next, error)
        }

    }
}

module.exports = new LoginCtrl