// "use client"
// import { GiSofa } from "react-icons/gi";
// import { FaCartShopping } from "react-icons/fa6";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { useCart } from "@/app/context/cardContext"; // Adjust the path as needed
// import { client } from "../../../sanity/lib/client"; // Import Sanity client
// import { FaTimes } from "react-icons/fa"; // Import cross icon

// // Define an interface for the product
// interface Product {
//   _id: string;
//   title: string;
//   slug: {
//     current: string;
//   };
// }

// export default function Navbar() {
//   const { state } = useCart(); // Access the cart state from your context
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State for dropdown
//   const dropdownRef = useRef<HTMLUListElement | null>(null); // Reference to dropdown menu
//   const inputRef = useRef<HTMLInputElement | null>(null); // Reference to input field
  
//   // States for search
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [allProducts, setAllProducts] = useState<Product[]>([]); // All products should be an array of Product
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products should be an array of Product

//   // Fetch products from Sanity CMS
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const products = await client.fetch(`
//         *[_type == "product"] {
//           _id,
//           title,
//           slug
//         }
//       `);
//       setAllProducts(products);
//     };

//     fetchProducts();
//   }, []);

//   // Handle search functionality
//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = allProducts.filter((product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]);
//     }
//   }, [searchTerm, allProducts]);

//   // Calculate the total number of items in the cart
//   const totalItemsInCart = state.items.reduce((total, item) => total + item.quantity, 0);

//   // Toggle dropdown menu
//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   // Close the dropdown if clicked outside (excluding the input and dropdown)
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
//         inputRef.current && !inputRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Function to clear the search term
//   const clearSearch = () => {
//     setSearchTerm("");
//   };

//   return (
//     <div className="flex flex-col text-white max-w-screen-2xl mx-auto">
//       {/* First Section */}
//       <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-40 bg-purple-950 text-slate-300 py-2 text-xs sm:text-sm">
//         <div>
//           <h1>✔ Free Shipping On All Orders $50+</h1>
//         </div>
//         <div>
//           <ul className="flex gap-4 sm:gap-6">
//             <li>Eng</li>
//             <Link href={"/Faq"}>Faqs</Link>
//             <li>Need Help</li>
//           </ul>
//         </div>
//       </div>

//       {/* Second Section */}
//       <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-40 bg-slate-50 text-black py-2 flex-wrap">
//         <div className="flex items-center gap-2 sm:gap-4">
//           <GiSofa className="text-emerald-500 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
//           <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">Comforty</h1>
//         </div>
//         <div>
//           <ul className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
//             <li>
//               <Link href={"/summary"}>
//                 <FaCartShopping className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
//               </Link>
//             </li>
//             <li>Cart</li>
//             <li>
//               {totalItemsInCart > 0 && (
//                 <span className="rounded-full text-white bg-emerald-600 px-2 py-1 text-xs">
//                   {totalItemsInCart}
//                 </span>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Search Bar Section */}
//       <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-40 py-4 gap-4 sm:gap-6">
//         {/* Navigation Links */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-3">
//           <ul className="flex gap-6 text-xs sm:text-sm md:text-base text-black items-center relative">
//             <li>
//               <a href={"/"}>Home</a>
//             </li>
//             <li>
//               <Link href={"/summary"}>Shop</Link>
//             </li>
//             <li>
//               <Link href={"/Product"}>Product</Link>
//             </li>
//             <li>
//               <Link href={"/About"}>About</Link>
//             </li>
//             <li>
//               <Link href={"/Contact"}>Contact</Link>
//             </li>
//             <li className="relative">
//               {/* Categories Button */}
//               <button onClick={toggleDropdown} className="flex items-center gap-1 text-black hover:underline">
//                 Categories
//                 <span className="text-xs">&#9660;</span> {/* Down arrow */}
//               </button>
//               {/* Dropdown Menu */}
//               {isDropdownOpen && (
//                 <ul
//                   ref={dropdownRef}
//                   className="absolute top-8 left-0 text-sm text-black bg-white shadow-md rounded-md w-32 transition-all duration-300 z-10 md:w-40 lg:w-48"
//                 >
//                   <li className="px-4 py-2 hover:bg-gray-200">
//                     <Link href={"/Categorychair"}>Chair</Link>
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-200">
//                     <Link href={"/Stool"}>Stool</Link>
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-200">
//                     <Link href={"/Sofa"}>Sofa</Link>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </div>

