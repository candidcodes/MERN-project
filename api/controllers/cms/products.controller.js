const { errorMsg } = require("@/lib");
const { Product } = require("@/models");
const { unlinkSync } = require('node:fs')


class ProductsCtrl{
    index = async (req, res, next) => {

        //to display the related brands and 
        const products = await Product.aggregate()
            .lookup({
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'

            }) 
            .lookup({
                from: 'brands',
                localField: 'brandId',
                foreignField: '_id',
                as: 'brand'

            })
        //the brand details and category details comes in array so we use this to convert to object
        for(let i in products){
            products[i].category = products[i].category[0]
            products[i].brand = products[i].brand[0]
        }
        res.send(products)
    }

    store = async (req, res, next) => {
        try{
            const {name, status, description, summary, price, discountedPrice, categoryId, brandId, featured} = req.body
            let images = []

            for (let file of req.files){
                images.push(file.filename)
            }

            await Product.create({
                name, status, description, summary, price, discountedPrice: discountedPrice || 0, categoryId, brandId, featured, images
            })

            res.send({
                message: 'product added'
            })
        }catch(error){
            errorMsg(next, error)
        }
    }

    show = async(req, res, next) => {
        try{
            const { id } = req.params
            const product = await Product.findById(id)

            if(product){
                res.send(product)
            }else{
                next({
                    message: 'product doesnt exist',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    update = async(req, res, next) => {
        try{
            const {name, status, description, summary, price, discountedPrice, categoryId, brandId, featured} = req.body
            const { id } = req.params
            const product = await Product.findById(id)

            

            if(product){

                let images = product.images;

                if(req.files.length > 0){  //checking the length of array
                    for(let file of req.file){
                        images.push(file.filename)
                    }
                }
                
                await Product.findByIdAndUpdate(id, {name, status, description, summary, price, discountedPrice: discountedPrice || 0, categoryId, brandId, featured})
                res.send({
                    message: 'product updated'
                })
            }else{
                next({
                    message: 'product doesnt exist',
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
            const product = await Product.findById(id)

            if(product){
                for(let image of product.images){
                    unlinkSync(`uploads/${image}`)
                }

                await Product.findByIdAndDelete(id)
                res.send({
                    messange: 'product info deleted'
                })
            }else{
                next({
                    message: 'product doesnt exist'
                })
            }


        }catch(error){
            errorMsg(next, error)
        }
    }

    image = async (req, res, next) => {
        try{
            const { id, filename } = req.params
            const product = await Product.findById(id)

            if(product){
                unlinkSync(`uploads/${filename}`)

                const images = product.images.filter(file => filename != file)

                await Product.findByIdAndUpdate(id, {images})

                res.send({
                    messange: 'image deleted deleted'
                })
            }else{
                next({
                    message: 'product doesnt exist'
                })
            }


        }catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports = new ProductsCtrl 