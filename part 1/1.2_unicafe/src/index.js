import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 
  const giveToGood = ()=>{
    return setGood(good +1)
  }
  const giveToNeutral = () => {  
      return setNeutral(neutral + 1)
  }
  const giveToBad = () => {
      return  setBad(bad + 1)
  }
  
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>)
    
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handleClick ={giveToGood} />
      <Button text={'neutral'} handleClick ={giveToNeutral} />
      <Button text={'bad'} handleClick ={giveToBad} />

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}
const Statistics =({good,neutral,bad}) => {
    if(good===0&&neutral===0&&bad===0){
        return(
        <div> <p>No feedback</p> </div>
        )
}else{
    return(
        <table>
            <tbody>
                <tr>
                    <td>good</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{good+bad+neutral}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{(-bad+good)/(bad+good+neutral)}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{Math.round((100*good/(good+bad+neutral)))}</td>
                </tr>
            </tbody>
        </table>
    )
    }
}



ReactDOM.render(<App />, document.getElementById('root'));