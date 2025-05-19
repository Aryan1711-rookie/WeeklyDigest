import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripeLoad = loadStripe("pk_test_51RQLsV2aweYi4iPypMPCV1T2KKJ2F5ALVALAC8r7PCQEqBLfYrWaqz0tkKbPP5f6buaocMTMDUnlFMwiLce8ckWA00v0j7wePY");

const Payment = () => {
    const navigate = useNavigate();
    const handleBuyMeACoffee = async () => {

        try {

            const stripe = await stripeLoad;
            const response = await axios.post('https://weeklydigest-4mry.onrender.com/api/v1/blog/payment', {}, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { id } = await response.data;

            const paymentResult = await stripe.redirectToCheckout({ sessionId: id });

            if (!paymentResult.error) {
                toast.error(`Payment error: ${result.error.message}`);
                navigate('/paymentResult?status=failed');
            }


        } catch (error) {
            console.log(error);
            toast.error(`Payment initiation failed: ${error.message}`);
            navigate('/paymentResult?status=failed');
        }

    };

    return (
        <div className="w-full">
            {/* <h1 className="text-sm font-semibold mb-4 text-green-700 font-serif text-center"> Liked the story!!! </h1> */}
            <button
                onClick={handleBuyMeACoffee}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#006241] hover:bg-[#004d32] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                    alt="Starbucks"
                    className="h-6 w-auto"
                />
                <span>Buy me a coffee</span>
            </button>
            <ToastContainer position="top-right" autoClose={4000} />
        </div>

    )
};
export default Payment;