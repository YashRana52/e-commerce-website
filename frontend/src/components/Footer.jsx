import React from 'react';
import { assets } from '../assets/assets';

function Footer() {
    return (
        <footer className=" text-gray-800 py-12">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 max-w-6xl mx-auto px-5">
                
                {/* Logo and Description */}
                <div className="flex flex-col items-start">
                    <img src={assets.logo3} className="mb-5 w-32" alt="Company Logo" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
                    We enhance your lifestyle with high-quality products and exceptional service.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <p className="font-raleway text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li><a href="/" className="hover:text-gray-800 transition-colors duration-300">Home</a></li>
                        <li><a href="/about" className="hover:text-gray-800 transition-colors duration-300">About</a></li>
                        <li><a href="/delivery" className="hover:text-gray-800 transition-colors duration-300">Delivery</a></li>
                        <li><a href="/privacy" className="hover:text-gray-800 transition-colors duration-300">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <p className="font-raleway text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li className="flex items-center gap-2">
                            <span role="img" aria-label="phone">📞</span> +91 7084449164
                           
                        </li>
                        <li className="flex items-center gap-2">
                            <span role="img" aria-label="phone">📞</span> +91 7084449164
                           
                        </li>
                        <li className="flex items-center gap-2">
                            <span role="img" aria-label="email">✉️</span>guptaarpit168@gmail.com
                        </li>
                        <li className="flex items-center gap-2">
    <img 
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
        alt="Instagram Logo" 
        className="w-5 h-5" 
    />
   arpit _hindu_45
</li>

                    </ul>
                </div>
            </div>
            
            {/* Footer Bottom */}
            <div className="mt-10 border-t border-gray-300 pt-5 text-center">
                <p className="text-sm text-gray-500">
                    © 2025 arpitgupta. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
