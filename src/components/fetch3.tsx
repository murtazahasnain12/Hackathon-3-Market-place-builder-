import { client } from "../../sanity/lib/client";

// Fetch function to get featured products with imageUrl
export const fetchPopularProducts1 = async () => {
    const query = `*[_type == "product" && slug.current in ["0", "1", "2", "3","4","5","6","7","8","9","11","10",]]{
      title,
      badge,
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
  