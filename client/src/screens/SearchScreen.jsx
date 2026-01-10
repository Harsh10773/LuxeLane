import { useParams, useSearchParams } from 'react-router-dom';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

const SearchScreen = () => {
    const { keyword } = useParams();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    let filteredProducts = products;

    if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(lowerKeyword) ||
            p.description.toLowerCase().includes(lowerKeyword) ||
            p.category.toLowerCase().includes(lowerKeyword)
        );
    }

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="shadow-sm border-b py-3 px-4 flex items-center justify-between">
                <span className="font-bold text-sm">
                    {filteredProducts.length} results {keyword && `for "${keyword}"`} {category && `in ${category}`}
                </span>
                <select className="border rounded p-1 text-sm bg-gray-50">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Avg. Customer Review</option>
                </select>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 py-6 flex gap-8">
                {/* Sidebar Filters (Mock) */}
                <div className="hidden lg:block w-60 flex-shrink-0 space-y-6">
                    <div>
                        <h3 className="font-bold text-sm mb-2">Department</h3>
                        <ul className="text-sm space-y-1 text-gray-600 pl-2">
                            {['Electronics', 'Computers', 'Smart Home', 'Arts & Crafts'].map(c => (
                                <li key={c} className="hover:text-black cursor-pointer">{c}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm mb-2">Avg. Customer Review</h3>
                        <div className="space-y-1">
                            {[4, 3, 2, 1].map(star => (
                                <div key={star} className="flex items-center gap-1 text-sm hover:text-blue-600 cursor-pointer">
                                    <span className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < star ? "fill-current text-yellow-500" : "text-gray-300"}>★</span>
                                        ))}
                                    </span>
                                    <span>& Up</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm mb-2">Price</h3>
                        <ul className="text-sm space-y-1 text-gray-600 pl-2">
                            <li className="hover:text-black cursor-pointer">Under $25</li>
                            <li className="hover:text-black cursor-pointer">$25 to $50</li>
                            <li className="hover:text-black cursor-pointer">$50 to $100</li>
                            <li className="hover:text-black cursor-pointer">$100 & Above</li>
                        </ul>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-xl font-bold mb-2">No results found</h2>
                            <p className="text-gray-500">Try checking your spelling or use different keywords.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
