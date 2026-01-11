import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

const SearchScreen = () => {
    const { keyword } = useParams();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const [sortBy, setSortBy] = useState('featured');
    const [minRating, setMinRating] = useState(0);
    const [priceRange, setPriceRange] = useState([0, Infinity]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (keyword) {
            const lowerKeyword = keyword.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerKeyword) ||
                p.description.toLowerCase().includes(lowerKeyword) ||
                p.category.toLowerCase().includes(lowerKeyword)
            );
        }

        if (category) {
            result = result.filter(p => p.category === category);
        }

        if (minRating > 0) {
            result = result.filter(p => p.rating >= minRating);
        }

        if (priceRange[0] !== 0 || priceRange[1] !== Infinity) {
            result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        }

        // Sorting
        if (sortBy === 'priceLow') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHigh') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [keyword, category, sortBy, minRating, priceRange]);

    return (
        <div className="min-h-screen bg-white">
            <div className="shadow-sm border-b py-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-bold text-sm">
                    {filteredProducts.length} results {keyword && `for "${keyword}"`} {category && `in ${category}`}
                </span>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded p-1 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="featured">Sort by: Featured</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                </select>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="lg:w-60 flex-shrink-0 space-y-6">
                    <div>
                        <h3 className="font-bold text-sm mb-2">Avg. Customer Review</h3>
                        <div className="space-y-1">
                            {[4, 3, 2, 1].map(star => (
                                <div
                                    key={star}
                                    onClick={() => setMinRating(star)}
                                    className={`flex items-center gap-1 text-sm cursor-pointer ${minRating === star ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                                >
                                    <span className="flex text-yellow-500 text-lg">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < star ? "text-yellow-500" : "text-gray-300"}>★</span>
                                        ))}
                                    </span>
                                    <span>& Up</span>
                                </div>
                            ))}
                            <button onClick={() => setMinRating(0)} className="text-xs text-blue-600 hover:underline mt-1 bg-transparent border-none cursor-pointer">Clear</button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm mb-2">Price</h3>
                        <ul className="text-sm space-y-2 text-gray-600">
                            {[
                                { label: 'Any Price', range: [0, Infinity] },
                                { label: 'Under $25', range: [0, 25] },
                                { label: '$25 to $50', range: [25, 50] },
                                { label: '$50 to $100', range: [50, 100] },
                                { label: '$100 & Above', range: [100, Infinity] },
                            ].map(({ label, range }) => (
                                <li
                                    key={label}
                                    onClick={() => setPriceRange(range)}
                                    className={`cursor-pointer hover:text-black ${JSON.stringify(priceRange) === JSON.stringify(range) ? 'font-bold text-black' : ''}`}
                                >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-xl font-bold mb-2">No results found</h2>
                            <p className="text-gray-500">Try checking your spelling or use different keywords.</p>
                            <button
                                onClick={() => { setMinRating(0); setPriceRange([0, Infinity]); setSortBy('featured'); }}
                                className="mt-4 text-blue-600 hover:underline font-medium bg-transparent border-none cursor-pointer"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchScreen;
