import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const errMessage = ''

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  errorMessage: errMessage
  
}

const URL = 'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = initialState
    
  }
 
  //where is the array coming from to select the active square?
  //if the grid iteself if hard coded, do i need to recode it within my functions or simply use the document.getBy methods in order to access certain elements, like selecting and changing the active square
  //with the current active square being 4, 
 

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    
    //if B is a number 0 - 8, need to find B, and verify which set of numbers it should belong to...?
    //each instance of B will provide a number 0, 1, or 2, and depending on which row of the grid will determine
    // whether it is 0, 1, or 2...
    //xxxxBxxxx would be 5, but would return a 1.....? need to understand coding the logic
    //xxBxxxxxx would be 2
    //must be an index 0-8

    const x = (this.state.index % 3) + 1;
    const y = Math.floor(this.state.index / 3) + 1;
    return {x,y};
    
      // if (this.state.index === 0) return 'Coordinates (1,1)';
      // if (this.state.index === 1) return 'Coordinates (2,1)';
      // if (this.state.index === 2) return 'Coordinates (3,1)';
      // if (this.state.index === 3) return 'Coordinates (1,2)';
      // if (this.state.index === 4) return 'Coordinates (2,2)';
      // if (this.state.index === 5) return 'Coordinates (3,2)';
      // if (this.state.index === 6) return 'Coordinates (1,3)';
      // if (this.state.index === 7) return 'Coordinates (2,3)';
      // if (this.state.index === 8) return 'Coordinates (3,3)';
    }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    const {x, y} = this.getXY();
    return (`Coordinates ${x}, ${y}`)
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.

    //need to also change the text to "You moved 0 times"
    this.setState(initialState);
    let resetMoves = document.getElementById('steps');
    resetMoves = `You moved ${initialSteps} times`
    console.log(resetMoves)
    console.log('reset')
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.


    let { index } = this.state;
    
      switch (direction) {
        case 'left':
          return index % 3 !== 0 ? index - 1 : index;
        case 'up':
          return index >= 3 ? index - 3 : index;
        case 'right':
          return index % 3 !== 2 ? index + 1 : index;
        case 'down':
          return index < 6 ? index + 3 : index;
        default:
          return index;
      }

  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    //will need to change the active status square within this function

    //get active square
    // const activeSquare = document.getElementsByClassName('active');
    //get buttons
    // const left = document.getElementById('left');
    // const right = document.getElementById('right'); 
    // const down = document.getElementById('down');
    // const up = document.getElementById('up');

    const direction = evt.target.id
    const newDirection = this.getNextIndex(direction, this.state.index)

    let errorMessage = ''
    
  
    if (newDirection !== this.state.index) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        index: newDirection,
        errorMessage, 
      });
    } else {
      
      switch (direction) {
        case 'left':
          errorMessage = "You can't go left";
          break;
        case 'right':
          errorMessage = "You can't go right";
          break;
        case 'up':
          errorMessage = "You can't go up";
          break;
        case 'down':
          errorMessage = "You can't go down";
          break;
        default:
          errorMessage = 'Invalid move';
      }
      this.setState({ ...this.state, errorMessage });
    }

  }

  onChange = (e) => {
    // You will need this to update the value of the input.
    const {id, value} = e.target;
  this.setState({...this.state, [id]: value} );
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
   evt.preventDefault();
   const {x, y} = this.getXY();

    axios.post(URL, {...this.state, x, y})
          .then((res) => {
            this.setState({...this.setState, email: initialEmail, message: res.data.message })
console.log(res.data.message);
  })
          .catch(err => {
            return console.log(`Error: `, err)
          })
  }

  render() {
    const {errorMessage} = this.state
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{` ${this.getXYMessage()}`}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps ==! 1 ? 'time' : 'times'} </h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{errorMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit} >
          <input id="email" name="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
