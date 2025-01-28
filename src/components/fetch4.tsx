import { client } from "../../sanity/lib/client";

// Define the Product interface
export interface Product {
  title: string;
  price: number;
  stock: number;
  slug: {
    current: string;
  };
  imageUrl: string;
}

// Fetch function to get featured products with imageUrl
export const Aboutproduct = async (): Promise<Product[]> => {
  const query = `*[_type == "product" && slug.current in ["12", "13", "14"]]{
    title,
    price,
    stock,
    slug,
    "imageUrl": image.asset->url
  }`;

  try {
    const products: Product[] = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
