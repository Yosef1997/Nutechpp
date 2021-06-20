import React, { Component } from 'react'
import './search.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getProduct, detailProduct, newLink } from '../../redux/action/product'
import { withRouter } from 'react-router'
import http from '../helper/http'

const { REACT_APP_API_URL: URL } = process.env

class index extends Component {
  state = {
    orderBy: true,
  }

  async componentDidMount() {
    await this.props.getProduct()
    this.setState({product: this.props.product.allProduct})
  }

  handleOrderBy = async () => {
    this.setState({ orderBy: !this.state.orderBy })
    const { token } = this.props.auth
    const { orderBy } = this.state
    await this.props.getProduct(token, '', 'productName', `${orderBy ? 'DESC' : 'ASC'}`)
    this.setState({ product: this.props.product.allProduct })
  }

  handleProduct = async (id) => {
    const { token } = this.props.auth
    await this.props.detailProduct(token, id)
    this.props.history.push('/detail')
  }

  handleViewMore = async () => {
    const { pageInfoProduct } = this.props.product
    const newData = await http().get(pageInfoProduct)
    await this.props.newLink(newData.data.pageInfo.nextLink)
    this.setState({ product: [...this.state.product, ...newData.data.results] })
  }

  render() {
    const { orderBy } = this.state
    const { allProduct, pageInfoProduct } = this.props.product
    return (
      <Container fluid className='viewAll'>
        <Row>
          <Col>
            <div className='viewAllSort'>
              <div className='viewAllSortBy'>Sort by</div>
              <div className='d-flex justify-content-end w-50'>
                <Button variant="secondary">Name</Button>
                <Button onClick={this.handleOrderBy} className="viewAllSortBtn">
                  {orderBy
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                      <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                      <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                      <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                      <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                    </svg>
                  }
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {allProduct === null || allProduct.length < 1 ?
            <>
              <Col>
                <div className='homeError'>There isn't product yet!</div>
              </Col>
            </>
            :
            <>
              {allProduct.map((item) => {
                return (
                  <>
                    <Col key={item.productName} lg={3} className='mt-5 mx-0'>
                      <div className="viewAll-card">
                        <img src={`${URL}/upload/product/${item.picture}`} alt='...' className="viewAll-img" />
                        <div className="viewAllCardTitle">{item.productName}</div>
                        <div className="viewAllCardDetail">
                          <div className="viewAllCardGenre">Purchase Price</div>
                          <div className="viewAllCardTitle my-2">{`Rp ${item.buyPrice}`}</div>
                        </div>
                        <div className="viewAllCardDetail">
                          <div className="viewAllCardGenre">Sold Price</div>
                          <div className="viewAllCardTitle my-2">{`Rp ${item.soldPrice}`}</div>
                        </div>
                        <div className="viewAllCardDetail">
                          <div className="viewAllCardGenre">Stock</div>
                          <div className="viewAllCardTitle my-2">{item.stock}</div>
                        </div>
                        <div onClick={() => this.handleProduct(item.id)} className="viewAllCardBtn mt-3">Details</div>
                      </div>
                    </Col>
                  </>
                )
              })}
            </>
          }
        </Row>
        <Row>
          <Col>
            {pageInfoProduct !== null
              ? <div onClick={this.handleViewMore} className='viewMore'>View More</div>
              : null}
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

const mapDispatchToProps = { getProduct, detailProduct, newLink }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
