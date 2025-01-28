"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchFeaturedProducts } from "../fetch5"; // Import the fetch function
import Link from "next/link";

type Product = {
  slug: {
    current: string;
  };
  imageUrl: string;
  title: string;
  price: number;
};

const FeatureCard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchFeaturedProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div className="px-10 sm:px-16 md:px-16 lg:px-24 py-8 max-w-screen-xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Featured Products</h1>
          <Link href="/Product">
            <h1 className="underline font-bold text-blue-500 cursor-pointer">
              View All
            </h1>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-gray-400 transform transition-transform duration-300 hover:scale-105"
            >
              <Link href={`/products/${product.slug.current}`}>
                <div className="w-full h-56 overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>
                <div className="w-full px-4 py-2 flex   justify-between">
                  <h2 className="font-semibold text-sm mt-2  mb-1">{product.title}</h2>
                  <span className="text-black text-base mt-1 font-bold">
                    ${product.price}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
