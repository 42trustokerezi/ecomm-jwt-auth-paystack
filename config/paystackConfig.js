const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API = axios.create({baseURL: 'https://api.paystack.co/transaction'});

API.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${process.env.PAYSTACK_TEST_SECRET}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const paystack = ()=> {
    const initializePayment = async ({first_name, last_name, email, amount}, callback)=> {
        try{
            const response = await API.post('/initialize', {first_name, last_name, email, amount});
            return callback(response);
        }
        catch(err){
            console.error(error)
        }
    }

    const verifyPayment = async (ref, callback) => {
        try{
            const response = await API.get(`${encodeURIComponent(ref)}`);
            return callback(response);
        }
        catch(err){
            console.log(err)
        }
    }
    return { initializePayment, verifyPayment }
}

module.exports = paystack;