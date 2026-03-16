// Shopify Storefront API Client
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'd-s-hair-beauty.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '47f2402532bd55a6560cba2fa38b5b48';

const API_VERSION = '2025-01';
const API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    console.error('Shopify API errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify API error');
  }

  return json.data;
}

// Get all products
export async function getProducts(first: number = 20) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            productType
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<any>(query, { first });
  
  return data.products.edges.map((edge: any) => {
    const product = edge.node;
    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      name: product.title,
      description: product.description,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags || [],
      price: parseFloat(product.priceRange?.minVariantPrice?.amount || '0'),
      priceRange: product.priceRange,
      currencyCode: product.priceRange?.minVariantPrice?.currencyCode || 'GBP',
      image: product.featuredImage?.url || '',
      featuredImage: product.featuredImage,
      images: product.images?.edges?.map((e: any) => e.node.url) || [],
      variants: product.variants?.edges?.map((e: any) => e.node) || [],
      inStock: product.variants?.edges?.some((e: any) => e.node.availableForSale) || false,
    };
  });
}

// Get single product by handle
export async function getProductByHandle(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        vendor
        productType
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<any>(query, { handle });
  
  if (!data.productByHandle) {
    return null;
  }
  
  const product = data.productByHandle;
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    name: product.title,
    description: product.description,
    vendor: product.vendor,
    productType: product.productType,
    tags: product.tags || [],
    price: parseFloat(product.priceRange?.minVariantPrice?.amount || '0'),
    priceRange: product.priceRange,
    currencyCode: product.priceRange?.minVariantPrice?.currencyCode || 'GBP',
    image: product.featuredImage?.url || '',
    featuredImage: product.featuredImage,
    images: product.images?.edges?.map((e: any) => e.node.url) || [],
    variants: product.variants?.edges?.map((e: any) => e.node) || [],
    inStock: product.variants?.edges?.some((e: any) => e.node.availableForSale) || false,
  };
}

// Create checkout
export async function createCheckout(variantId: string, quantity: number = 1) {
  const query = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: [{ variantId, quantity }],
    },
  };

  const data = await shopifyFetch<any>(query, variables);
  
  if (data.checkoutCreate.checkoutUserErrors?.length > 0) {
    throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
  }
  
  return data.checkoutCreate.checkout;
}

// Format price
export function formatPrice(amount: string | number, currencyCode: string = 'GBP'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
  }).format(num);
}
