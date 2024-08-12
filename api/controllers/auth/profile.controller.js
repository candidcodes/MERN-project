const { errorMsg, validationError } = require("@/lib")
const { User, Review, Order, Detail } = require("@/models")
const bcrypt = require('bcryptjs')


class profileCtrl {
    detail = async(req, res, next) => {
        res.send(req.user)
    }
    
    update = async(req, res, next) => {
        try{
            const { name, phone, address } = req.body

            const user = await User.findByIdAndUpdate(req.user._id, {name, phone, address})
            res.send({
                message: 'profile updated'
            })
        }catch(error){
            errorMsg(next, error)
        }
    }

    password = async(req, res, next) => {
        try{
            const { oldPassword, newPassword, confirmPassword } = req.body

            const user = await User.findById(req.user._id).select('+password')

            if(bcrypt.compareSync(oldPassword, user.password)){
                if(newPassword == confirmPassword){
                    const hash = bcrypt.hashSync(newPassword, 10)
    
                    await User.findByIdAndUpdate(req.user._id, { password: hash })
    
                    res.send({
                        message: 'Password changed'
                    })
                }else{
                    validationError(next, {
                        newpassword: 'The password is not confirmed'
                    })
                }
                
            }else{
                validationError(next, {
                    oldPassword: "Incorrect old Password"
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    reviews = async(req, res, next) => {
        try{
            let reviews = await Review.aggregate()
                .match({userId: req.user._id}) 
                .lookup({
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                })
                for(let i in reviews){
                    reviews[i].product = reviews[i].product[0]
                }

                res.send(reviews)
        }catch(error){
            errorMsg(next, error)
        }
    }

    orders = async(req, res, next) => {
        try{
            let orders = await Order.find({userId: req.user._id})

            for(let i in orders){
                let details = await Detail.aggregate()
                    .match({orderId: orders[i]._id})
                    .lookup({
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product'
                    })
                    for(let j in details){
                        details[j].product = details[j].product[0]
                    }

                    orders[i] = {
                        ...orders[i].toJSON(),
                        details
                    }
            }
            res.send(orders)  

        }catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports =  new profileCtrl