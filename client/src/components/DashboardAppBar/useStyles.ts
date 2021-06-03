import { makeStyles } from '@material-ui/core/styles';

const primaryColor = '#759CFC';

const useStyles = makeStyles(() => ({
    appbar: {
        position: 'static',
        backgroundColor: primaryColor,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    menuIcon: {
        color: 'white',
    }
}));

export default useStyles;