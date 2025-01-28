
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { fetchPopularProducts1 } from "../fetch1"; // Import your fetch function
import Link from "next/link";

// Define the interface for the product
interface Product {
  title: string;
  price: number;
  slug: {
    current: string;
  };
  imageUrl: string;
}

export default function OurProduct() {
  const [products, setProducts] = useState<Product[]>([]); // Products state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      const desiredOrder = ["1", "0", "3", "2", "4", "5", "6", "7"]; // Desired order
      try {
        setIsLoading(true); // Set loading to true
        const data: Product[] = await fetchPopularProducts1(); // Fetch products
        // Sort the products based on desiredOrder
        const sortedProducts = data.sort((a, b) => {
          const indexA = desiredOrder.indexOf(a.slug.current);
          const indexB = desiredOrder.indexOf(b.slug.current);
          return indexA - indexB;
        });
        setProducts(sortedProducts); // Store sorted data in state
        setError(null); // Clear error state if successful
      }catch {
        setError("Failed to fetch products. Please try again later."); // Set error message
      }
       finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-teal-500">Loading products...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 md:px-52 py-8 mt-28 max-w-screen-2xl m-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 pl-4 text-center">
          Our Product
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Render dynamic products */}
          {products.map((product) => (
            <div
              key={product.slug.current}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Link href={`/products/${product.slug.current}`}>
                <div className="w-full h-64 overflow-hidden">
                  <Image
                    src={product.imageUrl || "/placeholder.png"} // Fallback if imageUrl is missing
                    alt={product.title || "Product"}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between w-full px-4 py-2">
                  <div className="flex flex-col items-start">
                    <h2 className="font-medium text-lg mb-1">
                      {product.title || "No Title"}
                    </h2>
                    <span className="text-black text-lg font-bold">
                      ${product.price || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaCartShopping className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 cursor-pointer transition-transform duration-300 hover:scale-110" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
