import React, {useState, useEffect} from 'react'
import personService from './services/persons'
import Notification from './services/Notification'
import './app.css'

const App = () => {
  
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState ('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
 
  useEffect(()=>{
    personService.getAll()
    .then(result=>{
      setPersons(result) 
    })  
  },[])
  
  const addUser = (event) => {
    event.preventDefault()
    const userObject = { name: newName, number:newNumber, }
    const exists = persons.find(n=>n.name===newName)
    const changed = { ...exists, number: newNumber }
    //console.log('exists', exists)
    //console.log('changed', changed)
    if(exists===undefined){
      personService
        .create( userObject)
        .then(result => {
          setPersons(persons.concat(result))
          setNotification({
            content: `${userObject.name} successfully Created`,
            type: 'notification'
        })
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        
    }else{
      window.confirm(`${newName}is already added to phonebook, replace the old number with a new one?`)
        ? personService
          .update(exists.id,changed)
          .then(response => {
            setPersons(persons.map(person => person.id !== exists.id ? person : response))  
            setNotification({
              content: `${userObject.name} Successfully Updated`,
              type: 'notification'
            })
            setNewName('')  
            setNewNumber('')
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification({
                content: `information of ${userObject.name} has already been removed from server`,
                type: 'error'
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        })
        :console.log('Cancle')       
    }}
  
  const remove = person => {
    window.confirm(`Delete ${person.name}?`)
      ? personService
          .remove(person.id)
          .then(response => {
            setPersons(persons.filter(p => person.id !== p.id)) 
            setNotification({
              content:` Successfully Remove`,
              type: 'notification'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification({
                content: `information of ${person.name} has already been removed from server`,
                type: 'error'
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
          })         
      : console.log('cancle')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)}

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)}

  const handleFilter = (event) =>{
    setFilter(event.target.value)}
  
  const rows = () => personsFiltered.map(u => <Person  key={u.name}user={u}  remove={()=>remove(u)}/> )

  const personsFiltered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <ul>
      <FilterForm filter ={filter} handleFilter ={handleFilter} text='Filter shown with'/>
      </ul>
      <h1>Add a new</h1>
      <PersonForm  name ={newName} handlePersonChange={handlePersonChange} number = {newNumber}
       handleNumberChange ={handleNumberChange} addUser ={addUser}/>
      <h1>Numbers</h1>
      {rows()}
    </div>
  )}

  const Person = ({ user,remove }) => {
    return (  
      <div>
        <br />
          <li className='person'>
            {user.name}:
            {user.number}
            <button type="button" onClick={remove}>remove</button>
          </li>
      </div>
    )
  }

  const PersonForm  = ({name,handlePersonChange,number,handleNumberChange,addUser})=>{
    return(
      <form  onSubmit={addUser}>
        <div>
          name: <input  value ={name} onChange ={handlePersonChange}/><br></br>
          number: <input  value={number} onChange={handleNumberChange}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form>
    )
  }

  const FilterForm=({filter,handleFilter,text})=>{
    return(
      <form>
        {text} <input value={filter} onChange ={handleFilter}/>
      </form>
    )
  }  
 
export default App 