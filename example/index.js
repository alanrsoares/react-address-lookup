import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import AddressLookup from '../AddressLookup'

const splitCapitals = s => s.replace(/\w/g, x => x === x.toUpperCase() ? ` ${x.toLowerCase()}` : x)

const LocationItem = ({ locationKey, value }) => (
  <div className="location-item">
    <span className="location-key">
      { splitCapitals(locationKey) }
    </span>
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
      location: {},
      value: '125 St Georges Bay Rd'
    }
    this.onAddressChange = this.onAddressChange.bind(this)
  }

  onAddressChange (location) {
    this.setState({ location })
  }

  render () {
    return (
      <div className="lookup-container">
        <AddressLookup
          className="lookup-field"
          placeholder="Enter a location"
          onChange={this.onAddressChange}
          value={this.state.value} />
        <Location location={this.state.location} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#content'))
