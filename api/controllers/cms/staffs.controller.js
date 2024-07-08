const { User } = require("@/models")

class StaffCtrl {
    index = async(req, res, next) => {
        const staffs = await User.find({role: 'staff'})

        res.send(staffs)
    }
    store = async(req, res, next) => {}
    show = async(req, res, next) => {}
    update = async(req, res, next) => {}
    destroy = async(req, res, next) => {}
}

module.exports = new StaffCtrl;