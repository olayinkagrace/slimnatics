import React, { useEffect} from 'react'
import WorkoutForm from '../components/WorkoutForm'
import WorkoutDetails from '../components/WorkoutDetails'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import {useAuthContext} from '../hooks/useAuthContext'



function Home() {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
 
 useEffect(() => {
     const fetchWorkout = async () => {
      
         const response = await fetch('http://localhost:4000/api/workouts', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
         })
         const json = await response.json()
 
         if (response.ok) {
             dispatch({
                 type: 'SET_WORKOUTS',
                 payload:json
             })
         }
     }
     if(user){
        fetchWorkout() 
     }
        
    //  fetchWorkout() 
 }, [dispatch, user])

 
     return(
         <div className="home">
             <div className="workouts">
                 {workouts && workouts.map((workout) => {
                     return(
                         <WorkoutDetails key={workout._id} workout={workout} />
                     )
                 })}
             </div>
             <WorkoutForm />
         </div>
     )
}

export default Home
