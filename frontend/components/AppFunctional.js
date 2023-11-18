import React, {useState} from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const errMessage = ''

const URL = `http://localhost:9000/api/result`;

export default function AppFunctional({className}) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [message, setMessageState] = useState(initialMessage);
  const [email, setEmailState] = useState(initialEmail);
  const [steps, setStepsState] = useState(initialSteps);
  const [index, setIndexState] = useState(initialIndex);
  const [errorMessage, setErrorMessage] = useState(errMessage)


  const getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    //will take in one parameter, the index of B || an array of xxxxBxxxx
    //base case should show B at index 4 (the center of the grid)

    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };

      // if (indexState === 4) {
      //   return (2, 2)
      // }
      //  if (indexState === 0 ) {
      //   return (1, 1)
      // }
      // if (indexState === 1 ) {
      //   return (1, 2)
      // }
      // if (indexState === 2 ) {
      //   return (1, 3)
      // }
      // if (indexState === 3 ) {
      //   return (2, 1)
      // }
      // if (indexState === 5 ) {
      //   return (2, 3)
      // }
      // if (indexState === 6 ) {
      //   return (3, 1)
      // }
      // if (indexState === 7 ) {
      //   return (3, 2)
      // }
      // if (indexState === 8 ) {
      //   return (3, 2)
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

  const getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    const { x, y } = getXY();
    return `(${x}, ${y})`;
  }

  const reset = () => {
    // Use this helper to reset all states to their initial values.
   setMessageState(initialMessage);
   setEmailState(initialEmail);
   setStepsState(initialSteps);
   setIndexState(initialIndex);
   setErrorMessage(errMessage);
   console.log(reset)
  }



  const getNextIndex =  (direction) => {
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
    
    let nextIndex = index;

    switch (direction) {
      case 'left':
        if (index % 3 !== 0) {
          nextIndex = index - 1;
        }
        break;
      case 'up':
        if (index > 2) {
          nextIndex = index - 3;
        }
        break;
      case 'right':
        if (index % 3 !== 2) {
          nextIndex = index + 1;
        }
        break;
      case 'down':
        if (index < 6) {
          nextIndex = index + 3;
        }
        break;
      default:
        break;
    }

    return nextIndex;

  }

  const move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    //need to set the move to the id of the selected button

    //setting it to the target id will set the direction in the this.getNextIndex
    //and once the state is set, the active square and color need to change to the next index
    // or remain at the same one listed, which should be handled in that function
    //the moves need to be counted and listed to the screen or the console??
    
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction)
    let cantGoMessage = ''

    if (nextIndex !== index) {
      setIndex(nextIndex)
      setSteps(steps + 1)
    } else {
      switch (direction) {
        case 'left':
          cantGoMessage = "You can't go left";
          break;
        case 'up':
          cantGoMessage = "You can't go up";
          break;
        case 'right':
          cantGoMessage = "You can't go right";
          break;
        case 'down':
          cantGoMessage = "You can't go down";
          break;
        default:
          break;
      }
      setMessage( cantGoMessage)
    

//setIndexState(this.getNextIndex(evt.target.id))
    // console.log(evt)
    //  console.log(evt.target.id)

    //  let count = 0;
    //  for (let i = 0; i > evt.target.id; i++) {
    //     return count++
    //     console.log(`You moved ${count} times`)
    //  }
  }

  const onChange = (evt) => {
    // You will need this to update the value of the input.
    const { id, value } = evt.target;
    if (id === 'email') {
      setEmail(value);
    }

  }

  const onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    //the steps are going to come from the moves..??
    evt.preventDefault();
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;

    const payload = {
      x: x,
      y: y,
      steps: steps,
      email: email,
    }

    axios.post('http://localhost:9000/api/result', payload)
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(err => {
        setMessage(err.response.data.message);
// err.response.data.message
      })

      setEmail(initialEmail)
  
    }
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates ${getXYMessage()}`}</h3>
        <h3 id="steps">You moved {steps} {steps !== 1 ? 'times' : 'time'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{errorMessage}</h3>
      </div>
      <div id="keypad">
      <button onClick={() => move('left')} id="left">
          LEFT
        </button>
        <button onClick={() => move('up')} id="up">
          UP
        </button>
        <button onClick={() => move('right')} id="right">
          RIGHT
        </button>
        <button onClick={() => move('down')} id="down">
          DOWN
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit" value="Submit"></input>
      </form>
    </div>
  )
      
      }