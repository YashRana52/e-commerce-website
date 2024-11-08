import React from 'react';
import { assets } from '../assets/assets';

function Hero() {
    return (
        <div className="flex flex-col sm:flex-row items-center border border-gray-300 shadow-lg rounded-lg overflow-hidden my-10"> {/* Adjusted margin for more spacing */}
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex flex-col items-center justify-center p-16 bg-gray-100"> {/* Increased padding */}
                <div className="text-gray-800 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                        <div className="w-8 md:w-11 h-[2px] bg-gray-700"></div>
                        <p className="font-medium text-sm md:text-base uppercase tracking-wide">Our Bestseller</p>
                    </div>

                    <h1 className="font-serif text-4xl lg:text-5xl leading-snug text-gray-900">Latest Arrivals</h1>

                    <div className="flex items-center gap-2 justify-center sm:justify-start mt-4">
                        <p className="font-semibold text-base md:text-lg cursor-pointer hover:underline hover:text-gray-700 transition-colors duration-300">Shop Now</p>
                        <div className="w-8 md:w-11 h-[1px] bg-gray-700"></div>
                    </div>
                </div>
            </div>
            
            {/* Hero Right Side with Increased Image Height */}
            <div className="w-full sm:w-1/2 flex justify-center">
                <img className="w-auto h-[400px] object-contain" src={assets.hero3} alt="Latest Arrivals" /> {/* Increased image height */}
            </div>
        </div>
    );
}

export default Hero;
