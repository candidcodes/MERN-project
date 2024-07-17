const { errorMsg } = require("@/lib")
const {Product, Review} = require('@/models')
const { Types } = require('mongoose')

class ProductsCtrl{
    latest = async(req, res, next) => {
        try{
            const products = await Product.find({status: true}).sort({createdAt: 'desc'})

            res.send(products)
        }catch(error){
            errorMsg(next, error)
        }
    }

    featured = async(req, res, next) => {
        try{
            const products = await Product.find({status: true, featured: true})

            res.send(products)
        }catch(error){
            errorMsg(next, error)
        }
    }

    topSelling = async(req, res, next) => {
        try{
            const products = await Product.aggregate()
                .match({status: true})  //condition 
                .lookup({from: 'details', localField: '_id', foreignField: 'productId', as: 'details_count'})   //
                .addFields({'details_count': {$size: ['$details_count']}})  //adding custom fields
                .sort({details_count: 'desc'})

                
            res.send(products)
        }catch(error){
            errorMsg(next, error)
        }
    }

    show = async(req, res, next) => {
        try{
            const { id } = req.params
            
            let product = await Product.aggregate()
                .match({'_id': new Types.ObjectId(id)})
                .lookup({from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand'})

            

            if(product.length > 0){
                product = product[0]
                product.brand = product.brand[0]

                let reviews = await Review.aggregate()
                    .match({'productId': product._id})
                    .lookup({from: 'users', localField: 'userId', foreignField: '_id', as: 'user'})

                for (let i in reviews){
                    reviews[i].user = reviews[i].user[0]
                }

                product.reviews = reviews

                res.send(product)
            }else{
                next({
                    message: 'Product not found',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    
    search = async(req, res, next) => {
        try{
            const { term } = req.query
            const products = await Product.find({
                status: true,
                name: {$regex: term, $options: 'i'}
            })

            res.send(products)

        }catch(error){
            errorMsg(next, error)
        }
    }

    byCategoryId = async(req, res, next) => {
        try{
            const { id } = req.params
            const products = await Product.find({
                status: true,
                categoryId: id
            })

            res.send(products)

        }catch(error){
            errorMsg(next, error)
        }
    }

    byBrandId = async(req, res, next) => {
        try{
            const { id } = req.params
            const products = await Product.find({
                status: true,
                brandId: id
            })

            res.send(products)

        }catch(error){
            errorMsg(next, error)
        }
    }
    
    similar = async(req, res, next) => {
        try{
            const { id } = req.params
            const product = await Product.findById(id)

            const products = await Product.find({
                categoryId: product.categoryId,
                _id: {$ne: product._id}, 
                status: true
            }
            )

            res.send(products)

        }catch(error){
            errorMsg(next, error)
        }
    }
    
    review = async(req, res, next) => {
        try{
            const { id } = req.params
            const { comment, rating } = req.body

            await Review.create({comment, rating, productId: id, userId: req.user._id})

            res.send({
                message: 'thank you for your review'
            })
        }catch(error){
            errorMsg(next, error)
        }
    }

}

module.exports = new ProductsCtrl