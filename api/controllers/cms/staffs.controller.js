const { User } = require("@/models")
const {errorMsg, validationError} = require("@/lib")
const bcrypt = require('bcryptjs')

class StaffCtrl {
    index = async(req, res, next) => {
        const staffs = await User.find({role: 'staff'})

        res.send(staffs)
    }

    //to create a staff
    store = async(req, res, next) => {
        try{
            let { name, email, password, confirmPassword, phone, address, status } = req.body

            if(password == confirmPassword){
                const hash = bcrypt.hashSync(password, 10)

                await User.create({ name, email, password: hash, phone, address, status, role: "staff"})

                res.send({
                    message: 'Staff Added'
                })
            }else{
                validationError(next, {
                    password: 'the password is not confirmed'
                })
            }
        } catch (error){
            errorMsg(next, error)
        }
    }

    //to show the detail about staff using id
    show = async(req, res, next) => {
        try{
            const { id } = req.params
            const staff = await User.findById(id)

            if(staff.role == 'staff'){
                res.send(staff)
            }else{
                next({
                    message: 'staff not found',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

    //to update the information of staff
    update = async(req, res, next) => {
        try{
            const { name, phone, address, status } = req.body
            const { id } = req.params
            const staff = await User.findById(id)

            if(staff.role == 'staff'){
                await User.findByIdAndUpdate(id, {name, phone, address, status})
                res.send({
                    message: 'Staff updated'
                })
            }else{
                next({
                    message: 'staff not found',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }


    //to delete the staff information
    destroy = async(req, res, next) => {
        try{
            const { id } = req.params
            const staff = await User.findById(id)



            if(staff.role == 'staff'){
                await User.findByIdAndDelete(id)

                res.send({
                    message: 'staff deleted'
                })
            } else{
                next({
                    message: 'no staff found'
                })
            }



        }catch(error){
            errorMsg(next, error)
        }

    }
}

module.exports = new StaffCtrl;