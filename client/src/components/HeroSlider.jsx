import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
    const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mb-8">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 w-full h-full ${slides[current].bg} flex items-center`}
                >
                    {/* Content container overlaying the background */}
                    <div className="max-w-screen-2xl w-full mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 text-white">
                        <div className="space-y-4 md:space-y-6">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm"
                            >
                                Limited Time Offer
                            </motion.span>
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl font-extrabold leading-tight"
                            >
                                {slides[current].title}
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-2xl text-white/90"
                            >
                                {slides[current].description}
                            </motion.p>
                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white text-black px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors"
                            >
                                Shop Now
                            </motion.button>
                        </div>
                        {/* Image side - only visible on md+ screens to separate text from image visually */}
                        <div className="hidden md:flex justify-end relative h-full items-center">
                            <motion.img
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                src={slides[current].image}
                                alt={slides[current].title}
                                className="max-h-[350px] object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Background Overlay for mobile text readability if image fits cover */}
                    <div className="absolute inset-0 bg-black/30 md:bg-transparent pointer-events-none" />

                    {/* If we wanted the image to be the literal background instead of split layout used above:
           <img src={slides[current].image} className="absolute inset-0 w-full h-full object-cover -z-10" /> 
           But I chose split layout for 'graphics' feel */}
                </motion.div>
            </AnimatePresence>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-all text-white">
                <FiChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-all text-white">
                <FiChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
