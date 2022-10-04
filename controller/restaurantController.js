const Restaurant = require('../models/Restaurant');


const addRestaurant = async (req, res) =>{
    try{
        
        if(!req.body.restName){
            return res.status(400).json({
                status: 0,
                message: 'restaurant Name is required'
            })
        }
        // else if(!req.body.contact){
        //     return res.status(400).json({
        //         status: 0,
        //         message: 'contact is required'
        //     })
        // }
        // else if(!req.body.days){
        //     return res.status(400).json({
        //         status: 0,
        //         message: 'days is required'
        //     })
        // }
        
        
        else{
            const findRestaurant = await Restaurant.find({restName: req.body.restName , userId: req.user._id})
            // console.log(findResturant)
            if (findRestaurant.length > 0) {
                console.log(findRestaurant)
               return res.status(400).send({
                    status: 0,
                    message: "Restaurant Already Exists"
                })
            }
            
            const restaurant = new Restaurant({
                userId: req.user._id,
                restName: req.body.restName,
                "location.longitude" : req.body.longitude,
                "location.latitude" : req.body.latitude,
                number: req.body.number,
                email: req.body.email,
                timing: req.body.timing,
                // "timing.monday": req.body.monday,
                // "timing.tuesday": req.body.tuesday,
                // "timing.wednesday": req.body.wednesday,
                // "timing.thursday": req.body.thursday,
                // "timing.friday": req.body.friday,
                // "timing.saturday": req.body.saturday,
                // "timing.sunday": req.body.sunday,
                // "days.time": req.body.time,
                //location: req.body.location
            });
            // restaurant.name = req.body.name,
            // restaurant.location = req.body.location,
            // restaurant.contact = req.body.contact,
            // restaurant.days = req.body.days,
            // restaurant.userId = req.user._id
            const addrestaurant = await restaurant.save();
            if(addrestaurant){
                return res.status(200).json({
                    status: 1,
                    message: 'Restaurant added successfully'
                })
            }
            else{
                return res.status(400).json({
                    status: 0,
                    message: 'Something went wrong.'
                });
            }
        }
        

    }catch(error){
        return res.status(400).json({
            status: 0,
            message: error.message
        })
    }
}

const getAllRestaurant = async (req, res) =>{
    try{
        const restaurant = await Restaurant.find();
        // for(let i = 0; i<restaurant.length; i++){
        //     let resTime = restaurant[0].timing
        // }
        // console.log(resTime)
        if(restaurant){
            return res.status(200).json({
                status: 1,
                message: restaurant
            })
        }
        else{
            return res.status(400).json({
                status: 0,
                message: 'Restaurant not found'
            })
        }


    }catch(error){
        return res.status(400).json({
            status: 0,
            message: error.message
        })
    }
}

//get a restaurant

const getRestaurant = async (req, res) => {
    try{
        const restaurant = await Restaurant.findById(req.params.id);
        if(restaurant){
            return res.status(200).json({
                status: 1,
                message: restaurant
            })
        }
        else{
            return res.status(400).json({
                status: 0,
                message: 'Restaurant not found'
            })
        }

    }catch(error){
        return res.status(400).json({
            status: 0,
            message: error.message
        })
    }
}

module.exports = {addRestaurant , getAllRestaurant, getRestaurant}