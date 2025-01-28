// "use client";
// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { FaCartShopping } from 'react-icons/fa6';
// import { fetchFeaturedProducts } from '../fetch'; // Import the fetch function
// import Link from 'next/link';

// type Product = {
//   slug: {
//     current: string;
//   };
//   imageUrl: string;
//   title: string;
//   price: number;
// };

// const Feature =  () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       const data = await fetchFeaturedProducts();
//       setProducts(data);
//     };
    
//     getProducts();
//   }, []);

//   return (
//     <div className="px-4 sm:px-8 md:px-48 py-8 max-w-screen-2xl m-auto">
//       <div>
//         <h1 className="text-2xl font-bold mb-4 pl-4">Featured Products</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//           {products.map((product, i) => (
//             <div key={i} className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-gray-400 transform transition-transform duration-300 hover:shadow-1xl">
//               <Link href={`/products/${product.slug.current}`}>
//                 <div className="w-full h-64 overflow-hidden">
//                   {product.imageUrl ? (
//                     <Image
//                       src={product.imageUrl}
//                       alt={product.title}
//                       width={400}
//                       height={400}
//                       className="w-full h-full object-cover hover:scale-105 transition duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <span>No Image Available</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex justify-between w-full px-4 py-2">
//                   <div className="flex flex-col items-start">
//                     <h2 className="font-medium text-lg mb-1">{product.title}</h2>
//                     <span className="text-black text-lg font-bold">${product.price}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaCartShopping className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 cursor-pointer transition-transform duration-300 hover:scale-110" />
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div> 
//     </div>
//   );
// };

// export default Feature;
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { fetchFeaturedProducts } from "../fetch"; // Import the fetch function
import Link from "next/link";

type Product = {
  slug: {
    current: string;
  };
  imageUrl: string;
  title: string;
  price: number;
};

const Feature = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchFeaturedProducts(); // Fetch products
        setProducts(data); // Set fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getProducts();
  }, []);

  return (
    <div className="px-4 sm:px-8 md:px-48 py-8 max-w-screen-2xl m-auto">
      <h1 className="text-2xl font-bold mb-4 pl-4">Featured Products</h1>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-80">
          <p className="text-center text-lg">Loading featured products...</p>
        </div>
      )}

      {/* No Products Found */}
      {!loading && products.length === 0 && (
        <div className="flex items-center justify-center h-80">
          <p className="text-center text-lg">No featured products found.</p>
        </div>
      )}

      {/* Product List */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {products.map((product, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-gray-400 transform transition-transform duration-300 hover:shadow-1xl"
            >
      
              <Link href={`/products/${product.slug.current}`}>
                <div className="w-full h-64 overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between w-full px-4 py-2">
                  <div className="flex flex-col items-start">
                    <h2 className="font-medium text-lg mb-1">{product.title}</h2>
                    <span className="text-black text-lg font-bold">
                      ${product.price}
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
      )}
    </div>
  );
};

export default Feature;
