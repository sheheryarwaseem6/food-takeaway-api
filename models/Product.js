const mongoose = require('mongoose')
const Category = require('../models/Category')

const productSchema = new mongoose.Schema({

    product_name:{
        type : String

    },
    product_description:{
        type : String
    },
    product_price:{
        type : Number
    },
    product_image:{
        type : String
    },
    quantity:{
        type : Number,
        default : 1
    },
    categoryId:{
        type : String
    }
},{Timestamps : true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product

