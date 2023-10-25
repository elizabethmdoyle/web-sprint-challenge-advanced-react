import React, {useState} from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = `http://localhost:9000/api/result`;

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [messageState, setMessageState] = useState(initialMessage);
  const [emailState, setEmailState] = useState(initialEmail);
  const [stepsState, setStepsState] = useState(initialSteps);
  const [indexState, setIndexState] = useState(initialIndex);


  function getXY(indexState) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    //will take in one parameter, the index of B || an array of xxxxBxxxx
    //base case should show B at index 4 (the center of the grid)
      if (indexState === 4) {
        return (2, 2)
      }
       if (indexState === 0 ) {
        return (1, 1)
      }
      if (indexState === 1 ) {
        return (1, 2)
      }
      if (indexState === 2 ) {
        return (1, 3)
      }
      if (indexState === 3 ) {
        return (2, 1)
      }
      if (indexState === 5 ) {
        return (2, 3)
      }
      if (indexState === 6 ) {
        return (3, 1)
      }
      if (indexState === 7 ) {
        return (3, 2)
      }
      if (indexState === 8 ) {
        return (3, 2)
      } 

    //need 3 if statements, if i = 1-3, coord == 1-3, 
    //if i = 3-5, convert to equal a number 1, 2, or 3
    //if i = 6-8, convert to equal a number 1, 2, or 3


  //  const xIndex =  (x) => {


  //     if(x == 0 || x == 3 || x == 6) {
  //     return 1
  //   } 
  //   if(x == 1 || x == 4 || x == 7) {
  //     return 2
  //   }  if(x == 2 || x == 5 || x == 8) {
  //     return 3
  //   } 
  //   return x
  //  };

  // const yIndex = (y) => {
  //     if(y == 0 || y == 3 || y == 6) {
  //     return 1
  //   } 
  //   if(y == 1 || y == 4 || y == 7) {
  //     return 2
  //   }  if(y == 2 || y == 5 || y == 8) {
  //     return 2
  //   } 
  //   return 3

  //  }

  //  return (xIndex, yIndex)
    // if(index == 0 || index == 3 || index == 6) {
    //   return 0
    // } 
    // if(index == 1 || index == 4 || index == 7) {
    //   return 1
    // }  if(index == 2 || index == 5 || index == 8) {
    //   return 2
    // } 
    //return (x, y)
    
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    const coordinates = this.getXY();
    return (`Coordinates ${coordinates}`)
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
   setMessageState(initialMessage);
   setEmailState(initialEmail);
   setStepsState(initialSteps);
   setIndexState(initialIndex);
  }

  

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

//based on the direction, a pointer must be set to the next index

    // 0 1 2
    // 3 4 5 
    // 6 7 8


    //once you get to 6, 7 and 8, does not have same rules..
    // const left = direction - 1;
    // const up = direction - 3;
    // const right = direction + 1;
    // const down = direction + 3;

    // must get index direction - where is this input from?? (do i need a query selector to have this input
    //) verify the current index and index is a able to me moved to....
    // where am i getting the index from???!!!!

    //if(direction == 'left') {
    //  if (index <= 0) {
    //  return "Cannot move left"
    // } if (index == 3 || index == 6 ) {
      //return "Cannot move left"
    // } else if (index >= 1) {
     // return index - 1
    //}
    //}

     //if(direction == 'right') {
       //  if (index >= 8) {
    //  return "Cannot move right"
    // } if (index == 2 || index == 5 ) {
      //return "Cannot move right"
    // } else if (index <= 0) {
     // return index + 1
    //}
    //}

     //if(direction == 'up') {

    //}

     //if(direction == 'down') {

    //}
    


  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    
    this.setState({...this.state, indexState: this.getNextIndex(evt) })
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const {value} = evt.target;
    return setEmailState({emailState: value}) 

  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    e.preventDefault(); 
    axios.post(URL, 
        {
        "x" : x,
        "y" : y,
        "steps": stepsState,
        "email": emailState
    })
            .then(res => {
             //shape of object to be posted to the /results endpoint
              console.log(res.data)
              
            })
            .catch(err =>  {
                return console.log(err, ':error from onSubmit post request')}
            )

  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
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
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right"onClick={move}>RIGHT</button>
        <button id="down"onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
