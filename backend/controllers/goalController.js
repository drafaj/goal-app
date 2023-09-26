const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    })

    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    
    // Make sure the logged in user is the goal user/owner
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('You do not own the specified goal')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }


    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    
    // Make sure the logged in user is the goal user/owner
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('You do not own the specified goal')
    }

    goal.deleteOne()
    res.status(200).json({ id: req.params.id })
})

// @desc Sets or unsets the completed flag
// @route PUT /api/goals/:id/complete
// @access Private
const completeGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    let updatedGoal

    if(req.user.id !== goal.user.toString()){
        res.status(401)
        throw new Error('You do not own the specified goal')
    }

    updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {completed: !(goal.completed)}, {new:true})

    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    completeGoal
}