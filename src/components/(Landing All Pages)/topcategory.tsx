// "use client";
// import React, { useEffect, useState } from "react";
// import { TopCategory } from "../fetch2";    // Adjust path based on your file structure
// import Link from "next/link";

// // Define an interface for the product data
// interface Product {
//   imageUrl: string;
//   title: string;
//   price: number;
//   stock: number;
//   slug: {
//     current: string;  // Assuming slug is an object with a 'current' field
//   };
// }

// export default function Topcategory2() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // Start loading
//       try {
//         const data = await TopCategory(); // Call your fetch function
//         setProducts(data); // Set the fetched products
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <p className="text-center py-8">Loading categories...</p>;
//   }

//   if (products.length === 0) {
//     return <p className="text-center py-8">No products found.</p>;
//   }

//   return (
//     <div className="px-4 sm:px-8 md:px-48 py-8 max-w-screen-2xl m-auto">
//       <h1 className="text-2xl font-bold mb-4 pl-4">Top Categories</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
//         {/* Explicitly type 'product' as Product */}
//         {products.map((product: Product, index: number) => (
//           <div key={index}>
//             {/* Use slug.current to access the correct URL */}
//             <Link href={`/products/${product.slug.current}`}>
//               <div
//                 className="group relative h-80 bg-cover bg-center flex flex-col items-center rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
//                 style={{
//                   backgroundImage: `url(${product.imageUrl})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               >
//                 {/* Overlay */}
//                 <div className="absolute bottom-0 left-0 w-full h-1/4 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-opacity duration-300"></div>

//                 {/* Content */}
//                 <div className="absolute bottom-0 left-0 w-full h-1/4 px-4 py-2 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
//                   <h2 className="font-semibold text-base truncate">{product.title}</h2>
//                   <span className="text-sm font-medium truncate">{product.stock} in stock</span>
//                   <span className="text-sm font-medium truncate">${product.price}</span>
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
import React, { useEffect, useState } from "react";
import { TopCategory } from "../fetch2"; // Adjust path based on your file structure
import Link from "next/link";

// Define an interface for the product data
interface Product {
  imageUrl: string;
  title: string;
  price: number;
  stock: number;
  slug: {
    current: string; // Assuming slug is an object with a 'current' field
  };
}

export default function Topcategory2() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const data = await TopCategory(); // Call your fetch function
        setProducts(data); // Set the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 sm:px-8 md:px-48 py-8 max-w-screen-2xl m-auto">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-80">
          <p className="text-center py-8">Loading categories...</p>
        </div>
      )}

      {/* No Products Found */}
      {!loading && products.length === 0 && (
        <div className="flex items-center justify-center h-80">
          <p className="text-center py-8">No products found.</p>
        </div>
      )}

      {/* Product List */}
      {!loading && products.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4 pl-4">Top Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {products.map((product: Product, index: number) => (
              <div key={index}>
                <Link href={`/products/${product.slug.current}`}>
                  <div
                    className="group relative h-80 bg-cover bg-center flex flex-col items-center rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{
                      backgroundImage: `url(${product.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-opacity duration-300"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full h-1/4 px-4 py-2 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                      <h2 className="font-semibold text-base truncate">{product.title}</h2>
                      <span className="text-sm font-medium truncate">{product.stock} in stock</span>
                      <span className="text-sm font-medium truncate">${product.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
