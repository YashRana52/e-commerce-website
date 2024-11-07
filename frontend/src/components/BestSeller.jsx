import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItems';
import Title from './Title';
function BestSeller() {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products) { // Check if products is defined
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.slice(8, 13));
            console.log(bestProduct);
            
        }
    }, [products]); // Include products in the dependency array

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Discover our Best Sellers—customer favorites that you won’t want to miss!
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        name={item.name} 
                        image={item.image} 
                        price={item.price} 
                    />
                ))}
            </div>
        </div>
    );
}

export default BestSeller;
