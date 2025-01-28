"use client";

import { useCart } from "@/app/context/cardContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

interface Product {
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
  stock: number;
}

interface ProductDetailsProps {
  product: Product;
}

export default  function ProductDetails({ product }: ProductDetailsProps) {
  const { dispatch } = useCart();
  const [stock, setStock] = useState(product.stock);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= stock) {
      setLoading(true); // Show loading
      dispatchProductToCart(quantity);
      setStock((prevStock) => prevStock - quantity);

      setTimeout(() => {
        setLoading(false); // Hide loading spinner

        // Display success toast notification
        toast.success('Item Added Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 1000); // Simulating a 1-second loading time
    } else {
      alert("Invalid quantity or out of stock!");
    }
  };
  const dispatchProductToCart = (quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          slug: product.slug,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
          size: "",
          id: `product-${Math.random().toString(36).substr(2, 9)}`,
          isAvailable: false,
          description: ""
        },
      });
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row md:px-32 lg:px-48 px-6 sm:px-12 md:py-4 space-y-6 md:space-y-0 md:space-x-6 items-center md:items-start max-w-screen-xl m-auto">
      <div className="w-full md:w-1/2 rounded-lg overflow-hidden flex-shrink-0 mb-6 md:mb-0">
        <div className="relative w-full h-64 md:h-96">
          <Image
            className="object-cover object-center rounded-lg h-full transform transition-transform duration-500 hover:scale-105"
            src={product.imageUrl}
            alt={product.title}
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white p-6 md:p-0 rounded-lg text-gray-800 flex flex-col justify-between items-center md:items-start transform transition-transform duration-300 space-y-2">
        <h1 className="text-2xl md:text-4xl font-medium md:font-semibold mb-4 text-center md:text-left">
          {product.title}
        </h1>
        <button className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded hover:bg-emerald-600 transition duration-300 mb-4">
          {product.price} $ USD
        </button>
        <p className="text-center md:text-left leading-relaxed mb-6">
          Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar neutra sustainable fingerstache kickstarter.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptatum a veritatis pariatur.
        </p>

        {/* Quantity Selection */}
        <div className="flex items-center space-x-2 mb-4">
          <button
            className={`font-bold text-xl rounded-full ${quantity <= 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={decrementQuantity} // Decrease quantity
            disabled={quantity <= 1} // Disable when quantity is 1
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            max={stock}
            onChange={(e) => setQuantity(Math.max(1, Math.min(stock, Number(e.target.value))))} // Limit range between 1 and stock
            className="w-16 text-center border border-gray-300 rounded-md"
          />
          <button
            className={`font-bold text-xl rounded-full ${quantity >= stock ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={incrementQuantity} // Increase quantity
            disabled={quantity >= stock} // Disable when quantity reaches stock
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded hover:bg-cyan-600 transition duration-300"
          onClick={handleAddToCart} // Add selected quantity to cart
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? 'Adding...' : 'Add to Cart'} {/* Show loading text */}
        </button>

        {/* Display Available Stock */}
        <p>Total Stock: {stock}</p>
        <Link href="/summary" className="mt-4 text-cyan-600 underline">Go to Cart</Link>
      </div>

      {/* Toast Container */}
      <div>
        {/* Add the Toast container globally in your layout or in _app.tsx */}
      </div>
    </div>
  );
}
