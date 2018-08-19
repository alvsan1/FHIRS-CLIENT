import React from 'react'
import PropTypes from 'prop-types'
import { Label, Button } from 'react-bootstrap';
import { textRequest} from '../actions'

const Text = ({ text , dispatch }) => {
  let input
  return (
    <div style={{position:'absolute', margin: 15}}>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(textRequest(input.value))
          input.value = ''

        }}
      >
        <input
          ref={node => {
            input = node
          }}
        /> 
        <p></p>       
        <Button className="pull-right" bsStyle="primary" type="submit" style={{color:"black"}}>
          Add Text
        </Button>
      </form>
      <h1><Label>{text}</Label></h1>
    </div>
  )
}

Text.propTypes = {
  text: PropTypes.string.isRequired
}


export default Text
