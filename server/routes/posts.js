import express from 'express';
<<<<<<< HEAD
import { getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
//notice that in the backend we have to add .js to call them
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', getPosts);  //getPosts will be executed when user visit this route (callback function)
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost); 
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost); //this is to prevent user from liking post more than 1

//it is important to mention that the next() in the middleware 'auth' allow then next module to use what is in the middleware
// in this case, getPost, createPost, updatePost,.. will have access to variables had been declared in auth
export default router;

// we will handle the likePost in the backend; updatePost and deletePost in the backend, we will simply remove it from the ui when user don't have permission

//so how  do you handle likePost? 
//Currently the like post does not take in user token, so I think it will need that
// then probably use useState to keep track it
// like button mechanism: true, false for user, count true then show in the UI
=======

import { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost, commentPost } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);
export default router;
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
