"use client";
import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../fetch6"; // Import the fetch function
import Image from "next/image";
import React from "react";
import Link from "next/link";

type Product = {
  slug: {
    current: string;
  };
  imageUrl: string;
  title: string;
  price: number;
};

const Subscribe = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchFeaturedProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div className="bg-gray-100 pb-10 flex flex-col items-center justify-start pt-20 space-y-12 mt-20 max-w-screen-xl mx-auto">
      {/* Newsletter Subscription Section */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-between space-y-10">
        <h1 className="font-inter text-center text-[20px] sm:text-[20px] md:text-[30px] lg:text-[40px]">
          Or subscribe to the newsletter
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
          <input
            type="email"
            placeholder="Email Address"
            className="border-b-2 border-black text-[16px] w-full sm:w-[443px] md:w-[543px] lg:w-[643px] p-2"
          />
          <button className="border-b-2 border-black text-[16px] px-4 py-2">
            SUBMIT
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="w-full max-w-7xl flex flex-col items-center">
        <h1 className="font-inter text-center text-[30px] sm:text-[40px] md:text-[40px] font-semibold">
       Follow Products and Discount on Instagram
        </h1>
        <div className="pt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full px-4 sm:px-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-gray-400 transform transition-transform duration-300 hover:scale-105"
            >
                <Link href={`/products/${product.slug.current}`}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={200}
                height={200}
                className=" h-auto object-cover hover:scale-105 transition duration-500"
              /></Link>
            </div>
          ))}
        </div>
      </div>    
    </div>
  );
};

export default Subscribe;
