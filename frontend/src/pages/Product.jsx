import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { ShopContext } from "../context/ShopContext";

function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { backendUrl, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [notification, setNotification] = useState("");

  // Fetch product data from backend
  const fetchProductData = async (id) => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/single/${id}`);
      console.log("Fetched product data:", response.data);
      if (response.data.success) {
        setProductData(response.data.product); // Set the product data correctly
        if (response.data.product.image && response.data.product.image.length > 0) {
          setImage(response.data.product.image[0]); // Set the main image
        }
      } else {
        console.error("Product fetch unsuccessful");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData(productId);
  }, [productId]);

  const handleRelatedProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = () => {
    if (productData) {
      addToCart(productData._id, size);
      setNotification("Item added to the cart!");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  if (!productData) return <p>Loading...</p>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-md shadow-lg">
          {notification}
        </div>
      )}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Thumbnail Images */}
        <div className="flex sm:flex-col sm:w-[20%] w-full gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-auto w-full">
            {productData.image?.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className="w-[25%] sm:w-[80px] cursor-pointer sm:mb-3"
                alt="Thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Main Image and Product Info */}
        <div className="w-full sm:w-[80%] flex gap-4">
          <div className="w-[60%]">
            <img className="w-full h-auto" src={image} alt="Main Product" />
          </div>

          <div className="w-[40%] flex flex-col justify-start">
            <h1 className="font-medium text-2xl">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 4 }, (_, index) => (
                <img src={assets.star_icon} alt="Star" className="w-3.5" key={index} />
              ))}
              <img src={assets.star_dull_icon} alt="Star" className="w-3.5" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
            <p className="mt-5 text-gray-500">{productData.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes?.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex justify-start">
                <button onClick={handleAddToCart} className="bg-black text-white px-6 py-3 text-xs active:bg-gray-700">
                  ADD TO CART
                </button>
              </div>
              <hr className="mt-8" />
              <div className="text-sm text-gray-500 mt-5">
                <p>100% Original Product.</p>
                <p>Cash on delivery is available for this Product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (111)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Featuring a sleek, modern cut and soft, durable materials, this piece promises all-day comfort.</p>
          <p>Our platform offers a carefully chosen selection of products, emphasizing both aesthetics and practicality.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        onRelatedProductClick={handleRelatedProductClick}
      />
    </div>
  );
}

export default Product;
