import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';
<<<<<<< HEAD
//Reminder: This PostMessage is a model for your message

// Key function take away : find(), findById(id), save(), finyByIdAndUpdate()
// 200 GET successfull, 201 successful CREATE,
// https://restfulapi.net/http-status-codes/
const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();     //Find ? in model
                
        res.status(200).json(postMessages);
    } catch (error) {
=======

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
        res.status(404).json({ message: error.message });
    }
}

<<<<<<< HEAD
export const getPost = async (req, res) => {  
=======
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
<<<<<<< HEAD

=======
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
<<<<<<< HEAD
    // const { title, message, selectedFile, creator, tags } = req.body;

    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() }); //set creator for specific post
                                                                                        //what is toISOString??
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
=======
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
<<<<<<< HEAD
    //inherit from auth middleware
    if(!req.userId) return res.json({ message: "Unauthenticated"})
=======

    if (!req.userId) return res.json({ message: "Unauthenticated" })
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

<<<<<<< HEAD
    const index = post.likes.findIndex((id) => id === String(req.userId))
    
    if(index === -1) {  //findIndex return -1
        //update likes list
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter(el => el !== String(req.userId))
    }


    //change PostMessage schema, like have to include list of user
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

=======
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(comment);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)

export default router;