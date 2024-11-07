import React from 'react';

function NewsLatterBox() {
    const onSubmitHandler = (e)=>{
        e.preventDefault();


    }
    return (
       <div className='text-center'>
        <p className='text-2xl font-medium text-gray-700'>Subscribe now & get 30% off</p>
        <p className='text-gray-400 mt-3'>
        Don't miss out—sign up today and be the first to know about our exciting updates!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' >
            <input className='w-full sm:flex-1 outline-none' type="email"placeholder='Enter your Email'required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>

       </div> 
    )
}

export default NewsLatterBox
