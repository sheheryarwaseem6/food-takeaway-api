const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api')
const bodyParser = require('body-parser')
const Content = require('./models/Content');
const cors = require('cors')


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Multer file upload
app.use('/uploads', express.static('uploads'));

/** Content seeder */
const contentSeeder = [
    {
        title: "Privacy Policy",
        content: "This is privacy policy.",
        type: "privacy_policy"
    },
    {
        title: "Terms and Conditions",
        content: "This is terms and conditions.",
        type: "terms_and_conditions"
    }
];
const dbSeed = async () => {
    await Content.deleteMany({});
    await Content.insertMany(contentSeeder);
}
dbSeed().then( () => {
    // mongoose.connection.close();
})

const PORT =process.env.PORT 

app.use('/api', apiRoutes)

mongoose.connect(
    process.env.DB_CONNECT,{
        useUnifiedTopology :true,
        useNewUrlParser : true
    }, () => console.log('Database Connected')
)

app.listen(PORT, ()=> console.log(`server is running on ${PORT} port.`))