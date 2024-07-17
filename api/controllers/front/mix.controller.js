const { errorMsg } = require("@/lib")
const { Category, Brand, Order, Product, Detail } = require("@/models")

class MixCtrl{
    categories = async(req, res, next) => {
        try{
            const categories = await Category.find({status: true})

            res.send(categories)
    
        }catch(error){
            errorMsg(next, error)
        }
    }

    categoryById = async(req, res, next) => {
        try{
            const {id} = req.params
            const category = await Category.findOne({_id: id, status: true})

            if(category){
                res.send(category)
            }else{
                next({
                    message: "Category Not Found",
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }

    }

    brands = async(req, res, next) => {
        try{
            const brands = await Brand.find({status: true})

            res.send(brands)
    
        }catch(error){
            errorMsg(next, error)
        }  
    }

    brandById = async(req, res, next) => {
        try{
            const {id} = req.params
            const brand = await Brand.findOne({_id: id, status: true})

            if(brand){
                res.send(brand)

            }else{
                next({
                    message: "Brand Not Found",
                    status: 404
                })
            }
    
        }catch(error){
            errorMsg(next, error)
        }
    }

    checkout = async(req, res, next) => {
        try{
            let cart = req.body

            const order = await Order.create({userId: req.user._id})

            for(let item of cart){
                const product = await Product.findById(item.id)

                const price = product.discountedPrice > 0 ? product.discountedPrice : product.price

                const total = price * item.qty

                await Detail.create({
                    productId: item.id,
                    orderId: order._id,
                    qty: item.qty,
                    price,
                    total
                })
            }
            res.send({
                message: 'Thanks for Purchasing, We will contact soon with an update'
            })

        }catch(error){
            errorMsg(next, error)
        }
    }

    image = async(req, res, next) => {
        try{
            const { filename } = req.params

            res.sendFile(`uploads/${filename}`, {
                root: './'
            })
        }catch(error){
            errorMsg(next, error)
        }
    }
    
}

module.exports = new MixCtrl