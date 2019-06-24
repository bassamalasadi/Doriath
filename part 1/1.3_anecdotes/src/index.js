import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [items, setItems] = useState([0,0,0,0,0])
  const selectRandom = () =>{
       setSelected(Math.floor(Math.random()*5))
  }

  const Button = ({text, handleClick}) => {
      return(
          <p><button onClick ={handleClick}>{text}</button></p>
      )
  }

  const voteTo = () => {
    items[selected]+=1
    const newItems = items.map(x=>x)
   return setItems(newItems)
}
  const Statistic = ({items, index}) =>{
  
    return <p>has {items[index]} votes</p>
 }
  
    const TheMost = ({items}) => {
        let gage = 0
        let grand = 0
        for (let i=0;i<5;i++){
            if(items[i]>grand){
                grand = items[i]
                gage = i
            }
        }
        if (grand>0){
            return<p>{anecdotes[gage]} <br></br> has {grand} votes </p>
                
        }else{
            return<p></p>
        }
    }
  return (
    <div>
        <h1> Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <Statistic items = {items} index = {selected}/>
        <Button text = 'next anecdote' handleClick = {selectRandom} />
        <Button text = 'vote anecdote' handleClick = {voteTo} />
        <h1>Anecdote with mosth votes</h1>
        <TheMost items={items} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)