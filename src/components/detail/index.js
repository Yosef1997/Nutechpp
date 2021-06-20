import React, { Component } from 'react'
import './detail.css'
import ImgIcon from '../../assets/uploadimage.png'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { Formik } from 'formik'
import Input from '../Input'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProduct, editProduct, deleteProduct } from '../../redux/action/product'

const { REACT_APP_API_URL: URL } = process.env


class index extends Component {
  state = {
    isLoading: false,
    message: '',
    isMessage: false,
    selectedFile: false,
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
    const FILE_SIZE = 100 * 1024
    const SUPPORTED_FORMATS = [
      'image/jpg',
      'image/png'
    ]
    const { token } = this.props.auth
    const {id} = this.props.product.detail
    if (SUPPORTED_FORMATS.indexOf(value.type) === -1) {
      setTimeout(() => {
        this.setState({ isLoading: false, message: 'File not compatibel' })
      }, 2000)
    } else if (FILE_SIZE < value.size) {
      setTimeout(() => {
        this.setState({ isLoading: false, message: 'File to large' })
      }, 2000)
    } else {
      await this.props.editProduct(token, id, { picture: (value) })
      setTimeout(() => {
        this.setState({ isLoading: false, message: 'Update image success', selectedFile: true })
      }, 2000)
    }
    setTimeout(() => {
      this.setState({ message: '', selectedFile: false })
    }, 6000)
  }

  async updateProduct(values) {
    const { token } = this.props.auth
    const {id} = this.props.product.detail
    this.props.editProduct(token, id, {
      productName: values.productName,
      buyPrice: values.buyPrice,
      soldPrice: values.soldPrice,
      stock: values.stock,
    })
    setTimeout(() => {
      this.setState({ isLoading: false, isMessage: true })
    }, 1000)
    setTimeout(() => {
      this.setState({ isMessage: false })
    }, 5000)
    this.props.history.push('/')
  }

  deleteProduct = async () => {
    this.setState({ isLoading: true })
    const { token } = this.props.auth
    await this.props.deleteProduct(token, this.props.product.detail.id)
    console.log(this.props.product.detail.id)
    setTimeout(() => {
      this.setState({ isLoading: false, message: 'Delete product success' })
    }, 2000)
    setTimeout(() => {
      this.setState({ message: '', selectedFile: false })
    }, 5000)
    this.props.history.push('/')
  }

  render() {
    const { isLoading, message, selectedFile } = this.state
    const { detail } = this.props.product
    
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
              {detail.picture === null
                ? <img src={ImgIcon} alt='..' className='profileCardImg' />
                : <img src={`${URL}/upload/product/${detail.picture}`} alt='...' className='profileCardImg' />
              }
            </div>
            {isLoading
              ? (<div className='d-flex flex-row justify-content-center mt-3'>
                <Spinner animation="grow" size="md" variant="success" />
              </div>
                )
              : (null)}
            {detail.picture !== null || !isLoading || message === '' ? <div className='profilCardDeleteBtn'>Click icon for edit picture</div> : <div>Click icon for upload image</div>}
            {message !== '' && selectedFile ? <div className='textSuccess text-center'>{message}</div> : <div className='textError text-center'>{message}</div>}
          </Col>
          <Col></Col>
          <Col lg={7} className='postDataForm'>
            <div className='profileCardText1'>Detail Product</div>
            <Formik
              initialValues={{
                productName: detail.productName,
                buyPrice: detail.buyPrice,
                soldPrice: detail.soldPrice,
                stock: detail.stock,
              }}
              validate={(values) => this.dataValidation(values)}
              onSubmit={(values, { resetForm }) => {
                this.setState({ isLoading: true })
                this.updateProduct(values)
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
                  <div className='d-flex justify-content-between'>
                    <Button variant='outline-light' onClick={handleSubmit} className="ProfileInputBtn">Save Product</Button>
                    <Button variant='outline-light' onClick={this.deleteProduct} className="ProfileDeleteBtn">Delete Product</Button>
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
const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product
})
const mapDispatchToProps = { createProduct, editProduct, deleteProduct }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))