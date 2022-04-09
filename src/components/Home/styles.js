import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    appBarSearch:{
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
    },
    pagination:{
        borderRadius: 4,
        padding: '16px',
        marginBottom: '1rem',
    },
    gridContainer:{
        [theme.breakpoints.down('xs')] :{
            flexDirection: 'column-reverse',
        },

    },
    searchButton:{
        marginTop: '1rem',
    }

}))