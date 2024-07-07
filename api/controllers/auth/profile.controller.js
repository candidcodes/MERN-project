class profileCtrl {
    detail = async(req, res, next) => {
        res.send(req.user)
    }
    
    update = async(req, res, next) => {
        res.send('')
    }

    password = async(req, res, next) => {}
}

module.exports =  new profileCtrl