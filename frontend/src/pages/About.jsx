import React from 'react'
import { assets } from '../assets/assets'
import NewsLatterBox from '../components/NewsLatterBox'

function About() {
    return (
        <div>
         <div className='text-2xl text-center pt-8 border-t border-gray-300'>
    <h2 className='font-bold text-gray-800 mb-2'>ABOUT <span className='text-blue-600'>{'US'}</span></h2>
    <div className='w-16 h-1 bg-blue-600 mx-auto mb-4'></div>
</div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
    <img className='w-full md:max-w-[450px] rounded-lg shadow-lg' src={assets.about_img1} alt="About Us" />
    <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p className='bg-gray-100 p-4 rounded-lg shadow-md'>
            We are dedicated to providing exceptional online shopping experiences. Our mission is to curate a wide range of high-quality products, ensuring customer satisfaction at every step. With a user-friendly interface and secure payment options, we strive to make shopping easy and enjoyable. Our passionate team is committed to innovation and excellence, continuously improving our services to meet the needs of our valued customers. Join us in exploring the latest trends and exclusive deals!
        </p>
        <p className='bg-gray-100 p-4 rounded-lg shadow-md'>
            We believe in the power of community and connection. Our mission is to enhance your shopping experience by offering a curated selection of products that inspire and delight. With a commitment to quality and customer satisfaction, our dedicated team works tirelessly to bring you the latest trends and timeless essentials. We are not just a store; we are a destination where every visit feels personal. Thank you for being part of our journey!
        </p>
        <b className='text-gray-800 text-lg font-semibold'>Our Mission</b>
        <p className='bg-gray-100 p-4 rounded-lg shadow-md'>
            We are dedicated to transforming your wardrobe with stylish, high-quality clothing that fits every occasion. Our mission is to provide a diverse range of fashionable apparel while ensuring a seamless online shopping experience. We believe in empowering individuals to express their unique identities through fashion, offering exceptional customer service and sustainable practices to make a positive impact on the world.
        </p>
    </div>
</div>

<div className='text-xl py-4 text-center'>
    <h2 className='font-bold text-gray-800 mb-2'>WHY <span className='text-blue-600'>{'CHOOSE US'}</span></h2>
    <div className='w-24 h-1 bg-blue-600 mx-auto mb-4'></div>
    <p className='text-gray-600'>Discover the benefits of shopping with us and why we stand out in the online marketplace.</p>
</div>

            <div className='flex flex-col md:flex-row text-sm mb-20 space-y-5 md:space-y-0 md:space-x-5'>
    <div className='border rounded-lg shadow-md bg-white px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transition-transform transform hover:scale-105'>
        <b className='text-lg font-semibold text-gray-800'>Quality Assurance:</b>
        <p className='text-gray-700'>Our website guarantees a secure shopping experience through thorough Quality Assurance, ensuring that every page is reliable and your data remains safe.</p>
    </div>
    <div className='border rounded-lg shadow-md bg-white px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transition-transform transform hover:scale-105'>
        <b className='text-lg font-semibold text-gray-800'>Convenience:</b>
        <p className='text-gray-700'>Our website offers easy navigation, fast checkout, and secure payments for a simple and enjoyable shopping experience.</p>
    </div>
    <div className='border rounded-lg shadow-md bg-white px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 transition-transform transform hover:scale-105'>
        <b className='text-lg font-semibold text-gray-800'>Exceptional Customer Service:</b>
        <p className='text-gray-600'>We're here to make your shopping experience enjoyable. Our friendly team is just a message away to help with any questions and ensure your satisfaction.</p>
    </div>
</div>
<NewsLatterBox/>

        </div>
    )
}

export default About
