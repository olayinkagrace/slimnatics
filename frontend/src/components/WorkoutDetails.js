import React from 'react'

function WorkoutDetails({workout}) {
  const handleClick = (e) => {
    e.preventDefault()
  }
  return (
    <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>reps: </strong>{workout.reps}</p>
            {/* // before date fns */}
            {/* <p>{workout.createdAt}</p> */}
            <p>{workout.createAt}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
  )
}

export default WorkoutDetails
