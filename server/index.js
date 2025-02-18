import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';
import cloudinary from 'cloudinary';

const app = express();
dotenv.config();

cloudinary.v2.config({
  cloud_name: 'dkftturzq',
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post('/stripe-login', async (req, res) => {
  const { email, name } = req.body;

  try {
    const customers = await stripe.customers.list({ email });
    let customer = customers.data.length > 0 ? customers.data[0] : null;
    if (!customer) {
      customer = await stripe.customers.create({
        email,
        name,
        description: 'Customer for ' + email,
      });
    }
    res.json({
      success: true,
      customerId: customer.id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Stripe login failed' });
  }
});

app.post('/payment', cors(), async (req, res) => {
  let { amount, id, name, email, model, stripeCustomerId } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: model,
      payment_method: id,
      confirm: true,
      customer: stripeCustomerId,
      metadata: {
        name: name,
        email: email,
      },
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

app.post('/delete-car-img', async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res
        .status(400)
        .json({ success: false, message: 'No public_id provided' });
    }

    const result = await cloudinary.v2.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({ success: true, message: 'Image deleted successfully' });
    } else {
      res
        .status(500)
        .json({ success: false, message: 'Failed to delete image' });
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the image',
    });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is listening on port 4000');
});
