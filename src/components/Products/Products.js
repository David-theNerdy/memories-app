import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { uesEffect } from 'react'
import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ setCurrentId }) => {
  const {products} = useSelector((state) => state.products);
  const classes = useStyles();
  const isLoading = products?.length === 0;
  if(!products?.length && !isLoading) return <>No product found.</>
  
  return (
    isLoading ? <CircularProgress className={classes.loading}/> : (
      <Grid className={classes.mainContainer} container alignItems="stretch" spacing={1}>
        
        {products?.map((product) => (
          
          <Grid key={product._id} item xs={12} sm={12} md={6} lg={6}>
            <Product product={product} setCurrentId={setCurrentId} />
          </Grid>
          
        ))}
      </Grid>
    )
  );
};

export default Products;

//CircularProgress : loading vector in material ui

//Callback from bootstrap: xs={12} show 1 column on xs devices lg={3} =>show 4 per row



