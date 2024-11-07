import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";

function RelatedProducts({ category, subCategory, onRelatedProductClick }) {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            let filteredProducts = products.filter(
                (item) => item.category === category && item.subCategory === subCategory
            );
            setRelated(filteredProducts.slice(0, 5));
        }
    }, [products, category, subCategory]);

    return (
        <div className="my-24">
            <h2 className="text-center text-3xl py-2">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item) => (
                    <ProductItems
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        onClick={() => onRelatedProductClick(item._id)} // Handle click to update main product
                    />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
