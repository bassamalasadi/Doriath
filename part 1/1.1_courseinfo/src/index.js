import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) =>{
    return (
        <div>
        <h1>{props.name}</h1>
        </div>
    )
}
const Part = (props) =>{
    return(
        <div>
        <p>{props.sub} {props.exercises}</p>

        </div>
    )
}
const Content = (props) =>{
    return(
        <>
        
        <Part sub={props.parts[0].name} exercises={props.parts[0].exercises}/>
        <Part sub={props.parts[1].name} exercises={props.parts[1].exercises}/>
        <Part sub={props.parts[2].name} exercises={props.parts[2].exercises}/>
 
        </>
    )
}
const All = (props) => {
    return (
        <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises} 


        </p>
    )
}
const App = () => {
    const Course = {
        name: 'Half Stack application development',
    parts : [
     {  name:'Fundamentals of React',
        exercises: 10
    },
    
    {   name: 'Using props to pass data',
        exercises: 7
    },
    
    {   name: 'State of a component',
        exercises: 14
    }]}
   
  
    return (
      <div>
          <Header name = {Course.name}/>
          <Content parts = {Course.parts}/>
          <All parts = {Course.parts}/>
      </div>
    )
  }
 



ReactDOM.render(<App />, document.getElementById('root'));