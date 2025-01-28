// "use client";

// import { useEffect, useState } from "react";
// import { client } from "../../../sanity/lib/client"; // Ensure your sanity client is configured
// import Image from "next/image";
// import Link from "next/link";

// export default function CategoryPage() {
//   interface Product {
//     title: string;
//     price: number;
//     stock: number;
//     slug: { current: string };
//     imageUrl: string;
//   }

//   const [products, setProducts] = useState<Product[]>([]); // State for storing fetched products
//   const [loading, setLoading] = useState(true); // State for loading status

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const query = `*[_type == "product" && slug.current in ["9"]]{
//           title,
//           price,
//           stock,
//           slug,
//           "imageUrl": image.asset->url
//         }`;

//         const data = await client.fetch(query); // Fetch data using the Sanity client
//         setProducts(data); // Set the fetched data to state
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       } finally {
//         setLoading(false); // Stop the loading spinner
//       }
//     };

//     fetchProducts();
//   }, []); // Empty dependency array to run the effect only once

//   // Render loading state or product data
//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-100">
//         <p className="text-xl font-semibold text-gray-600 animate-pulse">
//           Loading products...
//         </p>
//       </div>
//     );

//   return (
//     <div className="px-4 sm:px-8 md:px-48 py-8 max-w-screen-2xl m-auto bg-gray-50">
//       <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
//         Stool Category
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 m-auto">
//         {products.map((product) => (
//           <div
//             key={product.slug.current}
//             className="group relative bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
//           >
//             <Link href={`/products/${product.slug.current}`}>
//               <div
//                 className="group relative h-80 bg-cover bg-center flex flex-col items-center rounded-lg overflow-hidden"
//                 style={{
//                   backgroundImage: `url(${product.imageUrl})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               >
//                 {/* Overlay */}
//                 <div className="absolute bottom-0 left-0 w-full h-1/4 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-opacity duration-300"></div>

//                 {/* Content */}
//                 <div className="absolute bottom-0 left-0 w-full h-1/4 px-4 py-2 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <h2 className="font-semibold text-lg truncate">{product.title}</h2>
//                   <p className="text-sm font-medium mt-2">
//                     Price:{" "}
//                     <span className="font-semibold text-green-500">
//                       ${product.price}
//                     </span>
//                   </p>
//                   <p
//                     className={`text-sm font-medium mt-1 ${
//                       product.stock > 0
//                         ? "text-green-500"
//                         : "text-red-500 font-medium"
//                     }`}
//                   >
//                     {product.stock > 0
//                       ? `${product.stock} Available`
//                       : "Out of Stock"}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client"; // Ensure your sanity client is configured
import Link from "next/link";

export default function CategoryPage() {
  interface Product {
    title: string;
    price: number;
    stock: number;
    slug: { current: string };
    imageUrl: string;
    description: string; // Ensure you include a description or any other detail
  }

  const [products, setProducts] = useState<Product[]>([]); // State for storing fetched products
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && slug.current in ["9"]]{
          title,
          price,
          stock,
          slug,
          description, // Add description to fetch the product details
          "imageUrl": image.asset->url
        }`;

        const data = await client.fetch(query); // Fetch data using the Sanity client
        setProducts(data); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run the effect only once

  // Render loading state or product data
  if (loading)
    return (
      <div className="flex items-center justify-center  h-screen ">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading products...
        </p>
      </div>
    );

  return (
    <div className="px-4 sm:px-8 md:px-48 py-8 max-w-screen-2xl m-auto bg-gray-50">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
        Stool Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 m-auto">
        {products.map((product) => (
          <div
            key={product.slug.current}
            className="group relative bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <Link href={`/products/${product.slug.current}`}>
              <div
                className="group relative h-80 bg-cover bg-center flex flex-col items-center rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${product.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 px-4 py-2 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="font-semibold text-lg truncate">{product.title}</h2>
                  <p className="text-sm font-medium mt-2">
                    Price:{" "}
                    <span className="font-semibold text-green-500">
                      ${product.price}
                    </span>
                  </p>
                  <p
                    className={`text-sm font-medium mt-1 ${
                      product.stock > 0
                        ? "text-green-500"
                        : "text-red-500 font-medium"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} Available`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
