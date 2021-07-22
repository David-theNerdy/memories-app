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
        marignTop: '1rem',
        padding: '16px',
    },
    gridContainer:{
        [theme.breakpoints.down('xs')] :{
            flexDirection: 'column-reverse',
        }
    },
}))