import React, { Component, PropTypes } from 'react'

import { camelize, camelizeKeys, bind } from './lib/utils'

const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

const defaultProps = {
  onChange: () => {}
}

export default class AddressLookup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }

    bind(this, [
      'onInputValueChange',
      'onInputFocus',
      'onPlaceChange',
      'onPosition'
    ])
  }

  componentDidMount () {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.refs.input, {
        types: ['address']
      }
    )
    this.autocomplete.addListener('place_changed', this.onPlaceChange)
  }

  onInputValueChange ({ target }) {
    this.setState({ value: target.value })
  }

  onInputFocus () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPosition)
    }
  }

  onPosition ({ coords }) {
    const circle = new google.maps.Circle({
      radius: coords.accuracy,
      center: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    })
    this.autocomplete.setBounds(circle.getBounds())
  }

  onPlaceChange () {
    const place = this.autocomplete.getPlace()
    const type = ({ types }) => types[0]
    const reducer = (acc, component, i) => ({
      ...acc,
      [camelize(type(component))]: camelizeKeys(component)
    })
    const result = place.address_components.reduce(reducer, {})
    this.setState({ value: place.formatted_address })
    this.props.onChange(result)
  }

  render () {
    return (
      <input type="text"
        ref="input"
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.onInputValueChange}
        onFocus={this.onInputFocus}
        value={this.state.value} />
    )
  }
}

Object.assign(AddressLookup, { propTypes, defaultProps })
