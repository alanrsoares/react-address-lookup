import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import AddressLookup from '../index'


const LocationItem = ({ locationKey, value }) => (
  <div className="location-item">
    <span className="location-key">{locationKey}</span>
    <span className="location-value">
    { value.shortName }
    </span>
  </div>
)

const Location = ({ location }) => (
  <div className="location-container">
    {Object.keys(location).map(
      (k, i) => (
        <LocationItem key={i} locationKey={k} value={location[k]} />
      )
    )}
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {}
    }
    this.onAddressChange = this.onAddressChange.bind(this)
  }

  onAddressChange (location) {
    console.log(location)
    this.setState({ location })
  }

  render () {
    return (
      <div className="lookup-container">
        <AddressLookup
          className="lookup"
          onChange={this.onAddressChange}
          placeholder="Enter a location"/>
        <Location location={this.state.location} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#content'))
