import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ProductType = {
  id: number;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  image: string;
  category: string,
  description: string;
  info: string;
  delivery: number;
}

type StoreType = {
  products: ProductType[];
  cart: ProductType[];
  searchProducts: ProductType[];
  searchInput: string
}

type UpdateCartType = {
  id: number; 
  quantity: number 
}

type HandleCartItemsType = {
  index: number,
  method: string,
  quantity: number
}

type UpdateSearchItemsType = {
  searchedProducts: ProductType[]
}

type UpdateSearchInputType = {
  searchedInput: string
}

const initialState: StoreType = {
  products: [],
  cart: [],
  searchProducts: [],
  searchInput: ""
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<StoreType>) => {
      return action.payload;
    },
    updateCart: (state, action: PayloadAction<UpdateCartType>) => {
      const cartIndex = state.cart.findIndex(product => product.id === action.payload.id);
      if (cartIndex === -1) {
        const productIndex = state.products.findIndex(product => product.id === action.payload.id);
        const newProduct = {
          ...state.products[productIndex],
          quantity: action.payload.quantity
        };
        state.cart.unshift(newProduct);
      } else {
        state.cart[cartIndex].quantity = state.cart[cartIndex].quantity + action.payload.quantity;
      }
    },
    handleCartItems: (state, action: PayloadAction<HandleCartItemsType>) => {
      const { index, method, quantity } = action.payload;
      if (method === "increment") {
        state.cart[index].quantity = state.cart[index].quantity + 1;
      } else if (method === "decrement"){
        state.cart[index].quantity = state.cart[index].quantity - 1;
      } else if (method === "update") {
        state.cart[index].quantity = quantity;
      } else if (method === "delete") {
        state.cart.splice(index, 1);
      }
    },
    updateSearchItems: (state, action: PayloadAction<UpdateSearchItemsType>) => {
      const {searchedProducts} = action.payload;
      state.searchProducts = searchedProducts;
    },
    updateSearchInput: (state, action: PayloadAction<UpdateSearchInputType>) => {
      const {searchedInput} = action.payload;
      state.searchInput = searchedInput;
    }
  },
});

export const { setProducts, updateCart, handleCartItems, updateSearchItems, updateSearchInput } = storeSlice.actions;

export default storeSlice.reducer;
export type { StoreType, ProductType };
