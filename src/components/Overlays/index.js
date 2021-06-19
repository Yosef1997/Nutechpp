/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef } from 'react'
import { Popover, Overlay } from 'react-bootstrap'
import ProfileIcon from '../../assets/profile.png'
import './Overlays.css'
import { withRouter, useHistory } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux'
import { signout } from '../../redux/action/auth'


function index () {
  const history = useHistory()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  const handleLogOut = () => {
    dispatch(signout())
    history.push('/')
  }
  return (
    <div ref={ref}>
      <div onClick={handleClick} className='navbarImgBtn'>
        <img src={ProfileIcon} alt='...' className='navbarImg' />
      </div>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title className="overlaysProfileBtn">Profile</Popover.Title>
          <Popover.Title onClick={handleLogOut} className="overlaysBtn">Sign out</Popover.Title>
        </Popover>
      </Overlay>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { signout }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
