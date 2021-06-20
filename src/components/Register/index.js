import React, { Component } from 'react'
import './Register.css'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import Logo from '../../assets/nutech.png'
import Facebook from '../../assets/fb-logo.jpg'
import Google from '../../assets/Google-logo.jpg'
import Input from '../Input'
import InputPassword from '../InputPassword'
import { connect } from 'react-redux'
import { register } from '../../redux/action/auth'

class index extends Component {
  state = {
    isMessage: false,
    isLoading: false,
    checked: false
  }

  registerValidation = (values) => {
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

  async doSignUp(values) {
    this.setState({ isLoading: true })
    await this.props.register(values.email, values.password)
    setTimeout(() => {
      this.setState({ isLoading: false, isMessage: true })
    }, 3000)
    setTimeout(() => {
      this.setState({ isMessage: false })
    }, 6000)
    if (this.props.auth.errorMsg === '') {
      this.props.history.push('/login')
    }
  }

  render() {
    const { isMessage, isLoading, checked } = this.state

    return (
      <Container fluid>
        <Row>
          <Col lg={7} className='registerLegend'>
            <img src={Logo} alt='...' />
          </Col>
          <Col lg={5} className='registerForm'>
            <div className='registerFormImg'><img src={Logo} alt='...' /></div>
            <div className='registerFormTitle'>Fill your additional details</div>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validate={(values) => this.registerValidation(values)}
              onSubmit={(values, { resetForm }) => {
                this.setState({ isLoading: true })
                this.doSignUp(values)
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
                  <div className='mb-3'>
                    <label className="registerFormCheckBox">I agree to terms & conditions
                      <input type="checkbox" onClick={() => this.setState({ checked: !checked })} />
                      <span className="checkmark"></span>
                    </label>
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
                        {(!values.email || !values.password) || errors.password || checked === false
                          ? (
                            <div>
                              < Button variant="secondary" className="registerFormBtn" disabled >Join for free now</Button>
                            </div>
                          )
                          : (
                            <div>
                              < Button variant="outline-light" onClick={handleSubmit} className="registerFormBtn">Join for free now</Button>
                            </div>
                          )}
                      </>
                    )}
                </>
              )}
            </Formik>
            <div className="registerFormLogin mt-3">Do you already have an account? <span><Link to='/login' style={{ color: '#f57921' }}>Log in</Link></span></div>
            <div className="registerFormLogin my-2">or</div>
            <div className='d-flex justify-content-between'>
              <Link className="registerFormAccount">
                <img src={Google} alt='...' />
                Google
              </Link>
              <Link className="registerFormAccount">
                <img src={Facebook} alt='...' />
                Facebook
              </Link>
            </div>

          </Col>
        </Row>
      </Container >
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { register }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
