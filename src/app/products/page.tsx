import Link from 'next/link';
import Image from 'next/image';
import { getProducts, formatPrice } from '@/lib/shopify';
import { categories } from '@/lib/data';

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const sort = params.sort || 'featured';

  let products = await getProducts(50);

  // Filter by category
  if (category && category !== 'all') {
    products = products.filter((p: any) => 
      p.productType?.toLowerCase().includes(category.toLowerCase()) ||
      p.tags?.some((t: string) => t.toLowerCase().includes(category.toLowerCase()))
    );
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter((p: any) =>
      p.title.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower)
    );
  }

  // Sort products
  switch (sort) {
    case 'price-asc':
      products.sort((a: any, b: any) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a: any, b: any) => b.price - a.price);
      break;
    case 'newest':
      // Keep original order (most recent first)
      break;
    default:
      // Featured - keep original order
      break;
  }

  const categoryName = category
    ? categories.find((c: any) => c.slug === category)?.name || category
    : 'All Products';

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Hero Banner */}
      <div className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4">{categoryName}</h1>
          <p className="text-gray-400">Premium quality hair extensions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full border ${
              !category ? 'bg-black text-white' : 'bg-white text-gray-700 hover:border-black'
            } transition-colors`}
          >
            All
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full border ${
                category === cat.slug ? 'bg-black text-white' : 'bg-white text-gray-700 hover:border-black'
              } transition-colors`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Sort */}
        <div className="flex justify-end mb-6">
          <select
            className="px-4 py-2 border rounded-md"
            defaultValue={sort}
            onChange={(e) => {
              window.location.href = `/products?${category ? `category=${category}&` : ''}sort=${e.target.value}`;
            }}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <h3 className="font-medium mb-1 group-hover:text-gray-600 transition-colors line-clamp-2">
                  {product.title}
                </h3>
                <p className="font-semibold">
                  {formatPrice(product.price, product.currencyCode)}
                </p>
                {product.tags?.includes('bestseller') && (
                  <span className="text-xs bg-black text-white px-2 py-0.5 mt-1 inline-block">
                    Best Seller
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found.</p>
            <Link href="/products" className="text-black underline mt-4 inline-block">
              View all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
