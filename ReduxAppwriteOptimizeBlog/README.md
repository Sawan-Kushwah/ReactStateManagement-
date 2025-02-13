#Key take away from this project !!

=> Use RTK for fetching the data as it provide us caching and optimistic update in UI

=> Use Redux to avoide Prop drilling in every component and manage the multiple state in much better way 

=> Use Selector for avoiding unnecessary re rendering even when there is no change in state it get re render in useSelector, 
if selected state (eg we are selecting active status post and we have added inactive status post then it
doesn't get re render as no change in state occur 

Note : selector is only useful when you are filtering , shorting , selecting , not benifical when you just want to see state 

``` javascript
// src/app/store.js 
import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../features/products/productApi';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

___________________________________________________________________

// src/features/products/productApi.js // RTK
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ['Products'], // For re fetching
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'], // as this funtion get exceuted then refetching 
      async onQueryStarted(product, { dispatch, queryFulfilled }) { // optimistic update in UI
        const tempId = Date.now(); 
        const patchResult = dispatch(
          productApi.util.updateQueryData('getProducts', undefined, (draft) => {
            draft.push({ id: tempId, ...product });
          })
        );
        try {
          const { data } = await queryFulfilled; // Actual data from database where we get the actual id from database
          dispatch(
            productApi.util.updateQueryData('getProducts', undefined, (draft) => { // replace the temp id and add actual id
              const index = draft.findIndex((p) => p.id === tempId);
              if (index !== -1) draft[index].id = data.id;
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Products'],
      async onQueryStarted({ id, ...product }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApi.util.updateQueryData('getProducts', undefined, (draft) => {
            const index = draft.findIndex((p) => p.id === id);
            if (index !== -1) draft[index] = { id, ...product };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApi.util.updateQueryData('getProducts', undefined, (draft) => {
            return draft.filter((product) => product.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;

____________________________________________________________________________________________________________________________________

// src/features/products/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'; // redux tool kit provide it import from there

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
  },
});

export const { setProducts } = productSlice.actions; // manual data adding if needed else of no use
export default productSlice.reducer;

// Reselect Selector for filtering product by ID
export const selectProducts = (state) => state.products;
export const selectProductById = createSelector(
  [selectProducts, (state, productId) => productId], // const product = useSelector(state => selectProductById(state , id));
  (products, productId) => products.find((product) => product.id === productId)
);

____________________________________________________________________________________________________________________________________________________

// src/components/ProductManager.js
import { useState } from 'react';
import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../features/products/productApi';
import { useSelector } from 'react-redux';
import { selectProductById } from '../features/products/productSlice';

const ProductManager = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  
  const selectedProduct = useSelector((state) => selectProductById(state, editId));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateProduct({ id: editId, title, price });
      setEditId(null);
    } else {
      await addProduct({ title, price });
    }
    setTitle('');
    setPrice('');
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title} - ${product.price}
              <button onClick={() => { setEditId(product.id); setTitle(product.title); setPrice(product.price); }}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductManager;
```
