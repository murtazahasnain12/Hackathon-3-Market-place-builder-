import { client } from "../../sanity/lib/client";

// Fetch function to get featured products with imageUrl
export const chairfetch = async () => {
    const query = `*[_type == "product" && slug.current in ["8","16","14","13","2","5","6","10"]]{
      title,
      price,
      stock,
      slug,
      "imageUrl": image.asset->url  // Alias the image URL to imageUrl
    }`;
  
    try {
      const products = await client.fetch(query); // Fetch the data using GROQ query
      return products; // Return the fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  };
  