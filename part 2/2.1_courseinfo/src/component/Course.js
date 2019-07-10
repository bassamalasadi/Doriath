import React from 'react'

const Course = ({courses}) => courses.map(course => (<Part key={course.id} course = {course} /> ))
        
    
    
    
const Part = ({course}) => {
    return(
        <div>
        <h1>{course.name}</h1>
        {course.parts.map(parts => <p key = {parts.id}>{parts.name} {parts.exercises} </p>)}
        <h3>Total of {course.parts.reduce((sum, {exercises}) => sum + exercises, 0 )} exercises</h3>
        </div>
    )
}




export default Course
