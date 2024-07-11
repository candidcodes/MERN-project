const { Category } = require("@/models")
const {errorMsg} = require("@/lib")

class CategoriesCtrl{
    //show the category
    index = async(req, res, next) => {
        const category = await Category.find()

        res.send(category)

    }

    //to create a category 
    store = async(req, res, next) => {
        try{
            const {name, status} = req.body

            await Category.create({name, status})
    
            res.send({
                message: 'category created'
            })

        }catch(error){
            errorMsg(next, error)
        }

    }

    //to show the detail about category using id
    show = async(req, res, next) => {
        try{
            const { id } = req.params
            const category = await Category.findById(id)

            if(category){
                res.send(category)
            }else{
                next({
                    message: 'this category doesnt exist',
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
            const {name, status} = req.body
            const { id } = req.params
            const category = await Category.findById(id)


            if(category){
                await Category.findByIdAndUpdate(id, {name, status})
                res.send({
                    message: 'category updated'
                })
            }else{
                next({
                    message: 'category not found',
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
            const {name, status} = req.body
            const { id } = req.params
            const category = await Category.findById(id)


            if(category){
                await Category.findByIdAndDelete(id)
                res.send({
                    message: 'category deleted'
                })
            }else{
                next({
                    message: 'category not found',
                    status: 404
                })
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports = new CategoriesCtrl;