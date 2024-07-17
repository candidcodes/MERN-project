const { errorMsg } = require("@/lib");
const Review = require("@/models/review.model")


class ReviewsCtrl{
    index = async (req, res, next) => {
        try{

        }catch(error){
            errorMsg(next, )
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