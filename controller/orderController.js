const Order = require('../models/Order');
// ** Get Category **//
// const allProducts = async (req, res) => {
//     try {
//         const order = await Order.find()
//         if (order.length < 1) {
//             return res.status(404).json({
//                 status: 0,
//                 message: "product not found",
//             })
//         }
//         res.status(200).json({
//             status: 1,
//             order,
//         })
//     }
//     catch (error) {
//         console.log('error *** ', error);
//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });
//     }
// }
//** Add Order **//
const addOrder = async (req, res) => {
    try {
        if (!req.body.orderPrice) {
            return res.status(400).send({
                status: 0,
                message: "orderPrice is required"
            })
        }
        else if (!req.body.products) {
            return res.status(400).send({
                status: 0,
                message: "productId is required"
            })
        }
        // else if (!req.body.orderPrice) {
        //     return res.status(400).send({
        //         status: 0,
        //         message: "order Price is required"
        //     })
        // }
        else {
            // const findProducts = await Products.find({ title: req.body.title })
            // console.log(findProducts)
            // if (findProducts.length >= 1) {
            //     // console.log(findCatogory)
            //     return res.status(400).send({
            //         status: 0,
            //         message: "Product Already Exists"
            //     })
            // }
            console.log(req.body.products)
            var orderID = Math.floor(100000 + Math.random() * 900000);
            const order = await Order.create({
                userId: req.user._id,
                orderId: orderID,
                orderPrice: req.body.orderPrice,
                 products: req.body.products
            })
            if (order) {
                res.status(200).send({
                    status: 1,
                    message: "Order Placed successfully",
                    order
                })
            }
            else {
                return res.status(400).send({
                    status: 0,
                    message: "Something went wrong"
                })
            }
        }
    }
    catch (error) {
        return res.status(400).send({
            status: 0,
            message: error
        })
    }
}


const getPastOrders = async(req , res) =>{
    try{
        const getOrders = await Order.find({userId : req.params.userId}).populate({path : "products.productId", model :"Product", select: "product_name product_description product_price product_image"})
       
            if (getOrders.length < 1) {
            return res.status(404).json({
                status: 0,
                message: "Orders not found",
            })
          
        }
          return res.status(200).json({
            status: 1,
            getOrders,
            })
        // res.status(200).json({
        //     status: 1,
        //     getOrders,
        // })
        
    }catch(error){
        return res.status(500).json({
            status: 0,
            message: error.message
        });
    }
}
module.exports = {
    addOrder,
    getPastOrders
}