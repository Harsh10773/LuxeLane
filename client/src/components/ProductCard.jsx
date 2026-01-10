import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative"
        >
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {product.bestseller && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                        #1 Best Seller
                    </span>
                )}
                {product.discount > 0 && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                    </span>
                )}
            </div>

            <button className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors">
                <FiHeart className="w-5 h-5" />
            </button>

            <Link to={`/product/${product._id}`} className="relative p-6 h-64 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors block">
                <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2 flex items-center text-yellow-400 text-sm">
                    <FiStar className="fill-current" />
                    <span className="ml-1 text-gray-600 font-medium">{product.rating}</span>
                    <span className="ml-1 text-gray-400">({product.reviews})</span>
                </div>

                <Link to={`/product/${product._id}`}>
                    <h3 className="text-gray-900 font-medium line-clamp-2 mb-1 hover:text-blue-600 cursor-pointer">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-gray-500 text-xs mb-3 line-clamp-1">{product.description}</p>

                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">
                            <span className="text-sm font-normal align-top">$</span>{Math.floor(product.price)}<span className="text-sm font-normal align-top">.{(product.price % 1).toFixed(2).substring(2)}</span>
                        </span>
                        {product.oldPrice && (
                            <span className="text-xs text-gray-500 line-through">
                                ${product.oldPrice}
                            </span>
                        )}

                        {/* Prime-like mockery */}
                        {product.price > 50 && (
                            <span className="text-[10px] text-blue-600 font-bold flex items-center mt-1">
                                <span className="bg-blue-600 text-white px-1 rounded mr-1 italic">Prime</span>
                                FREE Delivery
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => addToCart(product, 1)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                        Add <FiShoppingCart />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
