import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

function Cart() {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    
    const [cartData, setCartData] = useState([]);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        if (products.length >0) {
             // Generate cartData by mapping `cartItems` with the corresponding product data from `products`
        const tempData = [];
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    tempData.push({
                        _id: items,
                        size: size,
                        quantity: cartItems[items][size]
                    });
                }
            }
        }
        setCartData(tempData);
            
        }
       
    }, [cartItems, products]); 

    const handleRemoveItem = (id, size) => {
        updateQuantity(id, size, 0);
        setNotification("Item removed from cart!");
        setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    };

    return (
        <div className='border-t pt-14'>
            {notification && (
                <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded-md shadow-lg">
                    {notification}
                </div>
            )}
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>
            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null; // Skip if product data is missing

                    return (
                        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p>{currency}{productData.price}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input
                                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                            />
                            <img 
                                onClick={() => handleRemoveItem(item._id, item.size)} 
                                className='w-4 mr-4 sm:w-5 cursor-pointer'
                                src={assets.bin_icon} 
                                alt="Remove Item"
                            />
                            <div className='max-w-10 sm:max-w-20 px-1 py-0.5'> 
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='flex flex-col justify-end my-10'>
                <div className='w-full sm:w-[450px] mx-auto'>
                    <CartTotal/>
                    <div className='w-full text-center mt-4'>
                        <button onClick={()=>  navigate('/place-order')} className='bg-black text-white text-sm py-3 px-6 rounded-md hover:bg-gray-800 transition-colors'>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
