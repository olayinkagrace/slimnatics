import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function WorkoutDetails({workout}) {


  const { dispatch } = useWorkoutsContext()
  const handleClick = async(e) => {
    e.preventDefault()
    
    const response = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
        dispatch({
            type: 'DELETE_WORKOUT', payload: json
        })
    }
}
  return (
    <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>reps: </strong>{workout.reps}</p>
            {/* // before date fns */}
            {/* <p>{workout.createdAt}</p> */}
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
  )
}

export default WorkoutDetails