//         {/* Search Bar */}
//         <div className="relative w-full sm:w-80 md:w-96">
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search for products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none"
//             style={{
//               backgroundColor: '#fff',
//               color: '#333',
//             }}
//           />
//           {searchTerm && (
//             <div
//               onClick={clearSearch}
//               className="absolute top-3 right-3 text-gray-500 cursor-pointer"
//             >
//               <FaTimes size={16} />
//             </div>
//           )}
//           {searchTerm && (
//             <div className="absolute top-10 left-0 bg-white shadow-md p-4 w-full max-h-60 overflow-auto z-10">
//               {filteredProducts.length > 0 ? (
//                 <ul className="space-y-2">
//                   {filteredProducts.map((product) => (
//                     <li key={product._id}>
//                       <Link href={`/products/${product.slug.current}`} className="text-blue-600 hover:underline">
//                         {product.title}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">No products found.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { GiSofa } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/cardContext"; // Adjust the path as needed
import { client } from "../../../sanity/lib/client"; // Import Sanity client
import { FaTimes } from "react-icons/fa"; // Import cross icon

// Define an interface for the product
interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export default function Navbar() {
  const { state } = useCart(); // Access the cart state from your context
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State for dropdown
  const dropdownRef = useRef<HTMLUListElement | null>(null); // Reference to dropdown menu
  const inputRef = useRef<HTMLInputElement | null>(null); // Reference to input field
  
  // States for search
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [allProducts, setAllProducts] = useState<Product[]>([]); // All products should be an array of Product
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products should be an array of Product

  // Fetch products from Sanity CMS
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await client.fetch(`
        *[_type == "product"] {
          _id,
          title,
          slug
        }
      `);
      setAllProducts(products);
    };

    fetchProducts();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, allProducts]);

  // Calculate the total number of items in the cart
  const totalItemsInCart = state.items.reduce((total, item) => total + item.quantity, 0);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside (excluding the input and dropdown)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to clear the search term
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col text-white max-w-screen-2xl mx-auto">
      {/* First Section */}
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-40 bg-purple-950 text-slate-300 py-2 text-xs sm:text-sm">
        <div>
          <h1>✔ Free Shipping On All Orders $50+</h1>
        </div>
        <div>
          <ul className="flex gap-4 sm:gap-6">
            <li>Eng</li>
            <Link href={"/Faq"}>Faqs</Link>
            <li>Need Help</li>
          </ul>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-40 bg-slate-50 text-black py-2 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-4">
          <GiSofa className="text-emerald-500 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">Comforty</h1>
        </div>
        <div>
          <ul className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base">
            <li>
              <Link href={"/summary"}>
                <FaCartShopping className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
              </Link>
            </li>
            <li>Cart</li>
            <li>
              {totalItemsInCart > 0 && (
                <span className="rounded-full text-white bg-emerald-600 px-2 py-1 text-xs">
                  {totalItemsInCart}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-40 py-4 gap-4 sm:gap-6 flex-col sm:flex-row">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 w-full md:w-auto">
          <ul className="flex gap-3 text-xs sm:text-sm md:text-base text-black items-center relative w-full md:w-auto">
            <li>
              <a href={"/"}>Home</a>
            </li>
            <li>
              <Link href={"/summary"}>Shop</Link>
            </li>
            <li>
              <Link href={"/Product"}>Product</Link>
            </li>
            <li>
              <Link href={"/About"}>About</Link>
            </li>
            <li>
              <Link href={"/Contact"}>Contact</Link>
            </li>
            <li className="relative">
              {/* Categories Button */}
              <button onClick={toggleDropdown} className="flex items-center gap-1 text-black hover:underline text-xs sm:text-sm md:text-base">
                Categories
                <span className="text-xs">&#9660;</span> {/* Down arrow */}
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute top-8 left-0 text-sm text-black bg-white shadow-md rounded-md w-32 transition-all duration-300 z-10 md:w-40 lg:w-48"
                >
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href={"/Categorychair"}>Chair</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href={"/Stool"}>Stool</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href={"/Sofa"}>Sofa</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80 md:w-96 mt-4 sm:mt-0">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none"
            style={{
              backgroundColor: '#fff',
              color: '#333',
            }}
          />
          {searchTerm && (
            <div
              onClick={clearSearch}
              className="absolute top-3 right-3 text-gray-500 cursor-pointer"
            >
              <FaTimes size={16} />
            </div>
          )}
          {searchTerm && (
            <div className="absolute top-10 left-0 bg-white shadow-md p-4 w-full max-h-60 overflow-auto z-10">
              {filteredProducts.length > 0 ? (
                <ul className="space-y-2">
                  {filteredProducts.map((product) => (
                    <li key={product._id}>
                      <Link href={`/products/${product.slug.current}`} className="text-blue-600 hover:underline">
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
