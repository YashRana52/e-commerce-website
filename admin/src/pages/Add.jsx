import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

function Add({ token }) {
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [bestSeller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestSeller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product/add" , formData, { headers: { token } })
            console.log(response.data);
            
            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
              
                
            }
            else{
              toast.error(response.data.message)
            }
          
        } catch (error) {
            console.error("Error adding product:", error)
            toast.error(error.message)
        }
    }

    return (
       <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
                        <label htmlFor={`image${index + 1}`} key={index}>
                            <img
                                className='w-20'
                                src={!eval(`image${index + 1}`) ? assets.upload_area : URL.createObjectURL(eval(`image${index + 1}`))}
                                alt=""
                            />
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id={`image${index + 1}`} hidden />
                        </label>
                    ))}
                </div>
            </div>
            {/* Product Name Input */}
            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full border max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
            </div>
            {/* Product Description Input */}
            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full border max-w-[500px] px-3 py-2' placeholder='Write content here' required />
            </div>
            {/* Category, Subcategory, and Price Fields */}
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">BottomWear</option>
                        <option value="Winterwear">WinterWear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
                </div>
            </div>
            {/* Product Sizes */}
            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    {["S", "M", "L", "XL", "XXL"].map(size => (
                        <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                            <p className={`${sizes.includes(size) ? 'bg-pink-200' : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Bestseller Checkbox */}
            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>
            {/* Submit Button */}
            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
       </form>
    )
}

export default Add
