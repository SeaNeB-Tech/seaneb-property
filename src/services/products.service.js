import api from "./api";
import { getDefaultProductKey } from "./pro.service";

const normalizeProducts = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
};

export const getProducts = async () => {
  try {
    const productKey = getDefaultProductKey();
    const response = await api.get("/products", {
      params: { product_key: productKey },
      timeout: 8000,
    });

    return normalizeProducts(response?.data);
  } catch (error) {
    console.error("Failed to fetch products:", {
      status: error?.response?.status,
      code: error?.response?.data?.code,
      message: error?.response?.data?.message,
      errorMessage: error?.message,
    });
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    const productKey = getDefaultProductKey();
    const response = await api.get(`/products/${productId}`, {
      params: { product_key: productKey },
      timeout: 8000,
    });

    return response?.data || null;
  } catch (error) {
    console.error(`Failed to fetch product ${productId}:`, {
      status: error?.response?.status,
      message: error?.response?.data?.message || error?.message,
    });

    return null;
  }
};

export const searchProducts = async (query) => {
  try {
    if (!query) {
      throw new Error("Search query is required");
    }

    const productKey = getDefaultProductKey();
    const response = await api.get("/products/search", {
      params: {
        query: String(query).trim(),
        product_key: productKey,
      },
      timeout: 8000,
    });

    return normalizeProducts(response?.data);
  } catch (error) {
    console.error("Search failed:", {
      status: error?.response?.status,
      message: error?.response?.data?.message || error?.message,
    });

    return [];
  }
};
