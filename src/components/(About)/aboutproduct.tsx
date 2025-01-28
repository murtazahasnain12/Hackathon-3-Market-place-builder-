"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Aboutproduct, Product } from "../fetch4";
import Link from "next/link";

export default function Popular(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        setError(null); // Reset error state before fetching
        const data = await Aboutproduct();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Our Popular Products
        </h3>

        {/* Show loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <p className="text-xl text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          // Show error message if there is an error
          <div className="flex justify-center items-center py-10">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        ) : (
          // Show products if data is successfully fetched
          <div className="flex flex-wrap justify-between items-start gap-6">
            {products.map((product, index) => (
              <div
                key={product.slug.current}
                className={`rounded-lg overflow-hidden shadow-md flex-shrink-0 ${
                  index === 0
                    ? "w-full sm:w-[48%] lg:w-[530px]" // Larger width for the first card
                    : "w-full sm:w-[48%] lg:w-[280px]" // Standard width for other cards
                }`}
              >
                <Link href={`/products/${product.slug.current}`}>
                  <div className="relative h-[375px]">
                    <Image
                      src={product.imageUrl || "/placeholder.png"} // Fallback for missing images
                      alt={product.title || "Product"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      priority
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-lg">{product.title}</h4>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
