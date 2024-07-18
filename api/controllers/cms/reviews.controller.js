const { errorMsg } = require("@/lib");
const Review = require("@/models/review.model")


class ReviewsCtrl{
    index = async (req, res, next) => {
        try{
            let reviews = await Review.aggregate()
            .lookup({
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'product'
            })
            .lookup({
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            })
            for(let i in reviews){
                reviews[i].product = reviews[i].product[0]
                reviews[i].user = reviews[i].user[0]
            }

            res.send(reviews)
        }catch(error){
            errorMsg(next, error)
        }
    }
    destroy = async (req, res, next) => {
        try{
            const { id } = req.params
            const review = await Review.findById(id)

            if(review){
                await Review.findByIdAndDelete(id)
                res.send({
                    message: 'review deleted'
                })
            }else{
                next({
                    message: 'review doesnt exist'
                })
            }


        }catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports = new ReviewsCtrl