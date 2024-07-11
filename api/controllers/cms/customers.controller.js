const { User } = require("@/models")
const {errorMsg, validationError} = require("@/lib")
const bcrypt = require('bcryptjs')

class CustomersCtrl {
    //shows all the customer
    index = async(req, res, next) => {
        const customer = await User.find({role: 'customer'})

        res.send(customer)
    }

    //helps to create a new cusotmer to admin or staff
    store = async(req, res, next) => {
        try{
            const { name, email, phone, address, password, confirmPassword, status } = req.body

            if(password == confirmPassword){
                const hash = bcrypt.hashSync(password, 10)

                await User.create({
                    name, email, password: hash, phone, address, status, role: 'customer'
                })
                
                res.send({
                    message: 'customer created'
                })
            }else{
                validationError(next, {
                    message: 'password doesnt match'
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

    //shows the customer information with the id provided in the params
    show = async(req, res, next) => {
        const { id } = req.params
        const customer = await User.findById(id)

        if(customer.role == 'customer'){
            res.send(customer)
        }else{
            next({
                message: 'customer doesnt exist',
                status: 404
            })
        }
    }

    //uptdates the information of the customer whose id is in params
    update = async(req, res, next) => {
        try{
            const { name, phone, address, status } = req.body
            const { id } = req.params
            const custoer = await User.findById(id)

            if(custoer.role == 'customer'){
                await User.findByIdAndUpdate(id, {name, phone, address, status})
                res.send({
                    message: 'customer info updated'
                })
            }else{
                next({
                    message: 'Customer not found',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }

    }

    //to delete the customer
    destroy = async(req, res, next) => {
        try{

            const {id} = req.params
            const customer = await User.findById(id)

            if(customer.role == 'customer'){
                await User.findByIdAndDelete(id)

                res.send({
                    message: 'customer deleted'
                })
            }

        }catch(error){
            errorMsg(next, error)
        }
    }
    
}

module.exports = new CustomersCtrl;

