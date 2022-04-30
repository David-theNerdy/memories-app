import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { useNavigate } from 'react-router-dom'
import useStyles from './styles';
import { createProduct, updateProduct } from '../../actions/products';

import Select from 'react-select'

const ProductCategories = [
  { value: 'bandeaukini', label: 'Bandeaukini' },
  { value: 'flounce-bikini', label: 'Flounce Bikini' },
  { value: 'string-bikin', label: 'String Bikini' },
  { value: 'trikini', label: 'Trikini' },
  { value: 'sling-bikini', label: 'Sling Bikini' },
  { value: 'high-waisted-bikini', label: 'High-Waisted Bikini' }
]

const ColorList = [
  { value: '#FF0000', label: 'Red' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' },
  { value: '#87CEEB', label: 'Blue' },
  { value: '#32CD32', label: 'Green' },
  { value: '#FFFF00', label: 'Yellow' },
  { value: '#FFB6C1', label: 'Pink' },
  { value: '#FFD580', label: 'Orange' },
  { value: '#E6E6FA', label: 'Purple' }
]

const Form = ({ currentId, setCurrentId }) => {
  const [productData, setProductData] = useState({ 
    name: '', 
    categories: [], 
    price: 0, 
    image: [], 
    description: '', 
    quantity: 0, 
    color: [], 
    customPermalink: '' });
  const product = useSelector((state) => (currentId ? state.products.products.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  
  const navigate = useNavigate();
  const currentUSer = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (product) setProductData(product);    //check if there is any change in product, then execute the code
  }, [product]);

  const clear = () => {
    setCurrentId(0);
    setProductData({ name: '', categories: [], price: 0, image: [], description: '', quantity: 0, color: [], customPermalink: '' });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      if(productData.image.length ==0) return alert('Please upload an image');
      if(productData.name === '') return alert('Please enter a name');
      if(typeof productData.price != 'number' ) return alert('Please enter a number for price');
      if(productData.description === '') return alert('Please enter a description');
      if(typeof productData.quantity != 'number' ) return alert('Please enter a number for quantity');
      if(productData.quantity == 0 ) return alert('Please enter a quantity greater than 0');

      dispatch(createProduct({...productData, 
        customPermalink: productData.name.toLowerCase().replace(/ /g, '-'), 
        categories: productData.categories.map(e => e.trim()),
        color: productData.color.map(e => e.trim())}, 
        navigate));
        

      clear();
    } else {
      dispatch(updateProduct(currentId, {...productData}));
      clear();
    }
  };

  if(!currentUSer?.result?.name){
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">Please SIGN IN</Typography>
      </Paper>
    )
  }



  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
       
        <Typography variant="h6">{currentId ? `Editing "${product.name}"` : 'Creating a Product'}</Typography>
        {/* Name */}
        <TextField name="name" variant="outlined" label="Name" fullWidth 
          value={productData.name} 
          onChange={(e) => setProductData({ ...productData, name: e.target.value, customPermalink: e.target.value })} 
        />
        {/* Description */}
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline minRows={2} 
          value={productData.description} 
          onChange={(e) => setProductData({ ...productData, description: e.target.value })} 
        />
        {/* Categories */}
        <div>Categories</div>
        <Select
          defaultValue={[]}
          isMulti
          name="category"
          options={ProductCategories}
          className={classes.select} 
          classNamePrefix="select"
          onChange={(e) => setProductData({ ...productData, categories: e.map(e => e.value) })}
        />
        <div>Color</div>
        <Select
          defaultValue={[]}
          isMulti
          name="color"
          options={ColorList}
          className={classes.select} 
          classNamePrefix="select"
          onChange={(e) => setProductData({ ...productData, color: e.map(e => e.value) })}
        />

        {/* Color */}
        {/* Price */}
        <TextField name="price" variant="outlined" label="Price" fullWidth 
          value={productData.price} 
          onChange={(e) => setProductData({ ...productData, price: +(e.target.value) })} 
        />
        {/* Quantity */}
        <TextField name="quantity" variant="outlined" label="Quantity" fullWidth 
          value={productData.quantity} 
          onChange={(e) => setProductData({ ...productData, quantity: +(e.target.value) })} 
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, image: [...productData.image, base64] })} />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, image: [...productData.image, base64] })} />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, image: [...productData.image, base64] })} />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, image: [...productData.image, base64] })} />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, image: [...productData.image, base64] })} />
        </div>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, image: [...productData.image, base64] })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

// Choose file in computer with FileBase from react-file-base64

export default Form;
