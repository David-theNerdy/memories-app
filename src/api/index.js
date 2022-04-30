import axios from 'axios';

const url = 'http://localhost:5000';
// const API = axios.create({ baseURL: 'https://memories-reactapp.herokuapp.com/'})

export const fetchProducts = () => axios.get(`${url}/products`);
export const fetchProduct = () => axios.get(`${url}/products/:id`);
export const createProduct = (newProduct) => axios.post(`${url}/products`, newProduct);
export const likeProduct = (id) => axios.patch(`${url}/products/${id}/likeProduct`);
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);

export const fetchOrders = () => axios.get(`http://localhost:5000/purchase`);
export const finishOrders = (_id) => axios.patch(`http://localhost:5000/purchase${_id}`);

// API.interceptors.request.use((req) =>{
//     if(localStorage.getItem('profile')){ //where we store the token
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
// })
// // verify token before excute any action by middleware we setted up in backend

// export const fetchProducts = (page) => API.get(`/posts?page=${page}`);
// export const fetchProduct = (id) => API.get(`/posts/${id}`);
// export const createProduct = (newProduct) => API.post('/posts', newProduct);
// export const likeProduct = (id) => API.patch(`/posts/${id}/likeProduct`);
// export const updateProduct = (id, updatedProduct) => API.patch(`/posts/${id}`, updatedProduct);
// export const deleteProduct = (id) => API.delete(`/posts/${id}`);

// export const fetchProductsBySearch  = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);   //this is query parameter

// export const signIn = (formData) => API.post('/user/signin', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);;

//be concised with the backend setup 
//in this case we have set up in the index.js in the server as /user so /users won't work