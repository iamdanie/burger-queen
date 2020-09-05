import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core'
import { APP_PATH } from '../constants'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import { useSelector, useDispatch } from 'react-redux'
import { logoutCurrentUser } from 'core/redux/actions/users'

const useLayoutStyles = makeStyles(({ mixins, spacing, zIndex }) => ({
  app: {
    display: 'flex'
  },
  appBar: {
    zIndex: zIndex.drawer + 1
  },
  bar: {
    display: 'flex',
    flexDirection: 'row'
  },
  appLink: {
    display: 'flex',
    flex: 1,
    textDecoration: 'none',
    color: '#fff',
    justifyContent: 'flex-start'
  },
  logoutSection: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  main: {
    flexGrow: 1,
    padding: spacing(3)
  },
  toolbar: mixins.toolbar
}))

export default function Layout({ children }) {
  const classes = useLayoutStyles()
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const logoutUser = async () => dispatch(logoutCurrentUser())

  const handleLogout = async () => {
    await logoutUser()
    history.push('/')
  }

  return (
    <div className={classes.app}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.bar}>
          <Link to={APP_PATH} className={classes.appLink}>
            <Typography component="h1" variant="h6" color="inherit">
              Burger Queen
            </Typography>
          </Link>
          <div className={classes.logoutSection}>
            <Typography component="h2" variant="h6" color="inherit">
              {user.name}
            </Typography>
            <IconButton
              aria-label="Logout"
              color="inherit"
              onClick={handleLogout}
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}
