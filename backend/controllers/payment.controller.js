import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: "2024-06-20" });
export const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Buy me a coffee ☕",
              description: "Support the writer",
            },
            unit_amount: 100 * 12, //$12.00 dollars
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/paymentResult?status=success",
      cancel_url: "http://localhost:5173/paymentResult?status=failed",
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error: ", err.message);
    res.status(500).json({ error: "Failed to create Stripe session." });
  }
};
