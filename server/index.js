import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const stripe = new Stripe(
  'sk_test_51QoffLBMdU55yI9E70qEi70I03rlyHaDb185roAXhYhVQZVTqLFrYXV6CvmjxRv0Nw5j4fUh7wE6oJnU9UQNGrNe00dL5w5klA',
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post('/payment', cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Spatula company',
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is listening on port 4000');
});
