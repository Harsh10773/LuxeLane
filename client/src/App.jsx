import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, createSearchParams } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';
import { FiSearch, FiShoppingCart, FiMenu, FiMapPin, FiUser, FiChevronDown } from 'react-icons/fi';

// Modern Navbar with Functionality
const Navbar = () => {
    const { cartItems } = useCart();
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    const handleCategoryClick = (category) => {
        navigate({
            pathname: '/search',
            search: `?${createSearchParams({ category })}`,
        });
    };

    return (
        <header className="sticky top-0 z-50 flex flex-col">
            {/* Top Bar - Modern Teal-Purple Gradient */}
            <nav className="bg-gray-900 text-white py-3 px-4 shadow-lg order-1">
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">

                    {/* Brand & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <FiMenu className="w-6 h-6" />
                        </button>
                        <Link to="/" className="flex flex-col leading-none hover:opacity-90 transition-opacity">
                            <span className="text-2xl font-black tracking-tighter bg-gray-900 bg-clip-text">
                                LUXELANE
                            </span>
                            <span className="text-[10px] text-gray-400 tracking-widest uppercase ml-0.5">Premium Store</span>
                        </Link>
                    </div>

                    {/* Location (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1 text-sm text-gray-300 hover:text-white cursor-pointer transition min-w-fit">
                        <FiMapPin />
                        <div className="flex flex-col leading-none">
                            <span className="text-[10px] text-gray-400">Deliver to</span>
                            <span className="font-bold">New York 10001</span>
                        </div>
                    </div>

                    {/* Search Bar - Center */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-3xl hidden md:flex relative group mx-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-l-lg leading-5 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 transition-colors sm:text-sm"
                            placeholder="Search for products, brands and more..."
                        />
                        <button type="submit" className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 font-semibold transition-colors">
                            Search
                        </button>
                    </form>

                    {/* Right Icons */}
                    <div className="flex items-center gap-5 sm:gap-6 min-w-fit">
                        {userInfo ? (
                            <div className="relative group">
                                <button className="flex flex-col text-sm cursor-pointer hover:text-blue-300 transition leading-tight bg-transparent border-none text-white">
                                    <span className="text-[10px]">Hello, {userInfo.name}</span>
                                    <span className="font-bold flex items-center gap-1">Account & Lists <FiChevronDown /></span>
                                </button>
                                <div className="absolute top-full right-0 mt-1 w-48 bg-white text-gray-900 rounded shadow-xl overflow-hidden hidden group-hover:block border z-50">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 border-b no-underline text-gray-900">Your Account</Link>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left block px-4 py-2 hover:bg-gray-100 text-blue-600 font-bold bg-transparent border-none cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden md:flex flex-col text-sm cursor-pointer hover:text-blue-300 transition leading-tight">
                                <span className="text-[10px]">Hello, Sign in</span>
                                <span className="font-bold">Account & Lists</span>
                            </Link>
                        )}

                        <Link to="/orders" className="hidden md:flex flex-col text-sm cursor-pointer hover:text-blue-300 transition leading-tight">
                            <span className="text-[10px]">Returns</span>
                            <span className="font-bold">& Orders</span>
                        </Link>

                        <Link to="/cart" className="relative flex items-center gap-1 hover:text-blue-300 transition">
                            <div className="relative">
                                <FiShoppingCart className="w-8 h-8" />
                                <span className="absolute -top-1 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-teal-600">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            </div>
                            <span className="hidden lg:block font-bold mt-2 text-sm">Cart</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Sub-nav Category Strip */}
            <div className="bg-gray-900 text-white text-sm py-2 px-4 shadow-md overflow-x-auto whitespace-nowrap scrollbar-hide order-2">
                <div className="max-w-screen-2xl mx-auto flex space-x-6 items-center">
                    <button className="flex items-center gap-1 font-bold hover:text-blue-300 bg-transparent border-none text-white cursor-pointer"><FiMenu /> All</button>
                    {["Topics", "Today's Deals", "Electronics", "Fashion", "Home", "Mobiles", "Beauty"].map((item) => (
                        <button
                            key={item}
                            onClick={['Electronics', 'Fashion', 'Home', 'Mobiles', 'Beauty'].includes(item) ? () => handleCategoryClick(item) : undefined}
                            className="hover:text-blue-300 transition-colors bg-transparent border-none cursor-pointer text-white"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Search - Visible only on mobile */}
            <form onSubmit={handleSearch} className="md:hidden bg-[#1a1c32] p-3 pb-4 order-3 border-t border-white/10">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm shadow-sm"
                        placeholder="Search LuxeLane..."
                    />
                </div>
            </form>
        </header>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <CartProvider>
                    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomeScreen />} />
                                <Route path="/product/:id" element={<ProductScreen />} />
                                <Route path="/cart" element={<CartScreen />} />
                                <Route path="/checkout" element={<CheckoutScreen />} />
                                <Route path="/search/:keyword" element={<SearchScreen />} />
                                <Route path="/search" element={<SearchScreen />} />
                                <Route path="/login" element={<LoginScreen />} />
                                <Route path="/completion" element={
                                    <div className="flex items-center justify-center min-h-[50vh] flex-col">
                                        <h2 className="text-3xl font-bold mb-4">Thank you for your order!</h2>
                                        <Link to="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
                                    </div>
                                } />
                            </Routes>
                        </main>
                        <footer className="bg-[#232f3e] text-gray-300">
                            <div
                                className="bg-[#37475a] py-4 text-center hover:bg-[#485769] cursor-pointer text-sm font-medium transition-colors"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Back to top
                            </div>
                            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                                <div>
                                    <h4 className="font-bold text-white mb-4">Get to Know Us</h4>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="hover:underline">Careers</a></li>
                                        <li><a href="#" className="hover:underline">Blog</a></li>
                                        <li><a href="#" className="hover:underline">About LuxeLane</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-4">Make Money with Us</h4>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="hover:underline">Sell products</a></li>
                                        <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-4">Payment Products</h4>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="hover:underline">Business Card</a></li>
                                        <li><a href="#" className="hover:underline">Shop with Points</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-4">Let Us Help You</h4>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="hover:underline">Your Account</a></li>
                                        <li><a href="#" className="hover:underline">Your Orders</a></li>
                                        <li><a href="#" className="hover:underline">Help</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-gray-700 py-8 text-center text-xs">
                                &copy; 2024 LuxeLane, Inc. or its affiliates
                            </div>
                        </footer>
                    </div>
                </CartProvider>
            </Router>
        </AuthProvider>
    );
}

export default App;
