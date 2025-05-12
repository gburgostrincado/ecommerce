import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentController = {
  processPayment: async (req, res) => {
    const { cart } = req.body;
    const ammount = cart.reduce((acc, product) => acc + Number(product.price) * product.quantity, 0);
    const amountInCents = Number(ammount);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "clp",
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Error al crear el PaymentIntent" });
    }

  },
}

export default paymentController;