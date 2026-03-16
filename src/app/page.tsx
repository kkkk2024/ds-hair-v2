import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { categories, testimonials, instagramPosts } from '@/lib/data';
import { getProducts, formatPrice } from '@/lib/shopify';
import { Star, ArrowRight } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch products from Shopify
  let shopifyProducts: any[] = [];
  try {
    shopifyProducts = await getProducts(8);
  } catch (error) {
    console.error('Failed to fetch products from Shopify:', error);
  }

  const bestsellers = shopifyProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop"
            alt="Luxury Hair Extensions"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wide">
            Luxury Hair Extensions
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Premium quality Remy human hair extensions for the modern woman. 
            Transform your look with our professional-grade products.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 h-auto"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-light tracking-wide">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-light">
              Bestsellers
            </h2>
            <Link href="/products" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {bestsellers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {bestsellers.map((product: any) => (
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
                  <h3 className="font-medium mb-1 group-hover:text-gray-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="font-semibold">
                    {formatPrice(product.price, product.currencyCode)}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available yet.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-center text-gray-500 mb-8">
            @dshairbeauty
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {instagramPosts.map((post, index) => (
              <a
                key={index}
                href="https://instagram.com/dshairbeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden"
              >
                <Image
                  src={post}
                  alt={`Instagram post ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
