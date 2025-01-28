// "use client";
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { client } from "../../../sanity/lib/client"; // Make sure this is the correct import for your Sanity client
// import Link from 'next/link';

// // Define the product interface
// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   stock: number;
//   slug: {
//     current: string;
//   };
//   imageUrl: string; // URL of the image
// }

// export default function Newstyle() {
//   const [products, setProducts] = useState<Product[]>([]); // To store fetched products
//   const [loading, setLoading] = useState<boolean>(true); // Track loading state
//   const [error, setError] = useState<string | null>(null); // Track error state

//   // Fetch the product data from Sanity
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const productsData = await client.fetch(`
//           *[_type == "product" && slug.current in ["2", "3", "11", "7", "10"]]{
//             title,
//             price,
//             stock,
//             slug,
//             "imageUrl": image.asset->url
//           }
//         `);
//         setProducts(productsData); // Store the fetched products in state
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (error) {
//         setError('Failed to load products. Please try again later.');
//         setLoading(false); // Set loading to false even if there's an error
//       }
//     };

//     fetchProducts(); // Call the function to fetch products
//   }, []);

//   // Manually control the order of products
//   const manualOrder = ["2", "7", "10", "3", "11"]; // Define the desired order based on the slugs or another attribute

//   // Sort products based on the manual order
//   const orderedProducts = products.sort((a, b) => {
//     return manualOrder.indexOf(a.slug.current) - manualOrder.indexOf(b.slug.current);
//   });

//   // Ensure we have at least 5 products, with the first one being the main image
//   const mainImage = orderedProducts[0]; // The first image to display in the first section
//   const galleryImages = orderedProducts.slice(1, 5); // The next four images for the gallery (if available)

//   return (
//     <div className="px-4 sm:px-8 md:px-32 py-8 max-w-screen-2xl m-auto">
//       {/* Explore Styles Section */}
//       <section className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-16 max-w-screen-xl m-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
//           {/* Left Section: Image with vertical text */}
//           <div className="relative flex items-center justify-center">
//             <p className="mt-80 mr-6 absolute transform -rotate-90 pt-16 origin-bottom-left text-2xl hidden md:block text-gray-900 font-semibold tracking-wide md:left-0">
//               Explore New and Popular Styles
//             </p>
//             <div className="w-full lg:w-[585px] flex justify-center items-center">
//               {/* Show loading indicator */}
//               {loading ? (
//                 <div className="bg-gray-200 h-64 w-full flex justify-center items-center text-xl text-gray-500">Loading...</div>
//               ) : error ? (
//                 <div className="bg-red-200 h-64 w-full flex justify-center items-center text-xl text-red-600">{error}</div>
//               ) : mainImage ? (
//                 <Link href={`/products/${mainImage.slug.current}`}>      <Image
//                   src={mainImage.imageUrl}
//                   alt={mainImage.title}
//                   width={644}
//                   height={644}
//                   className="object-contain transition-transform duration-500 ease-in-out transform hover:scale-105"
//                 /></Link> 
//               ) : (
//                 <div className="bg-gray-300 h-64 w-full flex justify-center items-center text-white">No Image</div>
//               )}
//             </div>
//           </div>

//           {/* Right Section: Display fetched products in a gallery grid */}
//           <div className="grid grid-cols-2 gap-4">
//             {galleryImages.map((product, i) => (
//               <div
//                 key={i}
//                 className="relative hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden rounded-lg"
//               ><Link href={`/products/${product.slug.current}`}>
//                 <Image
//                   src={product.imageUrl}
//                   alt={product.title}
//                   width={284}
//                   height={284}
//                   className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
//                 /></Link>
    
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "../../../sanity/lib/client"; // Ensure the import for your Sanity client is correct
import Link from "next/link";

// Define the product interface
interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  slug: {
    current: string;
  };
  imageUrl: string; // URL of the image
}

export default function Newstyle() {
  const [products, setProducts] = useState<Product[]>([]); // To store fetched products
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  // Fetch the product data from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        const productsData = await client.fetch(`
          *[_type == "product" && slug.current in ["2", "3", "11", "7", "10"]]{
            title,
            price,
            stock,
            slug,
            "imageUrl": image.asset->url
          }
        `);

        setProducts(productsData); // Store the fetched products in state
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []);

  // Manually control the order of products
  const manualOrder = ["2", "7", "10", "3", "11"]; // Define the desired order based on the slugs or another attribute

  // Sort products based on the manual order
  const orderedProducts = products.sort((a, b) => {
    return manualOrder.indexOf(a.slug.current) - manualOrder.indexOf(b.slug.current);
  });

  // Ensure we have at least 5 products, with the first one being the main image
  const mainImage = orderedProducts[0]; // The first image to display in the first section
  const galleryImages = orderedProducts.slice(1, 5); // The next four images for the gallery (if available)

  return (
    <div className="px-4 sm:px-8 md:px-32 py-8 max-w-screen-2xl m-auto">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      ) : (
        <section className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 py-16 max-w-screen-xl m-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {/* Left Section: Image with vertical text */}
            <div className="relative flex items-center justify-center">
              <p className="mt-80 mr-6 absolute transform -rotate-90 pt-16 origin-bottom-left text-2xl hidden md:block text-gray-900 font-semibold tracking-wide md:left-0">
                Explore New and Popular Styles
              </p>
              <div className="w-full lg:w-[585px] flex justify-center items-center">
                {mainImage ? (
                  <Link href={`/products/${mainImage.slug.current}`}>
                    <Image
                      src={mainImage.imageUrl}
                      alt={mainImage.title}
                      width={644}
                      height={644}
                      className="object-contain transition-transform duration-500 ease-in-out transform hover:scale-105"
                    />
                  </Link>
                ) : (
                  <div className="bg-gray-300 h-64 w-full flex justify-center items-center text-white">
                    No Main Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Right Section: Display fetched products in a gallery grid */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((product, i) => (
                <div
                  key={i}
                  className="relative hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden rounded-lg"
                >
                  <Link href={`/products/${product.slug.current}`}>
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={284}
                      height={284}
                      className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
