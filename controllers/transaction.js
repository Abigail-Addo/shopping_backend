const Transaction = require('../model/transaction')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.paymentIntent = async (req, res) => {
    const {  amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            automatic_payment_methods: { enabled: true },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
        
    } catch (error) {
        return res.status(400).send({ error: { message: error.message } });
    }
}

exports.paymentConfig = async (req, res) => {
    try {
        res.send({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    } catch (error) {
        return res.status(400).send({ error: { message: error.message } });
    }

}
