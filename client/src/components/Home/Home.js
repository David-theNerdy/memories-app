import React, { useState, useEffect} from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grow, Grid, Paper, TextField, AppBar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination/Pagination';
import { useLocation, useHistory } from 'react-router';
import ChipInput from 'material-ui-chip-input';
import makeStyles from './styles'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
//This will be used as a Hook

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const classes = makeStyles();
    const query = useQuery();
    const location = useLocation();
    const history = useHistory();
    const page = query.get('page') || 1;
    //this will read URL and see if there is 'page' in there, if not it will use 1
    const searchQuery = query.get('searchQuery')
    const [ search, setSearch ] = useState("")
    const [ tags, setTags ] = useState([]);

    useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

    const searchPost = (e) => {
      if (search.trim() || tags.length >0) {
        //use redux dispatch to fetch search, modify database
        dispatch(getPostsBySearch({ search, tags: tags.join(',') })); //because getposts take in tags as string. you can't put arry in the URI anyway
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        
      }else{
        e.preventDefault()    //back to home if there is no search term
        alert("Please enter search")        
      }
    }

    const handleKeyPress =(e) =>{       //take in an event 
      if(e.key === "Enter"){
        //search for the post: 13 is Enter
        searchPost();
      }
    }

    const handleAdd = (tag) =>setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter(el => el !== tagToDelete))



    return (
        <Grow in>
        <Container maxWidth='xl'>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
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
                <ChipInput 
                  style={{margin: '10px 0' }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label='Search Tags'
                  variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>

              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6} ><Paginate className={classes.pagination} /></Paper>
            </Grid>

          </Grid>
        </Container>
      </Grow>
    )
}

export default Home
