import React, { Component } from 'react'
import './Navbar.css'
import { Navbar as NavbarBrowser, Nav, FormControl, Button } from 'react-bootstrap'
import Brand from '../../assets/nutech.png'
import Search from '../../assets/searchicon.png'
import Overlays from '../Overlays'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../../redux/action/auth'
import { searchMovie } from '../../redux/action/product'

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
    await this.props.searchMovie(token, search)
  }
  render () {
    const { token } = this.props.auth
    console.log(this.state.search)
    return (
      <NavbarBrowser collapseOnSelect expand="lg" bg="white" variant="light" className="containerNavbar">
        <NavbarBrowser.Brand><Link to="/"><img src={Brand} alt="..." /></Link></NavbarBrowser.Brand>
        <NavbarBrowser.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarBrowser.Collapse id="responsive-navbar-nav">
          <Nav className="p-2 mr-auto">
            <div className="search-mobile">
              <FormControl type="text" placeholder="Search" className="input-search-mobile sm-2" />
              <Button type="submit" className="btn-search"><img src={Search} alt=".." /></Button>{' '}
            </div>
            <Nav.Link href="#nowShowing" className="navlink">Home</Nav.Link>
            <Nav.Link href="#Cinemas" className="navlink">Input</Nav.Link>
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
              <Button type="submit" onClick={this.handleSearch} className="btn-search"><img src={Search} alt=".." /></Button>{' '}
            </div>
            {token
              ? (
                <Overlays />
                )
              : (<Link to="/register"><Button type="submit" className="btn-signup ml-2 p-2">Sign up</Button>{' '}</Link>
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
const mapDispatchToProps = { signout, searchMovie }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
