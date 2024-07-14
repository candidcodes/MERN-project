const { errorMsg } = require("@/lib")
const {Product} = require('@/models')

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
            const products = await Product.find({status: true, features: true})

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

    show = async(req, res, next) => {}
    
    search = async(req, res, next) => {}

    byCategoryId = async(req, res, next) => {}

    byBrandId = async(req, res, next) => {}
    
    similar = async(req, res, next) => {}
    
    review = async(req, res, next) => {}

}

module.exports = new ProductsCtrl