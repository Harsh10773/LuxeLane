import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';

// Initialize Stripe outside of component render to avoid recreating Stripe object
const stripePromise = loadStripe('pk_test_your_publishable_key_here');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" />
            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 font-semibold"
            >
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
            {message && <div id="payment-message" className="text-red-500 text-sm mt-2">{message}</div>}
        </form>
    );
};

const CheckoutScreen = () => {
    const { cartTotal } = useCart();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // Note: In production you should pass the exact amount from backend calculation
        // calculated from the order items, not just trusted from frontend
        fetch('http://localhost:5000/api/orders/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: Math.round(cartTotal * 100) || 1000 }), // Amount in cents
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [cartTotal]);

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#000000',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Secure Checkout</h1>

                <div className="mb-8">
                    <p className="text-gray-500 mb-1">Total Due</p>
                    <p className="text-4xl font-extrabold text-gray-900">${cartTotal}</p>
                </div>

                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default CheckoutScreen;
