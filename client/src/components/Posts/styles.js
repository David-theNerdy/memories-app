import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  loading:{
    position: 'relative',
    left: '45%',
    width: '100%',
    top: '35%',
    zIndex: '1000',
    height: '100%',
  }
}));
