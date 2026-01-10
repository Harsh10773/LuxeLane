import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const CartScreen = () => {
    const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const updateQty = (item, newQty) => {
        if (newQty > 0) {
            addToCart(item, Number(newQty));
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-3 bg-white p-6 rounded shadow-sm">
                    <h1 className="text-2xl font-medium border-b pb-4 mb-4">Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="py-8">
                            Your cart is empty. <Link to="/" className="text-blue-600 hover:underline">Shop now</Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-none">
                                    <div className="w-full sm:w-48 h-48 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-grow">
                                        <Link to={`/product/${item.product}`} className="text-lg font-medium hover:text-blue-600 hover:underline line-clamp-2">
                                            {item.name}
                                        </Link>
                                        <div className="text-sm text-green-600 mt-1">In Stock</div>
                                        <div className="text-xs text-gray-500 mt-1">Eligible for FREE Shipping</div>

                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="flex items-center border rounded shadow-sm bg-gray-50">
                                                <span className="px-2 text-sm text-gray-600">Qty:</span>
                                                <select
                                                    value={item.qty}
                                                    onChange={(e) => updateQty(item, e.target.value)}
                                                    className="bg-transparent py-1 px-1 focus:outline-none"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => (
                                                        <option key={x} value={x}>{x}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="h-4 border-l border-gray-300"></div>
                                            <button
                                                onClick={() => removeFromCart(item.product)}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right font-bold text-lg">
                                        ${item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Subtotal / Checkout Box */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded shadow-sm sticky top-24">
                        <div className="text-lg mb-4">
                            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): <span className="font-bold">${cartTotal}</span>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            disabled={cartItems.length === 0}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartScreen;
