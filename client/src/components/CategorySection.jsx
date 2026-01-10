import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CategorySection = ({ categories }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group bg-white py-6 shadow-sm mb-4">
            <div className="max-w-screen-2xl mx-auto px-4 relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                    <FiChevronLeft className="w-6 h-6" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex space-x-8 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((cat, idx) => (
                        <Link key={idx} to={`/search?category=${cat.name}`}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center flex-shrink-0 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <div className="w-20 h-20 rounded-full bg-gray-100 mb-2 overflow-hidden border border-gray-200">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-medium">{cat.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <FiChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default CategorySection;
