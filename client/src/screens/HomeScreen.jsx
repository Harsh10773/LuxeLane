import { categories, offers, products } from '../data';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import CategorySection from '../components/CategorySection';
import { motion } from 'framer-motion';

const HomeScreen = () => {
    // Filter functions for sections
    const bestSellers = products.filter(p => p.bestseller);
    const electronics = products.filter(p => p.category === 'Electronics');
    const home = products.filter(p => p.category === 'Home');

    return (
        <div className="bg-gray-100 pb-12">
            {/* Full width Hero Slider */}
            <HeroSlider slides={offers} />

            {/* Main Content Area - Overlapping slightly with hero if we wanted, but standard stacking for now */}
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">

                {/* Category Horizontal Scroll */}
                <CategorySection categories={categories} />

                <div className="space-y-12 mt-8">

                    {/* Section: Best Sellers (Grid) */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Best Sellers in Electronics & Home</h2>
                            <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {bestSellers.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </section>

                    {/* Banner Ad Middle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-lg overflow-hidden shadow-md cursor-pointer"
                    >
                        <img src="https://images.unsplash.com/photo-1555487505-8603a1a69755?auto=format&fit=crop&w=1600&q=80" alt="Special Offer" className="w-full h-48 sm:h-64 object-cover" />
                    </motion.div>

                    {/* Section: Recommended for You (Grid) */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
                            <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
