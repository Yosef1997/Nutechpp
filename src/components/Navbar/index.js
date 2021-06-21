import React, { Component } from 'react'
import './navbar.css'
import { Navbar as NavbarBrowser, Nav, FormControl, Button } from 'react-bootstrap'
import Brand from '../../assets/nutech.png'
import Search from '../../assets/searchicon.png'
import Overlays from '../Overlays'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../../redux/action/auth'
import { getProduct } from '../../redux/action/product'

class Navbar extends Component {
  state = {
    search: ''
  }
  handleLogOut = () => {
    this.props.signout()
    this.props.history.push('/')
  }
  handleSearch = async () => {
    const { token } = this.props.auth
    const { search } = this.state
    await this.props.getProduct(token, search)
    console.log(this.state.search)
    this.props.history.push('/search')
  }
  render() {
    const { token } = this.props.auth
    return (
      <NavbarBrowser collapseOnSelect expand="lg" bg="white" variant="light" sticky="top" className="containerNavbar">
        <NavbarBrowser.Brand><Link to="/"><img src={Brand} alt="..." className='navbarLogo' /></Link></NavbarBrowser.Brand>
        <NavbarBrowser.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarBrowser.Collapse id="responsive-navbar-nav">
          <Nav className="ml-5">
            <div className="search-mobile">
              <FormControl
                type="text"
                onChange={(event) => this.setState({ search: event.target.value })}
                placeholder="Search"
                className="input-search-mobile sm-2" />
              <Button
                variant="outline-light"
                type="submit"
                onClick={this.handleSearch}
                className="btn-search">
                <img src={Search} alt=".." />                
              </Button>
            </div>
            <Link to="/" className='navlink'>Home</Link>
            <Link to="/product" className='navlink'>Input</Link>
            {token
              ? (
                <>
                  <Link to="/profile" className="btn-signup-mobile">Profile</Link>
                  <div onClick={this.handleLogOut} className="btn-signup-mobile">Sign out</div>
                </>
              )
              : (<Link to="/register" className="btn-signup-mobile">Sign up</Link>
              )}
            <p className="nav-mobile">© 2021 Nutech. All Rights Reserved.</p>
          </Nav>
          <Nav className="nav-web">
            <div className="search-web">
              <FormControl
                type="text"
                placeholder="Search"
                onChange={(event) => this.setState({ search: event.target.value })}
                className="input-search-mobile sm-2"
              />
              <Button variant="outline-light" type="submit" onClick={this.handleSearch} className="btn-search"><img src={Search} alt=".." /></Button>{' '}
            </div>
            {token
              ? (
                <Overlays />
              )
              : (<Link to="/register"><Button type="submit" className="btn-signup ml-4 p-2">Sign up</Button></Link>
              )
            }
          </Nav>
        </NavbarBrowser.Collapse>
      </NavbarBrowser>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = { signout, getProduct }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
