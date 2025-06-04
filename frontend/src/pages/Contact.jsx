import React from 'react';
import { assets } from '../assets/assets';
import NewsLatterBox from '../components/NewsLatterBox';
import Title from '../components/Title';

function Contact() {
    return (
        <div className="px-4 md:px-10">
            {/* Title Section */}
            <div className="text-center text-2xl pt-10 border-t">
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            {/* Contact Information Section */}
            <div className="my-10 flex flex-col items-center justify-center gap-10 mb-28 md:flex-row">
                {/* Increased Image Height */}
                <img className="w-full max-w-xs h-80 object-cover rounded-lg shadow-lg md:max-w-[480px]" src={assets.contact_img1} alt="Contact Image" />

                {/* Store Information Box with adjusted height */}
                <div className="flex flex-col justify-between items-start gap-6 p-6 border border-gray-200 rounded-lg shadow-lg bg-white h-80">
                    <div>
                        <p className="font-semibold text-2xl text-gray-800">Our Store</p>
                        <p className="text-gray-500">
                         iet lucknow <br />
                           lucknow, UP
                        </p>
                        <p className="text-gray-500">
                            📞 +91 9569633102<br />
                            ✉️yashrana097@gmail.com <br />
                            
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-gray-800">Careers at Forever</p>
                        <p className="text-gray-500">Learn more about our team and job openings.</p>
                    </div>
                    <button className="border border-gray-800 px-8 py-3 text-sm font-semibold text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out">
                        Explore Jobs
                    </button>
                </div>
            </div>

            {/* Newsletter Section */}
            <NewsLatterBox />
        </div>
    );
}

export default Contact;
