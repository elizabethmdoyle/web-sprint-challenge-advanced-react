import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
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
 
  //where is the array coming from to select the active square?
  //if the grid iteself if hard coded, do i need to recode it within my functions or simply use the document.getBy methods in order to access certain elements, like selecting and changing the active square
  //with the current active square being 4, 
 

  getXY = (arr) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    
    //if B is a number 0 - 8, need to find B, and verify which set of numbers it should belong to...?
    //each instance of B will provide a number 0, 1, or 2, and depending on which row of the grid will determine
    // whether it is 0, 1, or 2...
    //xxxxBxxxx would be 5, but would return a 1.....? need to understand coding the logic
    //xxBxxxxxx would be 2
    //must be an index 0-8

    console.log(arr)
    
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
    if(x <= 2 && y <= 2 ) {
      return (x, y)
    } else return 0;

    return (x, y);
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    const coordinates = this.getXY();
    return (`Coordinates ${coordinates}`)
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

    //will need to change the active status square within this function

    //get active square
    const activeSquare = document.getElementsByClassName('active');
    //get buttons
    const left = document.getElementById('left');
    const right = document.getElementById('right'); 
    const down = document.getElementById('down');
    const up = document.getElementById('up');
    
//set up a count...
    var count = initialSteps;

    document.addEventListener(click, () => {
      count++
    })
  
    this.setState({...this.state, setIndexState: this.getNextIndex(evt.target.id) })

    console.log(count)

    console.log(evt.target.id, count)
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
          <h3 id="steps" onClick={this.getXY}>You moved 0 times</h3>
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
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form  >
          <input id="email" name="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
