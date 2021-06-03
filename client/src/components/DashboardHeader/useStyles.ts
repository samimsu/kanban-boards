import { makeStyles } from '@material-ui/core/styles';

const primaryColor = '#759CFC';

const useStyles = makeStyles(() => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
    },
    dashboardButton: {
        color: primaryColor,
        marginRight: 15,
    },
    calendarButton: {
        marginLeft: 15,
    },
    createBoardButton: {
        backgroundColor: primaryColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
    },
    avatar: {
        alignSelf: 'flex-end',
        marginLeft: 50,
        marginRight: 50,
    },
}));

export default useStyles;
