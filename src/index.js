import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

  state = {lat: null, errorMessage: ''};

  componentDidMount() {
    console.log('component rendered on screen');
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({lat: position.coords.latitude}),
      (err) => this.setState({errorMessage: err.message})
    );  
  }

  componentDidUpdate() {
    console.log('component re-rendered!')
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage} </div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat}/>
    }

    return <Spinner message='Accept Location Request'/>

  }
  render() {

    return (
      <div className='border red'>
        {this.renderContent()}
      </div>
    );
  
  };


}

ReactDOM.render(<App/>, document.querySelector('#root'));