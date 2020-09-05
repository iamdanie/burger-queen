const MOBILE_BREAKPOINT = 'md'

const styles = ({ breakpoints, mixins, palette, spacing }) => ({
    actionsContainer: {
        display: 'flex'
    },
    cancelButton: {
        marginRight: spacing(2)
    },
    createButtonWrapper: {
        position: 'relative'
    },
    createButton: {
        color: palette.common.white
    },
    createButtonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
    paper: {
        ...mixins.gutters(),
        paddingTop: spacing(2),
        paddingBottom: spacing(2),
        marginTop: spacing(2),
        marginLeft: spacing(1),
        marginRight: spacing(1),
        width: '100%'
    },
    screenHeaderContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    viewDetail: {
        display: 'flex',
        [breakpoints.down(MOBILE_BREAKPOINT)]: {
            flexDirection: 'column',
            marginRight: spacing(8)
        },
        [breakpoints.up(MOBILE_BREAKPOINT)]: {
            flexDirection: 'row',
            marginRight: spacing(0)
        },
        justifyContent: 'space-between'
    },
    orderItems: {
        marginTop: spacing(1),
        marginBottom: spacing(1),
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '250px'
    },
    menuItems: {
        marginTop: spacing(1),
        marginBottom: spacing(1),
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '510px'
    },
    orderItem: {
        padding: spacing(2),
        marginBottom: spacing(1),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: spacing(1),
        marginBottom: spacing(1),
        cursor: 'pointer'
    },
    flex1: {
        flex: 1
    },
    amountSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    black: {
        background: palette.primary.main,
        color: palette.common.white
    },
    disabledButton: {
        padding: spacing(1.5)
    },
    formControl: {
        margin: spacing(1),
        minWidth: 120
    },
    orderHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: spacing(2)
    }
})

export default styles
