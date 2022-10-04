const router = require('express').Router()
const { verifyToken , verifyAdmin } = require('../middleware/authenticate')
const {addCategory , getAllCategory, addSubCategory ,getAllSubCategory} = require('../controller/category')
const {addProduct, getAllProducts , getProductDetails , favourite, favouriteProducts} = require('../controller/productController')
const { getContent } = require('../controller/commonController')
const {addCardDetails, getCardList, setDefaultCard} = require('../controller/cardController')
const {addOrder , getPastOrders} = require('../controller/orderController')
const {register , login, socialLogin, verifyUser, resendCode, forgotPassword, updatePassword, changePassword, logout } = require('../controller/authController')
const {getProfile , updateProfile} = require('../controller/userController')
const {addRestaurant , getAllRestaurant, getRestaurant} = require('../controller/restaurantController')
const { upload } = require('../middleware/multer')



/** Content */
router.get('/get-content/:type', getContent);

// restaurant
router.post('/addRestaurant', verifyAdmin , addRestaurant)
router.get('/getAllRestaurant', verifyToken, getAllRestaurant )
router.get('/getRestaurant/:id', verifyToken, getRestaurant )

//category
router.post('/addCategory',verifyAdmin, upload.single('category_image'), addCategory);
router.post('/addSubCategory',verifyAdmin, upload.single('category_image'), addSubCategory);
router.get('/getAllCategory/:restaurantId',verifyToken, getAllCategory);
router.get('/getAllSubCategory/:parentId',verifyToken, getAllSubCategory);

//products
router.post('/addProduct',verifyAdmin, upload.single('product_image') , addProduct);
router.get('/getAllProducts/:categoryId',verifyToken, getAllProducts);
router.get('/getProductDetails/:_id',verifyToken, getProductDetails);


//favourites
router.post('/favourite',verifyToken, favourite);
router.get('/getFavourite',verifyToken, favouriteProducts);


//card details
router.post('/addCard',verifyToken, addCardDetails);
router.get('/getCardList', verifyToken , getCardList);
router.post('/setDefaultCard', verifyToken, setDefaultCard)


//orders
router.post('/addOrder', verifyToken , addOrder)
router.get('/getPastOrders/:userId', verifyToken, getPastOrders)

//user
router.get('/user',verifyToken, getProfile);
router.put('/updateProfile', verifyToken, upload.single('profilePicture'), updateProfile)



router.post('/register', register)
router.post('/login', login)
router.post('/social-login', upload.single('profilePicture'), socialLogin)
router.post('/verify-user', verifyUser);
router.post('/resend-code', resendCode);
router.post('/forgot-password', forgotPassword);
router.post('/update-password', updatePassword);
router.put('/change-password',verifyToken, changePassword);
router.post('/logout', verifyToken , logout)



module.exports = router