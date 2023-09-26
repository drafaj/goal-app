const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal, completeGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getGoals)

router.post('/', protect, setGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

router.put('/:id/complete', protect, completeGoal)

module.exports = router