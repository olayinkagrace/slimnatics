const Exercise = require('../models/exerciseModel')

const mongoose = require('mongoose')

const expressAsyncHandler = require("express-async-handler");


const getExercises = expressAsyncHandler(async (req,res) => {
        const exercises = await Exercise.find()
        .sort({createdAt: -1})
        res.status(200).json(exercises)
    }
) 

const getExercise = expressAsyncHandler( async (req,res) => {
    const  {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const exercise = await Exercise.findById(id)
    if(!exercise){
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(exercise)

})

const deleteExercise = expressAsyncHandler(async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const exercise = await Exercise.findOneAndDelete({_id: id})
    if(!exercise){
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(exercise)

}
) 

const updateExercise = expressAsyncHandler(async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const exercise = await Exercise.findOneAndUpdate({_id: id}, {...req.body})
    if(!exercise){
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(exercise)
}
) 

const createExercise = expressAsyncHandler(async (req, res) => {
    const {title, load, reps } = req.body

    // handling error
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
        
    }
    if (!load) {
        emptyFields.push('load')
        
    }
    if (!reps) {
        emptyFields.push('reps')
       
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db

    try{
        const exercise = await Exercise.create({title, load, reps})
        res.status(200).json(exercise)
    
    }
    catch(error){ 
        res.status(400).json({error: error.message})

    }
}
) 

module.exports = {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
}