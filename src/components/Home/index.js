import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, TextField, AppBar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ search, setSearch ] = useState("")
  const [ tags, setTags ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = (e) => {
    if (search.trim() || tags.length >0) {
      //use redux dispatch to fetch search, modify database
      dispatch(getPostsBySearch({ search, tags: tags.join(',') })); //because getposts take in tags as string. you can't put arry in the URI anyway
      navigate(`/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      
    }else{
      e.preventDefault()    //back to home if there is no search term
      alert("Please enter search")        
    }
  }
  const handleKeyPress =(e) =>{       //take in an event 
    if(e.key === "Enter"){
      searchPost();
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
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>


            <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                <TextField 
                  name="search"
                  variant="outlined"
                  label="Search memory"
                  fullWidth
                  onKeyPress={handleKeyPress}
                  value={search}
                  onChange={(el)=>{setSearch(el.target.value)}}
                />

                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
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
