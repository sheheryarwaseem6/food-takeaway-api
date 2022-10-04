const mongoose = require ('mongoose')

const favouriteSchema = new mongoose.Schema({

    productId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'

    }
})

const Favourite = mongoose.model('Favourite', favouriteSchema)

module.exports = Favourite