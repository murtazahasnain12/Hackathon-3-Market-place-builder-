// fetch.ts
import { client } from "../../sanity/lib/client";

// Fetch a single product by slug
export const fetchProductBySlug = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    title,
    price,
    stock,
    slug,
    "imageUrl": image.asset->url, // Fetch the image URL
    description // Fetch additional fields if needed
  }`;

  try {
    const product = await client.fetch(query, { slug });
    return product; // Return the fetched product
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null; // Return null in case of an error
  }
};
