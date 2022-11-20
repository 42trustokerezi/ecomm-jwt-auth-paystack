const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user.js');
const authRoute = require('./routes/auth.js');
const productsRoute = require('./routes/product.js');
const cartRoute = require('./routes/cart.js');
const orderRoute = require('./routes/order.js');
const paymentRoute = require('./routes/payment.js');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log("DB connection Successfull"))
    .catch((err)=> console.log(err));
    
app.use(express.json());
/** routes */
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productsRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("api/payment", paymentRoute);


app.listen( 5000, ()=> {
    console.log('listening on port 5000')
})