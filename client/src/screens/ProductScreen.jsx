import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { FiCheck, FiShoppingCart, FiStar, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { useState } from 'react';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => p._id === id);
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);

    if (!product) {
        return <div className="text-center py-20 text-2xl">Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, Number(qty));
        navigate('/cart');
    };

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Breadcrumb - Mock */}
            <div className="max-w-screen-2xl mx-auto px-4 py-4 text-sm text-gray-500">
                <span className="hover:underline cursor-pointer">Back to results</span>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-10">
                {/* Image Section (4 cols) */}
                <div className="lg:col-span-4 flex justify-center bg-gray-50 p-6 rounded-lg border sticky top-24 h-fit">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-[500px] object-contain mix-blend-multiply"
                    />
                </div>

                {/* Details Section (3 cols) */}
                <div className="lg:col-span-3 space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                        {product.name}
                    </h1>
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <FiStar key={i} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-blue-600 hover:underline cursor-pointer">{product.reviews} ratings</span>
                    </div>
                    <div className="border-t border-b py-4 space-y-2">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-red-600 text-xl font-light">-{product.discount}%</span>
                            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        </div>
                        {product.oldPrice && (
                            <p className="text-gray-500 text-sm">List Price: <span className="line-through">${product.oldPrice}</span></p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold">About this item</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            <li>{product.description}</li>
                            <li>Generic feature placeholder for demonstration.</li>
                            <li>Another feature bullet point to make it look realistic.</li>
                        </ul>
                    </div>
                </div>

                {/* Buy Box Section (2 cols) */}
                <div className="lg:col-span-2">
                    <div className="border rounded-lg p-5 shadow-sm space-y-4">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        <div className="text-sm">
                            <span className="text-gray-500">ImPort Fees Deposit Included</span>
                            <br />
                            <span className="text-blue-600">FREE Delivery</span>
                        </div>
                        <div className="text-lg text-green-600 font-medium">
                            <FiCheck className="inline" /> In Stock
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm">Qty:</label>
                            <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                className="border rounded-md shadow-sm p-1"
                            >
                                {[...Array(product.countInStock > 0 ? (product.countInStock > 10 ? 10 : product.countInStock) : 1).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-full font-medium transition shadow-sm"
                        >
                            Add to Cart
                        </button>
                        <button className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 py-2 rounded-full font-medium transition shadow-sm">
                            Buy Now
                        </button>

                        <div className="text-xs text-gray-500 space-y-1 pt-2">
                            <div className="grid grid-cols-2">
                                <span>Ships from</span> <span>LuxeLane</span>
                            </div>
                            <div className="grid grid-cols-2">
                                <span>Sold by</span> <span>LuxeLane</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
