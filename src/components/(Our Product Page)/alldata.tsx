
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { fetchPopularProducts1 } from "../fetch3"; // Import your fetch function
import Link from "next/link";

// Define the interface for the product
interface Product {
  title: string;
  price: number;
  slug: {
    current: string;
  };
  imageUrl: string;
  badge: string;
}

export default function AllProductData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const productsPerPage = 6; // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      const desiredOrder = [
        "0",
        "1",
        "2",
        "3",
        "9",
        "5",
        "6",
        "7",
        "8",
        "4",
        "10",
        "11",
      ]; // Desired slug order
      try {
        const data: Product[] = await fetchPopularProducts1();
        const sortedProducts = data.sort((a, b) => {
          const indexA = desiredOrder.indexOf(a.slug.current);
          const indexB = desiredOrder.indexOf(b.slug.current);
          return indexA - indexB;
        });
        setProducts(sortedProducts);
        setError(null);
      }catch {
        setError("Failed to fetch products. Please try again later."); // Set error message
      }
       finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination logic: Slice products array based on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

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
    <div className="px-4 sm:px-8 md:px-52 pt-2 mt-14 max-w-screen-2xl m-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 pl-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {currentProducts.map((product) => (
            <div
              key={product.slug.current}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 group"
            >
              <Link href={`/products/${product.slug.current}`}>
                {/* Image Section */}
                <div className="w-full h-64 overflow-hidden relative">
                  <Image
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.title || "Product"}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500"></div>
                </div>
                {/* Product Details */}
                <div className="w-full px-4 py-3 flex justify-between items-center">
                  <div>
                    <h2 className="font-medium text-lg text-emerald-500 transition-colors duration-300">
                      {product.title || "No Title"}
                    </h2>
                    <span className="text-black text-lg font-semibold transition-colors duration-300">
                      ${product.price || "N/A"}
                    </span>
                  </div>
                  {/* Cart Icon */}
                  <div
                    aria-label="Add to cart"
                    className="p-2 bg-teal-500 rounded-md text-white shadow-md transition-all duration-300 hover:bg-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    <FaCartShopping className="w-6 h-6 transition-transform duration-300 group-hover:scale-125" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 disabled:bg-gray-300"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`px-4 py-2 mx-2 text-sm font-semibold ${
                currentPage === pageNumber
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
              } rounded-md hover:bg-teal-600`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
