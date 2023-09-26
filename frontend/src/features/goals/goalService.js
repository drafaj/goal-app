import axios from 'axios'

const API_URL = '/api/goals/'

// Create goal
const create = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.post(API_URL, goalData, config)

    return response.data
}

// Fetch goals
const fetch = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

// Delete goal

const deleteGoal = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.delete(API_URL + id.toString(), config)
    return response.data
}

// Complete goal
const completeGoal = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }

    const response = await axios.put(API_URL + id.toString() + '/complete', {}, config)
    return response.data
}

// Edit goal
const editGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const data = {
        'text': goalData.text
    }

    const response = await axios.put(API_URL + goalData.id.toString(), data, config)
    return response.data
}



const goalService = {create, fetch, deleteGoal, completeGoal, editGoal}
export default goalService