import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, TextField, AppBar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ChipInput from 'material-ui-chip-input';

import Products from '../Products/Products';
import Form from '../Form/Form';
import { getProducts } from '../../actions/products';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ search, setSearch ] = useState("")
  const [ tags, setTags ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [currentId, dispatch]);

  const searchProduct = (e) => {
    // if (search.trim() || tags.length >0) {
    //   //use redux dispatch to fetch search, modify database
    //   dispatch(getProductsBySearch({ search, tags: tags.join(',') })); //because getProducts take in tags as string. you can't put arry in the URI anyway
    //   navigate(`/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      
    // }else{
    //   e.preventDefault()    //back to home if there is no search term
    //   alert("Please enter search")        
    // }
  }
  const handleKeyPress =(e) =>{       //take in an event 
    if(e.key === "Enter"){
      searchProduct();
    }
  }

  // const handleAdd = (tag) => setTags([...tags, tag])
  // const handleDelete = (tagToDelete) => setTags(tags.filter(el => el !== tagToDelete))


  return (
    <Container maxWidth="lg">

      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Products setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>


            <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                <TextField 
                  name="search"
                  variant="outlined"
                  label="Search by name"
                  fullWidth
                  onKeyPress={handleKeyPress}
                  value={search}
                  onChange={(el)=>{setSearch(el.target.value)}}
                />

                <Button onClick={searchProduct} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
