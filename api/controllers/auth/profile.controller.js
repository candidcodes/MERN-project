const { errorMsg } = require("@/lib")
const { User } = require("@/models")

class profileCtrl {
    detail = async(req, res, next) => {
        res.send(req.user)
    }
    
    update = async(req, res, next) => {
        try{
            const { name, phone, address } = req.body

            await User.findByIdAndUpdate(req.user._id, {name, phone, address})
            res.send({
                message: 'profile updated'
            })
        }catch(error){
            errorMsg(next, error)
        }
    }

    password = async(req, res, next) => {}
}

module.exports =  new profileCtrl