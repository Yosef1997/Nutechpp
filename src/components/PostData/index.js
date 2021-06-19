import React, { Component } from 'react'
import './postdata.css'
import ImgIcon from '../../assets/uploadimage.png'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import Input from '../Input'

export default class index extends Component {
  state = {
    isLoading: false,
    message: '',
    isMessage: false,
    selectedFile: false
  }

  dataValidation = (values) => {
    const errors = {}
    const { productName, buyPrice, soldPrice, stock } = values
    if (productName.length < 3) {
      errors.productName = 'First name minimum 3 characters'
    } else if (!productName) {
      errors.productName = 'Product Name required'
    } else if (!/^\d+$/.test(buyPrice)) {
      errors.buyPrice = 'Buy Price should be number'
    } else if (!buyPrice) {
      errors.buyPrice = 'Buy price required'
    } else if (!/^\d+$/.test(soldPrice)) {
      errors.soldPrice = 'Sold price should be number'
    } else if (!soldPrice) {
      errors.soldPrice = 'Sold price required'
    } else if (!/^\d+$/.test(stock)) {
      errors.stock = 'Stock should be number'
    } else if (!stock) {
      errors.stock = 'Stock required'
    }
    return errors
  }


  uploadPicture = async (value) => {
    this.setState({ isLoading: true })
    const FILE_SIZE = 500 * 1024
    const SUPPORTED_FORMATS = [
      'image/jpg',
      'image/jpeg',
      'image/gif',
      'image/png'
    ]
    const { token, user } = this.props.auth
    if (SUPPORTED_FORMATS.indexOf(value.type) === -1) {
      setTimeout(() => {
        this.setState({ isLoading: false, message: 'File not compatibel' })
      }, 2000)
    } else if (FILE_SIZE < value.size) {
      setTimeout(() => {
        this.setState({ isLoading: false, message: 'File to large' })
      }, 2000)
    } else {
      await this.props.updateUser(token, { id: user.id, picture: (value) })
      setTimeout(() => {
        this.setState({ isLoading: false, message: 'Update profile succsefully', selectedFile: true })
      }, 2000)
    }
    setTimeout(() => {
      this.setState({ message: '', selectedFile: false })
    }, 6000)
  }

  deletePicture = async () => {
    this.setState({ isLoading: true })
    const { token } = this.props.auth
    await this.props.deletePicture(token, { id: this.props.auth.user.id })
    setTimeout(() => {
      this.setState({ isLoading: false, message: 'Delete picture profile successfully' })
    }, 2000)
    setTimeout(() => {
      this.setState({ message: '', selectedFile: false })
    }, 5000)
  }

  async postProduct(values) {
    const { token } = this.props.auth
    const { user } = this.props.auth
    this.props.updateUser(token, {
      id: user.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.newPassword
    })
    setTimeout(() => {
      this.setState({ isLoading: false, isMessage: true })
    }, 1000)
    setTimeout(() => {
      this.setState({ isMessage: false })
    }, 5000)
  }

  render() {
    // const { isLoading, message, isMessage, selectedFile } = this.state
    return (
      <Container fluid className='postDataContainer'>
        <Row>
          <Col lg={4} className='postDataForm'>
            <div className='profileCardText1'>Product Image</div>
            <input
              style={{ display: 'none' }}
              type='file'
              onChange={(event) => this.uploadPicture(event.target.files[0])}
              ref={fileInput => this.fileInput = fileInput}
            />
            <div onClick={() => this.fileInput.click()} className='profileCardBtn'>
              {/* {user.picture === null
                ? <img src={Profil} className='profileCardImg' />
                : <img src={`${URL}/upload/profile/${user.picture}`} className='profileCardImg' />
              } */}
              <img src={ImgIcon} alt='...' className='profileCardImg' />
            </div>
            {/* {isLoading
              ? (<div className='d-flex flex-row justify-content-center mt-3'>
                <Spinner animation="grow" size="md" variant="success" />
              </div>
                )
              : (null)}
            {user.picture !== null && !isLoading && message === '' ? <div onClick={this.deletePicture} className='profilCardDeleteBtn'>Delete Picture</div> : <div>Click icon for upload image</div>}
            {message !== '' && selectedFile ? <div className='textSuccess text-center'>{message}</div> : <div className='textError text-center'>{message}</div>} */}
          </Col>
          <Col></Col>
          <Col lg={7} className='postDataForm'>
            <div className='profileCardText1'>Detail Product</div>
            <Formik
              initialValues={{
                productName: '',
                buyPrice: '',
                soldPrice: '',
                stock: '',
              }}
              validate={(values) => this.dataValidation(values)}
              onSubmit={(values, { resetForm }) => {
                this.setState({ isLoading: true })
                this.postProduct(values)
                setTimeout(() => {
                  resetForm()
                }, 500)
              }}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <>
                  <div className='mb-4'>
                    <Input
                      label='Product Name'
                      type='text'
                      value={values.productName}
                      onChange={handleChange('productName')}
                      onBlur={handleBlur('productName')}
                      placeholder='Write your product name' />
                    {errors.productName ? (<div className='textError'>{errors.productName}</div>) : (null)}
                  </div>
                  <div className='mb-4'>
                    <Input
                      label='Purchase Price'
                      type='text'
                      value={values.buyPrice}
                      onChange={handleChange('buyPrice')}
                      onBlur={handleBlur('buyPrice')}
                      placeholder='Write your purchase price' />
                    {errors.buyPrice ? (<div className='textError'>{errors.buyPrice}</div>) : (null)}
                  </div>
                  <div className='mb-4'>
                    <Input
                      label='Sold Price'
                      type='text'
                      value={values.soldPrice}
                      onChange={handleChange('soldPrice')}
                      onBlur={handleBlur('soldPrice')}
                      placeholder='Write your sold price' />
                    {errors.soldPrice ? (<div className='textError'>{errors.soldPrice}</div>) : (null)}
                  </div>
                  <div className='mb-4'>
                    <Input
                      label='Stock'
                      type='text'
                      value={values.stock}
                      onChange={handleChange('stock')}
                      onBlur={handleBlur('stock')}
                      placeholder='Write your stocke' />
                    {errors.stock ? (<div className='textError'>{errors.stock}</div>) : (null)}
                  </div>
                  <div>
                    {/* <Button variant='secondary' disabled className="ProfileInputBtn">Save Product</Button> */}
                    <Button variant='outline-light' onClick={handleSubmit} className="ProfileInputBtn">Save Product</Button>
                  </div>
                </>                
              )}

            </Formik>
          </Col>
        </Row>
      </Container>
    )
  }
}
