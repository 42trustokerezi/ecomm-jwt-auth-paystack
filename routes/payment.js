const router = require('express').Router();
const Transaction = require('../models/Transaction');
const { verifyToken } = require('./verifyToken')

const paystack = require('../config/paystackConfig');

const {initializePayment, verifyPayment} = paystack();

router.post('/pay',verifyToken, async (req, res) => {
    const { first_name, last_name, email, amount: amount } = req.body;

    try{
        await initializePayment({first_name, last_name, email, amount: amount * 100},
            response => {
                res.json({ paystack_url: response.data.data.authorization_url });
            });
    }catch(err){
        console.log(err)
    }
})

router.get('/callback', async (req, res) => {
    const ref = req.query.reference;

    try{
        await verifyPayment(ref, (response) => {
            const {status, reference, currency, amount, customer} = response.data.data;

            const {first_name, last_name, email,} = customer;

            const newTransaction = new Transaction({
                transactionType: "credit",
                customerName: `${first_name} ${last_name}`,
                customerEmail: email,
                amount: amount / 100,
                currency,
                reference,
                paymentStatus: status,
                paymentGateway: "paystack",
            });

            newTransaction.save();
        })
    }catch (err) {
        console.error(err);
    }
})

module.exports = router;
