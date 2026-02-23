import api from "./api";
import { getDefaultProductKey } from "./product.service";

const normalizeProducts = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data?.results)) return payload.data.results;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  if (Array.isArray(payload?.data?.product)) return payload.data.product;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.product)) return payload.product;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const DEFAULT_PRODUCT_KEY = "property";
const DEFAULT_PRODUCT_NAME = "property";
const DEFAULT_PRODUCTS = [{ product_key: DEFAULT_PRODUCT_KEY, product_name: DEFAULT_PRODUCT_NAME }];

const dedupeProducts = (products = []) => {
  const seen = new Set();
  return (Array.isArray(products) ? products : []).filter((item) => {
    const key = String(item?.product_id || item?.id || item?.product_key || "").trim();
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const createDefaultProductIfMissing = async () => {
  try {
    await api.post("/products", {
      product_key: DEFAULT_PRODUCT_KEY,
      product_name: DEFAULT_PRODUCT_NAME,
    });
    return true;
  } catch (error) {
    // 409 means already exists; treat as success and refetch.
    if (Number(error?.response?.status || 0) === 409) return true;
    return false;
  }
};

export const getProducts = async () => {
  const productKey = getDefaultProductKey() || DEFAULT_PRODUCT_KEY;
  const attempts = [
    () =>
      api.get("/products", {
        params: { product_key: productKey },
        timeout: 8000,
      }),
    () => api.get("/products", { timeout: 8000 }),
  ];

  try {
    let lastError = null;

    for (const run of attempts) {
      try {
        const response = await run();
        const products = dedupeProducts(normalizeProducts(response?.data));
        if (products.length > 0) return products;
      } catch (error) {
        const status = Number(error?.response?.status || 0);
        if (status === 401 || status === 403) throw error;
        lastError = error;
      }
    }

    const created = await createDefaultProductIfMissing();
    if (created) {
      for (const run of attempts) {
        try {
          const response = await run();
          const products = dedupeProducts(normalizeProducts(response?.data));
          if (products.length > 0) return products;
        } catch (error) {
          const status = Number(error?.response?.status || 0);
          if (status === 401 || status === 403) throw error;
          lastError = error;
        }
      }
    }

    if (lastError) {
      console.error("Failed to fetch products:", {
        status: Number(lastError?.response?.status || 0),
        code: lastError?.response?.data?.code,
        message: lastError?.response?.data?.message,
        errorMessage: lastError?.message,
      });
    }

    return DEFAULT_PRODUCTS;
  } catch (error) {
    const status = Number(error?.response?.status || 0);
    if (status === 401 || status === 403) {
      throw error;
    }

    console.error("Failed to fetch products:", {
      status,
      code: error?.response?.data?.code,
      message: error?.response?.data?.message,
      errorMessage: error?.message,
    });
    return DEFAULT_PRODUCTS;
  }
};

export const getProductById = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    const productKey = getDefaultProductKey() || DEFAULT_PRODUCT_KEY;
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

    const productKey = getDefaultProductKey() || DEFAULT_PRODUCT_KEY;
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


