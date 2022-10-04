const Card = require('../models/Card');


//** Add Card Details **//
const addCardDetails = async (req, res) => {
    try {
        if (!req.body.cardNumber) {
            return res.status(400).send({
                status: 0,
                message: "cardNumber is required"
            })
        }
        else if (!req.body.exp_month) {
            return res.status(400).send({
                status: 0,
                message: "exp_month is required"
            })
        }
        else if (!req.body.exp_year) {
            return res.status(400).send({
                status: 0,
                message: "exp_year is required"
            })
        }
        else if (!req.body.cvv) {
            return res.status(400).send({
                status: 0,
                message: "cvv is required"
            })
        }
        else if (req.body.cardNumber.length > 16) {
            return res.status(400).send({
                status: 0,
                message: "cardNumber length exceeds"
            })
        }
        else if (req.body.cvv.length > 4) {
            return res.status(400).send({
                status: 0,
                message: "cvv length exceeds"
            })
        }
        else {
            let findCard = await Card.find({ cardNumber: req.body.cardNumber })
            // console.log(findCard)
            if (findCard.length >= 1) {
                // console.log(findCatogory)
                return res.status(400).send({
                    status: 0,
                    message: "Card Already Exists"
                })
            }
            const card = await Card.create({
                cardNumber: req.body.cardNumber, userId: req.user._id,
                exp_month: req.body.exp_month, exp_year: req.body.exp_year, cvv: req.body.cvv
            })
            if (card) {
                res.status(200).send({
                    status: 1,
                    message: "Card added successfully"
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

// get card details

const getCardList = async (req, res) => {
    
    try {
      let findCard = await Card.find({ userId: req.user._id })
      if (findCard) {
        return res.status(200).send({ status: 1, message: "User Card List.", data: findCard });
      }
      else {
        return res.status(400).send({ status: 0, message: 'No record Found!' });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  
  
//set default card

const setDefaultCard = async(req,res) =>{
    try{
        if(!req.body.cardNumber){
            return res.status(400).send({
                status: 0,
                message: "please enter card number"
            })
        }
        else{
            const findACard = await Card.find({userId: req.user._id , cardNumber : req.body.cardNumber})
            if(findACard.length>0){
                const updateACard = await Card.updateMany({userId: req.user._id }, { is_active: 0})
                if (updateACard) {
                  await UserCard.updateOne({ userId: req.user._id, cardNumber: req.body.cardNumber }, { is_active: 1 });
                  return res.status(200).send({ status: 1, message: 'Card set as default.' });
                }
            }
            else {
                return res.status(400).send({ status: 0, message: 'No record Found!' });
              }
        }
    }
    catch(error){
        return res.status(400).send(error)
    }
}

module.exports = {
    addCardDetails,
    getCardList,
    setDefaultCard
}