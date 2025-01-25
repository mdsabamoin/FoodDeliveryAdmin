import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = 'https://fooddeliveryapp-406eb-default-rtdb.firebaseio.com'; // Replace with your actual API URL

// Fetch categories from the server
export const fetchCategories = createAsyncThunk(
  'admin/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories.json`);
      const data = response.data;

      // Firebase stores data as an object, so we need to map it to an array
      const categories = Object.keys(data || {}).map((key) => ({
        id: key, // The unique ID for the category
        ...data[key], // Spread the category details
      }));

      return categories; // Return the formatted array of categories
    } catch (error) {
      // Pass the error to the rejected action
      return rejectWithValue(
        error.response?.data || 'Failed to fetch categories from the server'
      );
    }
  }
);


// Fetch recipes from the server
export const fetchRecipes = createAsyncThunk(
  'admin/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/recipes.json`);
      const data = response.data;

      // Firebase stores data as an object, so we need to map it to an array
      const recipes = Object.keys(data || {}).map((key) => ({
        id: key, // The unique ID for the recipe
        ...data[key], // Spread the recipe details
      }));

      return recipes; // Return the formatted array of recipes
    } catch (error) {
      // Pass the error to the rejected action
      return rejectWithValue(
        error.response?.data || 'Failed to fetch recipes from the server'
      );
    }
  }
);


// Fetch orders from the server
export const fetchOrders = createAsyncThunk(
  'admin/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/orders.json`);
      const data = response.data;

      // Transform the response data into an array with IDs
      const orders = Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }));

      return orders;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch orders');
    }
  }
);

// Create a new category
export const createCategory = createAsyncThunk(
  'admin/createCategory',
  async ({ categoryName, preview }, { rejectWithValue }) => {
    try {
      // Post the category data to Firebase
      const response = await axios.post(`${API_URL}/categories.json`, {
        categoryName,
        preview,
      });

      // Firebase returns an object with a unique `name` field as the generated ID
      const id = response.data.name;

      // Combine the `id` and the posted object into one
      return { id, categoryName, preview };
    } catch (error) {
      // Use rejectWithValue to pass error details to the rejected action
      return rejectWithValue(error.response?.data || 'Failed to upload data and images');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async ({ id, categoryName, preview }, { rejectWithValue }) => {
    try {
      // Update the category data in Firebase
      await axios.put(`${API_URL}/categories/${id}.json`, {
        categoryName,
        preview,
      });

      // Return the updated data along with the ID
      return { id, categoryName, preview };
    } catch (error) {
      // Use rejectWithValue to pass error details to the rejected action
      return rejectWithValue(error.response?.data || 'Failed to update category');
    }
  }
);




// Create a new recipe
export const createRecipe = createAsyncThunk('admin/createRecipe',
   async ({recipeName,selectedCategory,ingredients,price,preview},{ rejectWithValue }) => {

    try{
      const response = await axios.post(`${API_URL}/recipes.json`,
         {recipeName,selectedCategory,ingredients,price,preview});
         const id = response.data.name;
         return { id, recipeName, selectedCategory, ingredients, price, preview };

    }catch(error){
      return rejectWithValue(error.response?.data || 'Failed to upload data and images');
    }
  
});

export const updateRecipe = createAsyncThunk(
  'admin/updateRecipe',
  async ({ id, recipeName, selectedCategory, ingredients, price, preview }, { rejectWithValue }) => {
    try {
      // Update recipe details in Firebase
      const response = await axios.put(`${API_URL}/recipes/${id}.json`, {
        recipeName,
        selectedCategory,
        ingredients,
        price,
        preview,
      });
      
      // Return updated recipe details
      if(response.data){
        return { id, recipeName, selectedCategory, ingredients, price, preview };
      }
      
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update the recipe');
    }
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      // Delete the category from Firebase using its ID
      await axios.delete(`${API_URL}/categories/${categoryId}.json`);

      // Return the ID of the deleted category to update the state
      return categoryId;
    } catch (error) {
      // Use rejectWithValue to pass error details to the rejected action
      return rejectWithValue(error.response?.data || 'Failed to delete category');
    }
  }
);


// Delete a recipe
export const deleteRecipe = createAsyncThunk(
  'admin/deleteRecipe',
  async ({ id }, { rejectWithValue }) => {
    try { 
      const response = await axios.delete(`${API_URL}/recipes/${id}.json`);
      
        
        return {id}; // Return the ID of the deleted recipe
      
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete the recipe.');
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, status,customerName,totalprice,items }, { rejectWithValue }) => {
    try {
      // Update the order status in Firebase
      const response = await axios.put(`${API_URL}/orders/${orderId}.json`, { orderId, status,customerName,totalprice,items });

      // Return the updated order data
      return { orderId, status,customerName,totalprice,items };
    } catch (error) {
      // Use rejectWithValue to pass error details to the rejected action
      return rejectWithValue(error.response?.data || 'Failed to update order status');
    }
  }
);


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    categories: [],
    recipes: [],
    orders: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
    });

    // Fetch recipes
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchRecipes.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateRecipe.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      state.loading = false;

      // Update the recipe in the state
      const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = { ...state.recipes[index], ...action.payload };
      }
    });

    builder.addCase(updateRecipe.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;

      // Update the recipe in the state
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...action.payload };
      }
    });

    builder.addCase(updateCategory.rejected, (state) => {
      state.loading = false;
    });

    // Fetch orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.loading = false;
    });

    // Create a category
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });

    // Create a recipe
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.recipes.push(action.payload);
    });

    // Delete a category
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    });

    // Delete a recipe
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload.id);
    });

    // Update order status

    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const updatedOrder = action.payload;
    
      state.loading = false;
      const index = state.orders.findIndex((order) => order.id === updatedOrder.orderId);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...action.payload };
      }
    });

    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.loading = false;
    });
  },
});



export default adminSlice.reducer;
