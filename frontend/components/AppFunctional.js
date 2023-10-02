import React, {useState} from 'react';


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



  function getXY(x, y) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    //need 3 if statements, if i = 0-2, coord == 0-2, 
    //if i = 3-5, convert to equal a number 0, 1, or 2
    //if i = 6-8, convert to equal a number 0, 1, or 2
   const xIndex =  (x) => {
      if(x == 0 || x == 3 || x == 6) {
      return 0
    } 
    if(x == 1 || x == 4 || x == 7) {
      return 1
    }  if(x == 2 || x == 5 || x == 8) {
      return 2
    } 
    return x
   };

  const yIndex = (y) => {
      if(y == 0 || y == 3 || y == 6) {
      return 0
    } 
    if(y == 1 || y == 4 || y == 7) {
      return 1
    }  if(y == 2 || y == 5 || y == 8) {
      return 2
    } 
    return y

   }

   return (xIndex, yIndex)
    // if(index == 0 || index == 3 || index == 6) {
    //   return 0
    // } 
    // if(index == 1 || index == 4 || index == 7) {
    //   return 1
    // }  if(index == 2 || index == 5 || index == 8) {
    //   return 2
    // } 


    
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

    // const left = direction - 1;
    // const up = direction - 3;
    // const right = direction + 1;
    // const down = direction + 3;
    


  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex()
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const {value} = evt.target;
    return setEmail(value) 

  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
      axios.post(URL)
            .then(res => {
             //shape of object to be posted to the /results endpoint
              // const newMove = {"x": 1,
              //   "y": 1,
              //   "steps": 1,
              //   "email": "string@gmail.com"
              // }
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
