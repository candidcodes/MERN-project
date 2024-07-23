const { errorMsg } = require("@/lib");
const {Order, Detail} = require("@/models")


class OrdersCtrl{
    index = async (req, res, next) => {
        try{
            let orders = await Order.aggregate()
            .lookup({
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            })
            
            for(let i in orders){
                orders[i].user = orders[i].user[0]

                let details = await Detail.aggregate()
                    .match({orderId: orders[i]._id})
                    .lookup({
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product'
                    })

                for(let j in details){
                    details[j].product = details[j].product[0]
                }
                orders[i] = {
                    ...orders[i],
                    details
                }
            }

            res.send(orders)
        }catch(error){
            errorMsg(next, error)
        }
    }
    update = async (req, res, next) => {
        try{
            const { id } = req.params
            const { status } = req.body

            await Order.findByIdAndUpdate(id, {status})

            res.send({
                message: 'Order Status Updated'
            })
            
        }catch(error){
            errorMsg(next, error)
        }
    }
    destroy = async (req, res, next) => {
        try{
            const { id } = req.params
            const order = await Order.findById(id)

            if(order){

                await Detail.deleteMany({orderId: id})

                await Order.findByIdAndDelete(id)
                res.send({
                    messange: 'Order deleted'
                })
            }else{
                next({
                    message: 'Order doesnt exist'
                })
            }


        }catch(error){
            errorMsg(next, error)
        }
    }
}

module.exports = new OrdersCtrl