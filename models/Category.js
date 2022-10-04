const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const categorySchema = new mongoose.Schema({ 

    category_name:{
        type : String
    },
    category_image:{
        type: String
    },
    // category_description:{
    //     type: String
    // },
    parentId:{
        type: String,
        default : 0
    },
    restaurantId:{
        type: String
    }

},
{ timestamps: true })

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;