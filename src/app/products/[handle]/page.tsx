import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductByHandle, getProducts, formatPrice } from '@/lib/shopify';

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | D.S HAIR & BEAUTY`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Get related products
  const allProducts = await getProducts(8);
  const relatedProducts = allProducts
    .filter((p: any) => p.id !== product.id)
    .slice(0, 4);

  const firstVariant = product.variants?.[0];

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/products" 
            className="text-gray-500 hover:text-black flex items-center gap-2"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            {product.vendor && (
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                {product.vendor}
              </p>
            )}
            
            <h1 className="text-3xl md:text-4xl font-light mb-4">
              {product.title}
            </h1>
            
            <p className="text-2xl font-light mb-6">
              {formatPrice(product.price, product.currencyCode)}
            </p>
            
            <div className="prose prose-sm max-w-none text-gray-600 mb-8">
              <p>{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 uppercase tracking-wide">
                  Options
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      className="px-4 py-2 border border-gray-300 hover:border-black transition-colors text-sm"
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <form action={async () => {
              'use server';
              // Server action for adding to cart would go here
            }}>
              <input type="hidden" name="variantId" value={firstVariant?.id} />
              <button
                type="submit"
                className="w-full bg-black text-white py-4 px-8 rounded-md hover:bg-gray-800 transition-colors"
              >
                Add to Cart - {formatPrice(product.price, product.currencyCode)}
              </button>
            </form>

            {/* Product Details */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-sm font-medium uppercase tracking-wide mb-4">
                Product Details
              </h3>
              <dl className="space-y-2 text-sm">
                {product.productType && (
                  <div className="flex">
                    <dt className="text-gray-500 w-32">Type:</dt>
                    <dd>{product.productType}</dd>
                  </div>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex">
                    <dt className="text-gray-500 w-32">Tags:</dt>
                    <dd>{product.tags.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/products/${related.handle}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4">
                    {related.image ? (
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium mb-1 group-hover:text-gray-600 transition-colors">
                    {related.title}
                  </h3>
                  <p className="font-semibold">
                    {formatPrice(related.price, related.currencyCode)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
