class RegisterCtrl {
    register = async(req, res, next) => {
        res.send('Register')
    }
}

module.exports = new RegisterCtrl 