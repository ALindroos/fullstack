import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
}
  
const Total = ({ parts }) => {
    const total = parts.reduce( (s, p) => s + p.exercises, 0)
  
    return (
      <p>
        <b>Total of {total} exercises</b>
      </p>
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    )
}
  
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
  
const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course