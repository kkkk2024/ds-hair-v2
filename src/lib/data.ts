// Mock product data
export interface Product {
  id: string;
  handle: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  isBestseller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Clip-In',
    slug: 'clip-in',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop'
  },
  {
    id: '2',
    name: 'Tape-In',
    slug: 'tape-in',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop'
  },
  {
    id: '3',
    name: 'Ponytails',
    slug: 'ponytails',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=600&fit=crop'
  },
  {
    id: '4',
    name: 'Wefts',
    slug: 'wefts',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop'
  }
];

export const products: Product[] = [
  {
    id: '1',
    handle: 'silk-seam-clip-in-set',
    name: 'Silk Seam Clip-In Set',
    price: 189,
    description: 'Premium silk seam clip-in hair extensions. Seamless and invisible. 100% Remy human hair.',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop'
    ],
    category: 'Clip-In',
    tags: ['bestseller', 'premium'],
    inStock: true,
    isBestseller: true
  },
  {
    id: '2',
    handle: 'tape-in-extensions',
    name: 'Tape-In Extensions',
    price: 220,
    description: 'Professional tape-in extensions. Thin and lightweight. Can be reused up to 3 times.',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop'
    ],
    category: 'Tape-In',
    tags: ['professional'],
    inStock: true
  },
  {
    id: '3',
    handle: 'ponytail-extension',
    name: 'Luxury Ponytail',
    price: 89,
    description: 'Premium quality ponytail extension. Easy to attach. Available in 20+ colors.',
    images: [
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=800&fit=crop'
    ],
    category: 'Ponytails',
    tags: ['new'],
    inStock: true
  },
  {
    id: '4',
    handle: 'hand-tied-weft',
    name: 'Hand-Tied Weft',
    price: 165,
    description: 'Premium hand-tied weft. Ultra-thin and comfortable. 100% Virgin human hair.',
    images: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=800&fit=crop'
    ],
    category: 'Wefts',
    tags: ['premium'],
    inStock: true
  },
  {
    id: '5',
    handle: 'seamless-clip-in-18',
    name: 'Seamless Clip-In 18"',
    price: 199,
    description: '18 inch seamless clip-in extensions. Double-drawn for volume. Natural blend.',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop'
    ],
    category: 'Clip-In',
    tags: ['bestseller'],
    inStock: true,
    isBestseller: true
  },
  {
    id: '6',
    handle: 'invisi-tape-pro',
    name: 'Invisi-Tape Pro',
    price: 245,
    description: 'Invisible tape technology. Medical-grade adhesive. Damage-free application.',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop'
    ],
    category: 'Tape-In',
    tags: ['professional', 'premium'],
    inStock: true
  },
  {
    id: '7',
    handle: 'clip-ponytail-16',
    name: 'Clip-On Ponytail 16"',
    price: 75,
    description: '16 inch clip-on ponytail. Heat resistant. Can be styled with hot tools.',
    images: [
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=800&fit=crop'
    ],
    category: 'Ponytails',
    tags: ['new'],
    inStock: true
  },
  {
    id: '8',
    handle: 'machine-weft-std',
    name: 'Machine Weft Standard',
    price: 120,
    description: 'Economical machine weft. Durable construction. Perfect for salons.',
    images: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=800&fit=crop'
    ],
    category: 'Wefts',
    tags: ['professional'],
    inStock: true
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    text: 'Absolutely love my new hair! The quality is amazing and they look so natural. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Emma L.',
    text: 'Best extensions I have ever tried. Easy to apply and super comfortable. Will definitely buy again!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Jessica K.',
    text: 'The team at D.S Hair is amazing! They helped me find the perfect match for my hair.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
  }
];

export const instagramPosts = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
];

export function getProduct(handle: string): Product | undefined {
  return products.find(p => p.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getBestsellers(): Product[] {
  return products.filter(p => p.isBestseller);
}
