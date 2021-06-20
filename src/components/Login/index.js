import React, { Component } from 'react'
import './Login.css'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import Logo from '../../assets/nutech.png'
import Facebook from '../../assets/fb-logo.jpg'
import Google from '../../assets/Google-logo.jpg'
import Input from '../Input'
import InputPassword from '../InputPassword'
import { connect } from 'react-redux'
import { login } from '../../redux/action/auth'

class index extends Component {
  state = {
    isMessage: false,
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isMessage: true })
    setTimeout(() => {
      this.setState({ isMessage: false })
    }, 4000)
  }

  loginValidation = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    } else if (!values.password) {
      errors.password = 'Password required'
    } else if (values.password.length < 8) {
      errors.password = 'Minimum password need 8 characters'
    }
    return errors
  }

  async doSignIn(values) {
    this.setState({ isLoading: true })
    await this.props.login(values.email, values.password)
    setTimeout(() => {
      this.setState({ isLoading: false, isMessage: true })
    }, 3000)
    setTimeout(() => {
      this.setState({ isMessage: false })
    }, 6000)
    if (this.props.auth.errorMsg === '') {
      this.props.history.push('/')
    }
  }

  render() {
    const { isMessage, isLoading } = this.state

    return (
      <Container fluid>
        <Row>
          <Col lg={7} className='loginLegend'>
            <div>
              <img src={Logo} alt='...' className='w-100' />
            </div>
          </Col>
          <Col lg={5} className='loginForm'>
            <div className='registerFormImg'><img src={Logo} alt='...' /></div>
            <div className='loginFormTitle'>Sign In</div>
            <div className='loginFormSubtitle'>
              Sign in with your data that you entered during<br />
              your registration
            </div>
            {this.props.auth.message !== '' && isMessage
              ? (
                <Alert variant='success' className='textSuccess'>
                  {this.props.auth.message}
                </Alert>
              )
              : null}
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validate={(values) => this.loginValidation(values)}
              onSubmit={(values, { resetForm }) => {
                this.setState({ isLoading: true })
                this.doSignIn(values)
                setTimeout(() => {
                  resetForm()
                }, 500)
              }}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <>
                  <div className='mb-3'>
                    <Input
                      label='Email'
                      type='email'
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder='Write your email'
                    />
                    {errors.email
                      ? (
                        <div className='textError'>{errors.email}</div>
                      )
                      : null}
                  </div>
                  <div className='mb-3'>
                    <InputPassword
                      label='Password'
                      type='password'
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder='Write your password'
                    />
                    {errors.password
                      ? (
                        <div className='textError'>{errors.password}</div>
                      )
                      : null}
                  </div>
                  {this.props.auth.errorMsg !== '' && isMessage
                    ? (
                      <div className='textError'>
                        {this.props.auth.errorMsg}
                      </div>
                    )
                    : null}
                  {isLoading === true
                    ? (
                      <>
                        <div className='d-flex justify-content-center'>
                          <Spinner animation="border" variant="dark" />
                        </div>
                      </>
                    )
                    : (
                      <>
                        {(!values.email || !values.password) || errors.password
                          ? (
                            <div>
                              < Button variant="secondary" className="loginFormBtn" disabled >Sign In</Button>
                            </div>
                          )
                          : (
                            <div>
                              < Button onClick={handleSubmit} className="loginFormBtn">Sign In</Button>
                            </div>
                          )}
                      </>
                    )}
                </>
              )}
            </Formik>
            <div className="loginFormLogin mt-3">Forgot your password? <span><Link to='/forgetpassword' style={{ color: '#5F2EEA' }}>Reset now</Link></span></div>
            <div className="loginFormLogin my-2">or</div>
            <div className='d-flex justify-content-between'>
              <Link className="loginFormAccount">
                <img src={Google} alt='...' />
                Google
              </Link>
              <Link className="loginFormAccount">
                <img src={Facebook} alt='...' />
                Facebook
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
