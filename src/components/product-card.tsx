import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isBestseller && (
          <Badge className="absolute top-3 left-3 bg-black text-white hover:bg-gray-800">
            Bestseller
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      <h3 className="font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
        {product.name}
      </h3>
      <p className="text-gray-900 font-semibold">£{product.price}</p>
    </Link>
  );
}
