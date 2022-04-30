import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likeProduct, deleteProduct } from '../../../actions/products';
import useStyles from './styles';

const Product = ({ product, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
        {/* Image */}
      <CardMedia className={classes.media} image={product.image[0] || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={product.title} />
      <div className={classes.overlay}>
        {/* Product Name */}
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{moment(product.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(product._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div>
      {/* Categories */}
      <div className={classes.details}>
        <Typography variant="body1" color="primary" component="h2">Categories</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{product.categories.map((tag) => `#${tag} `)}</Typography>
      </div>
      {/* Color */}
      <div className={classes.details}>
        <Typography variant="body1" color="primary" component="h2">Color</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{product?.color.map((color) => `#${color} `)}</Typography>
      </div>
      {/* Price */}
      <div className={classes.details}>
        <Typography variant="body1" color="primary" component="h2">Price</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{product.price} VND</Typography>
      </div>
      {/* Quantity */}
      <div className={classes.details}>
        <Typography variant="body1" color="primary" component="h2">Quantity</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{product.quantity}</Typography>
      </div>
      <CardContent>
        {/* Description */}
        <Typography variant="body2" color="textSecondary" component="p">{product.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteProduct(product._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Product;
