import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal() { 
    const { currency, deliver_fee, getCartAmount } = useContext(ShopContext); 
    const subtotal = getCartAmount(); 
    const shippingFee = subtotal === 0 ? 0 : deliver_fee; 
    const total = subtotal + shippingFee; 

    return ( 
        <div className='w-full bg-white shadow-lg p-5 rounded-md'>
            <div className=' text-2xl mb-3'> 
                <Title  text1={'CART'} text2={'TOTALS'} /> 
            </div> 
            <div className='flex flex-col gap-2 mt-2 text-sm'> 
                <div className='flex justify-between'> 
                    <p>SubTotal</p> 
                    <p>{currency} {subtotal}.00</p> 
                </div> 
                <hr /> 
                <div className='flex justify-between'> 
                    <p>Shipping Fee</p> 
                    <p>{currency} {shippingFee}</p> 
                </div> 
                <hr /> 
                <div className='flex justify-between'> 
                    <b>Total</b> 
                    <b>{currency} {total}</b> 
                </div> 
            </div> 
        </div> 
    ); 
} 

export default CartTotal;
