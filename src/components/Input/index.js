import React, { Component } from 'react'
import './Input.css'
import { Form } from 'react-bootstrap'

export default class index extends Component {
  render () {
    return (
      <div>
        <Form.Label className='labelInput'>{this.props.label}</Form.Label>
        <Form.Control
          type={this.props.type}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          placeholder={this.props.placeholder}
          className='input'
        />
      </div>
    )
  }
}
