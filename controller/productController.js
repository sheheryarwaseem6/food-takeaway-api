const Product = require('../models/Product')
const Category = require('../models/Category')
const Favourite = require('../models/Favourite')

const addProduct = async (req, res) => {
      try{
        if(!req.body.product_name){ 
            return res.status(400).json({
                message: 'Please fill product_name fields'
            })
        }
        if(!req.body.product_description ){ 
            return res.status(400).json({
                message: 'Please fill product_description fields'
            })
        }
        if(!req.body.product_price ){ 
            return res.status(400).json({
                message: 'Please fill product_price fields'
            })
        }
        if(!req.file){ 
            return res.status(400).json({
                message: 'Please fill product_image fields'
            })
        }
        if(!req.body.categoryId ){ 
            return res.status(400).json({
                message: 'Please fill categoryId fields'
            })
        }

        else{
            if (req.file) {
                product_image = req.file.path
            }
            const product = new Product()
                product.product_name = req.body.product_name
                product.product_description = req.body.product_description
                product.product_price = req.body.product_price
                product.product_image =  req.file.path ;
                product.categoryId = req.body.categoryId

                const addProduct = await product.save()
                console.log(addProduct)
               
                if(addProduct){
                    return res.status(200).json({
                        message: 'Product added successfully'
                    })
                }
                else{
                    res.status(400).json({
                        message: 'product didnot added'
                    });
                }


            
        }
    }

    catch(error){
        return res.status(404).json({
            message: error.message
        })
    }
}


const getAllProducts = async (req, res) => {
    try {
        const productData = await Product.aggregate([{ 
            $match: { categoryId: req.params.categoryId}},
            {
                $lookup:
                {
                    "from": "favourites",
                    "let": { 
                        "id": "$_id" ,
                        "userid": req.user._id
                    },
                    "pipeline": [
                        { '$match':
                        { '$expr':
                          {
                             '$eq': ['$productId', '$$id'],
                          }
                        }
                      },
                      { '$match':
                        { '$expr':
                          {
                             '$eq': ['$userId', '$$userid'],
                          }
                        }
                      },
                      ],
                    "as": "isFavourite"
                }
            }])
            if (productData.length < 1) {
                return res.status(404).json({
                    status: 0,
                    message: "product not found",
                })
            }


        // const products = await Product.find({categoryId: req.params.categoryId})
        // if(products){
        else{
            return res.status(200).json(
            {
            Data: productData
        }
        )}   
        // }
        // else{
        //     return res.status(400).json({
        //         message: 'Products not found'
        //     })
        // }


    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}



const getProductDetails = async (req, res) =>{
    try{
        const product = await Product.findOne({_id : req.params._id})
        if(product){
            return res.status(200).json({
                message: product
            })
        }
        else{
            return res.status(400).json({
                message: 'Product not found'
            })
        }



    }catch(error){
        return res.status(400).json({
            message: error.message
        })
    }
}

// add and delete favourites

const favourite = async (req, res) =>{
    try {
        if (!req.body.productId) {
            return res.status(400).send({
                status: 0,
                message: "Product ID is required"
            })
        }
        else {
            // const findProducts = await Favourite.find({ })
            // console.log(findProducts)
            // if (findProducts.length >= 1) {
            //     // console.log(findCatogory)
            //     return res.status(400).send({
            //         status: 0,
            //         message: "Product Already Exists"
            //     })
            // }
            // const findfvrt = await Favourite.find({ userId: req.user._id, productId: req.body.productId })
            const findfvrt = await Favourite.find({ userId: req.user._id, productId: req.body.productId })
            console.log(findfvrt)
            if (findfvrt.length > 0) {
                const delfvrt = await Favourite.findOneAndDelete({ userId: req.user._id })
                if (delfvrt) {
                    res.status(200).send({
                        status: 1,
                        message: "Favourite deleted"
                    })
                }
                else {
                    return res.status(400).send({
                        status: 0,
                        message: "fvrt not del"
                    })
                }
            }
            else {
                const favourites = await Favourite.create({
                    userId: req.user._id, productId: req.body.productId,
                })
                if (favourites) {
                    res.status(200).send({
                        status: 1,
                        message: "Add to Favourites"
                    })
                }
                else {
                    return res.status(400).send({
                        status: 0,
                        message: "Something went wrong 2"
                    })
                }
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

//get all favourites


const favouriteProducts = async (req, res) => {
    try {
        
        const favourites = await Favourite.find({ userId: req.user._id}).populate({
            path: "productId",
            model: "Product",
            select:"product_name product_description product_price product_image"
            
        })
        if(!favourites){
            return res.status(400).send({
                status: 0,
                message: "No Product in Favourite"
            })
        }
        else{
        return res.status(200).send({
            status: 1,
            message: "success",
            favourites
        })
        }
    } catch (error) {
        
        return res.status(400).json(error.message)
    }
}


module.exports={
    addProduct,
    getAllProducts,
    getProductDetails,
    favourite,
    favouriteProducts
}
