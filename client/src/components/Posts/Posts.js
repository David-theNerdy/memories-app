import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { uesEffect } from 'react'
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const {posts, isLoading} = useSelector((state) => state.posts);
  const classes = useStyles();


  if(!posts.length && !isLoading) return <>No post found.</>
  
  return (
    isLoading ? <CircularProgress className={classes.loading}/> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        
        {posts.map((post) => (
          
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
          
        ))}
      </Grid>
    )
  );
};

export default Posts;

//CircularProgress : loading vector in material ui

//Callback from bootstrap: xs={12} show 1 column on xs devices lg={3} =>show 4 per row