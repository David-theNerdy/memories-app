import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({

  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  main: {
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 14,
    backgroundColor: '#f5f5f5',
    padding: '20px',
  }
});
