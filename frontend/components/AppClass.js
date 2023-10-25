import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const state = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps
  
}

const URL = 'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    
  }
 
 

  getXY = (arr) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    
    //if B is a number 0 - 8, need to find B, and verify which set of numbers it should belong to...?
    //each instance of B will provide a number 0, 1, or 2, and depending on which row of the grid will determine
    // whether it is 0, 1, or 2...
    //xxxxBxxxx would be 5, but would return a 1.....? need to understand coding the logic
    //xxBxxxxxx would be 2
    //must be an index 0-8
    
    if (arr.indexOf('B') === 4) {
      return (2, 2)
    }
     if (arr.indexOf('B') === 0 ) {
      return (1, 1)
    }
    if (arr.indexOf('B') === 1 ) {
      return (1, 2)
    }
    if (arr.indexOf('B') === 2 ) {
      return (1, 3)
    }
    if (arr.indexOf('B') === 3 ) {
      return (2, 1)
    }
    if (arr.indexOf('B') === 5 ) {
      return (2, 3)
    }
    if (arr.indexOf('B') === 6 ) {
      return (3, 1)
    }
    if (arr.indexOf('B') === 7 ) {
      return (3, 2)
    }
    if (arr.indexOf('B') === 8 ) {
      return (3, 2)
    } 
    // if(x <= 2 && y <= 2 ) {
    //   return (x, y)
    // } else return 0;

    // return (x, y);
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    getXY();
    return `Coordinates ${x}, ${y}`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    if (direction === 'left') {

    }

    if (direction === 'up') {

    }

    if (direction === 'right') {

    }

    if (direction === 'down') {

    }

  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.


  }

  onChange = (e) => {
    // You will need this to update the value of the input.
    const {value} = e.target;
  this.setState({...this.state, [e.target.name]: value} );
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
   e.preventDefault();
    axios.post(URL)
          .then(res => {
            this.setState({...this.setState, state: {index: res.data.index, steps: res.data.steps, email: res.data.email, message:res.data.message }})
        
          })
          .catch(err => {
            return console.log(`Error: `, err)
          })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinatesz">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form  >
          <input id="email" name="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
