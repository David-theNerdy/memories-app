import React from 'react'
import { Pagination, PaginationItem} from '@material-ui/lab'
import  makeStyles  from './styles'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../actions/products'

const Paginate = ({page}) => {
    const classes = makeStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.products)


    useEffect(() => {
        if(page) dispatch(getProducts(page))

    },[page])

    return (
        <Pagination 
            className={{ ul : classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link}  to={`/products?page=${item.page}`} />
            )}
        />  
            
        
    )
}

export default Paginate;

// renderItem return the callback function (): immediately return parentheses