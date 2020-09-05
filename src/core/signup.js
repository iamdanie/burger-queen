import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
  TextField
} from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'core/contexts/snackbar-context'
import { registerUser } from './redux/actions/users'

const useStyles = makeStyles(({ mixins, spacing }) => ({
  appBarSpacer: mixins.toolbar,
  button: {
    margin: spacing(1)
  },
  logo: {
    marginBottom: spacing(1),
    width: 60
  },
  paper: {
    width: '90%',
    maxWidth: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(3)
  },
  signupButtonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

const initialValues = {
  name: '',
  email: '',
  password: ''
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Your email is invalid')
    .required('Your email is required'),
  name: Yup.string()
    .min(3, 'Your name must be at least 3 characters long')
    .required('Your name is required'),
  password: Yup.string()
    .min(8, 'Your password must be at least 8 characters long')
    .required('Your password is required')
})

const SignUp = () => {
  const classes = useStyles()
  const history = useHistory()
  const snackbar = useSnackbar()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.main)
  const { user } = useSelector(state => state.user)

  const createUser = async payload => dispatch(registerUser(payload))

  const handleOnSubmit = async values => {
    const payload = { ...values }
    try {
      await createUser(payload)
      snackbar('User successfully registered.')
      history.push('/login')
    } catch (err) {
      snackbar(
        `Error: ${err.error ||
        'Something went wrong trying to create your user'}`
      )
    }
  }

  const goToLogin = () => {
    history.push('/login')
  }

  return user ? (
    <Redirect to="/" />
  ) : (
      <>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" gutterBottom>
            Burger Queen
        </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            validationSchema={schema}>
            {({
              errors,
              handleBlur,
              handleChange,
              submitForm,
              touched,
              values
            }) => (
                <>
                  <TextField
                    id="name"
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    value={values.name}
                    onChange={handleChange}
                    inputProps={{
                      onBlur: handleBlur
                    }}
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                    required
                    fullWidth
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={values.email}
                    onChange={handleChange}
                    inputProps={{
                      onBlur: handleBlur
                    }}
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                    required
                    fullWidth
                  />
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={values.password}
                    onChange={handleChange}
                    inputProps={{
                      onBlur: handleBlur
                    }}
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                    required
                    fullWidth
                  />
                  <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={submitForm}>
                    {loading ? 'Creating user' : 'Create User'}
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.signupButtonProgress}
                    />
                  )}
                </>
              )}
          </Formik>
          <Button className={classes.button} color="primary" onClick={goToLogin}>
            Go back to Log In
        </Button>
        </Paper>
      </>
    )
}
export default SignUp
