import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const deliver_fee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const userId = token ? jwt_decode(token).id : null;

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products. Please try again.");
        }
    };

    const getCartDataFromBackend = async () => {
        if (token) {
            try {
                const response = await axios.get(backendUrl + '/api/cart/get', {
                    headers: { token }
                });
    
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                toast.error("Failed to load cart data.");
            }
        }
    };
    
    useEffect(() => {
        getProductsData();

        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            try {
                setCartItems(JSON.parse(storedCartItems));
            } catch (error) {
                console.error("Error parsing cart items from localStorage:", error);
            }
        } else {
            setCartItems({});
        }

        getCartDataFromBackend();

    }, [token]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
    
        const trimmedItemId = itemId.trim();
        let updatedCartItems = { ...cartItems };
    
        if (!updatedCartItems[trimmedItemId]) {
            updatedCartItems[trimmedItemId] = {};
        }
    
        if (updatedCartItems[trimmedItemId][size]) {
            updatedCartItems[trimmedItemId][size] += 1;
        } else {
            updatedCartItems[trimmedItemId][size] = 1;
        }
    
        // Remove item from cart if its quantity becomes 0
        if (Object.keys(updatedCartItems[trimmedItemId]).length === 0) {
            delete updatedCartItems[trimmedItemId];
        }
    
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    
    const updateQuantity = async (itemId, size, quantity) => {
        const trimmedItemId = itemId.trim();
        let updatedCartItems = { ...cartItems };
    
        if (quantity === 0) {
            if (updatedCartItems[trimmedItemId] && updatedCartItems[trimmedItemId][size] !== undefined) {
                delete updatedCartItems[trimmedItemId][size];
                
                // Remove item ID if there are no sizes left
                if (Object.keys(updatedCartItems[trimmedItemId]).length === 0) {
                    delete updatedCartItems[trimmedItemId];
                }
            }
        } else {
            if (updatedCartItems[trimmedItemId]) {
                updatedCartItems[trimmedItemId][size] = quantity;
            }
        }
    
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
        if (token) {
            try {
                await axios.put(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            const trimmedItemId = items.trim();
            let itemInfo = products.find((product) => product._id === trimmedItemId);
            for (const item in cartItems[trimmedItemId]) {
                if (cartItems[trimmedItemId][item] > 0 && itemInfo) {
                    totalAmount += itemInfo.price * cartItems[trimmedItemId][item];
                }
            }
        }
        return totalAmount;
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };

    const value = {
        products,
        currency,
        deliver_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        setCartItems,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
