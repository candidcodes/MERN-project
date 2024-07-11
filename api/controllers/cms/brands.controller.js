const { errorMsg } = require("@/lib");
const Brand = require("@/models/brand.model")


class BrandsCtrl{
    index = async (req, res, next) => {
        const brand = await Brand.find();
        res.send(brand)
    }
    store = async (req, res, next) => {
        try{
            const {name, status} = req.body

            await Brand.create({
                name, status
            })

            res.send({
                message: 'brand added'
            })
        }catch(error){
            errorMsg(next, error)
        }
    }
    show = async(req, res, next) => {
        try{
            const { id } = req.params
            const brand = await Brand.findById(id)

            if(brand){
                res.send(brand)
            }else{
                next({
                    message: 'brand doesnt exist',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    update = async(req, res, next) => {
        try{
            const {name, status} = req.body
            const { id } = req.params
            const brand = await Brand.findById(id)


            if(brand){
                await Brand.findByIdAndUpdate(id, {name, status})
                res.send({
                    message: 'brand updated'
                })
            }else{
                next({
                    message: 'brand doesnt exist',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    destroy = async (req, res, next) => {
        try{
            const { id } = req.params
            const brand = await Brand.findById(id)

            if(brand){
                await Brand.findByIdAndDelete(id)
                res.send({
                    messange: 'brand info deleted'
                })
            }else{
                next({
                    message: 'brand doesnt exist'
                })
            }


        }catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports = new BrandsCtrl