import axios from 'axios';
import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    if (get().products.length > 0) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:5002/api/v1/products');
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ error: 'Error fetching products', loading: false });
    }
  }
}));

export default useProductStore;