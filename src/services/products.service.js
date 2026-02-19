import axios from "axios";
import { getDefaultProductKey } from "./pro.service";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

const PRODUCTS_API_BASE = API_BASE_URL;

/**
 * Fetch all active products
 * GET /api/v1/products
 *
 * Returns: Array of products [{ product_id, product_key, product_name }]
 * Note: Use direct axios (not auth-interceptor api) because products listing is public
 * and should not trigger auth refresh attempts for unauthenticated users.
 */
export const getProducts = async () => {
  try {
    console.log(" Fetching all products (public endpoint)...");

    const productKey = getDefaultProductKey();
    console.log(" Using product key:", productKey);

    // GET /products with product_key parameter — use plain axios to avoid auth interceptor
    const response = await axios.get(`${PRODUCTS_API_BASE}/products`, {
      params: { product_key: productKey },
      withCredentials: false,
      timeout: 5000
    });

    console.log(" Raw response:", response.data);

    // Response is array directly: [{ product_id, product_key, product_name }, ...]
    let products = [];
    
    if (Array.isArray(response.data)) {
      products = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      products = response.data.data;
    } else if (response.data?.products && Array.isArray(response.data.products)) {
      products = response.data.products;
    }

    console.log(` All products fetched:`, {
      count: products.length,
      products,
    });

    return products;
  } catch (error) {
    console.error(" Failed to fetch products:", {
      status: error.response?.status,
      code: error.response?.data?.code,
      message: error.response?.data?.message,
      fullError: error.response?.data,
      errorMessage: error.message,
    });

    return [];
  }
};

/**
 * Get single product details
 * GET /api/v1/products/:id
 */
export const getProductById = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    console.log(` Fetching product ${productId} (public endpoint)...`);

    const productKey = getDefaultProductKey();
    const response = await axios.get(`${PRODUCTS_API_BASE}/products/${productId}`, {
      params: { product_key: productKey },
      withCredentials: false,
      timeout: 5000
    });

    console.log(` Product ${productId} fetched`, response.data);

    return response.data;
  } catch (error) {
    console.error(` Failed to fetch product ${productId}:`, {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    return null;
  }
};

/**
 * Search products by name or filter
 * GET /api/v1/products/search?query=...
 */
export const searchProducts = async (query) => {
  try {
    if (!query) {
      throw new Error("Search query is required");
    }

    console.log(` Searching products (public endpoint): "${query}"`);

    const productKey = getDefaultProductKey();
    const response = await axios.get(`${PRODUCTS_API_BASE}/products/search`, {
      params: {
        query: String(query).trim(),
        product_key: productKey
      },
      withCredentials: false,
      timeout: 5000
    });

    const results = response.data?.products || response.data || [];

    console.log(` Search results:`, {
      query,
      count: Array.isArray(results) ? results.length : 0,
      results,
    });

    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error(" Search failed:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    return [];
  }
};
