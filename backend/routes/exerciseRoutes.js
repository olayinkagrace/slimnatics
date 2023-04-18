
const express = require('express')
const router = express.Router()

const {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
} = require('../controllers/exerciseController')

// const isAuth = require('../utils')

// // require auth for all workout routes
// router.use(isAuth)



router.get('/', getExercises)

router.get('/:id', getExercise)

router.post('/', createExercise)

router.delete('/:id',deleteExercise)

router.patch('/:id', updateExercise)

module.exports = router