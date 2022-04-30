import { 
  FETCH_ALL, 
  FETCH_BY_SEARCH , 
  CREATE, UPDATE, DELETE, 
  LIKE, START_LOADING, 
  END_LOADING, FETCH_PRODUCT, 
} from '../constants/actionTypes';

import * as api from '../api/index.js'; 



export const getProducts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data } = await api.fetchProducts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try{
    dispatch({ type: START_LOADING})
    const { data } = await api.fetchProduct(id);
    dispatch({ type: FETCH_PRODUCT, payload: data});
    dispatch({ type: END_LOADING})
  }catch (error) {
    console.log(error.message);
  }
}



// export const getProductsBySearch = (searchQuery) => async (dispatch) => {
//   try{
//     dispatch({ type: START_LOADING}) 
//     const { data : {data} } = await api.fetchProductsBySearch(searchQuery); //searchQuery form Home //10 from products/action/server
//     dispatch({ type: FETCH_BY_SEARCH, payload: data }); //this will match the search result and the UI
//     dispatch({ type: END_LOADING})
//   }catch (error) {
//     console.log(error.message);
//   }
// }

export const createProduct = (product, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    console.log(product)
    const { data } = await api.createProduct(product).then(res => alert(res.status)).catch(err => alert(err.message));
  
    dispatch({ type: CREATE, payload: data });

    dispatch({ type: END_LOADING})
    {/*create a product currently donot update UI*/}
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, product);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeProduct(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
