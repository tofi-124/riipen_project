import { getDomainLocale } from 'next/dist/shared/lib/router/router';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const {  subtotal } = req.body;
// console.log("Hello",items)
console.log("subtotal", subtotal);
  const redirectURL = 'http://localhost:3000';
  const successredirectURL = 'http://localhost:3000/captureOrder';
  const transformedItem = {
    price_data: {
      currency: 'cad',
    product_data: {
      name: "Neema"
    },
      unit_amount: subtotal.raw * 100,
   
    },

    quantity: 1,
   
  };
console.log(transformedItem);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    // amount: subtotal,
    mode: 'payment',
    success_url: successredirectURL + '?status=success',
    cancel_url: redirectURL + '?status=cancel',
   
  });
  // res.send({
  //   clientSecret: paymentIntent.client_secret,
  // });
  res.json({ id:session.id });

}

export default CreateStripeSession;