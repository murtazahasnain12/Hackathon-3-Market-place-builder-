import FeatureCard from "@/components/(Landing All Pages)/cardproduct";
import { fetchProductBySlug } from "@/components/dynamic";
import ProductDetails from "@/components/ProductDetailed";

// Define the Product interface
interface Product {
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
  stock: number;
}

// Define the Page Props interface
interface ProductPageProps {
 params: Promise<{ slug: string }>;  // Adjust to Promise type as required
}

// ProductPage is an asynchronous function that will fetch data based on the slug
export default async function ProductPage({ params }: ProductPageProps) {
  // Resolve the `params` promise and extract `slug`
  const { slug } = await params;
  // const slug = (await params).slug
  // Fetch the product by the slug using your dynamic fetching function
  const product: Product | null = await fetchProductBySlug(slug);

  // If no product is found, return a "not found" message
  if (!product) {
    return <div>Product not found.</div>;
  }

  // Otherwise, return the product details component with the fetched product
  return (
    <div>
      <ProductDetails product={product} />
      <FeatureCard/>
    </div>
  );
}
