import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// Create goal
export const create = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.create(goalData, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all goals
export const fetch = createAsyncThunk('goals/fetchAll', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.fetch(token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete goal
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Complete goal
export const completeGoal = createAsyncThunk('goals/complete', async (id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.completeGoal(id, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const editGoal = createAsyncThunk('goals/edit', async (goalData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalService.editGoal(goalData, token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(create.pending, (state) => {
            state.isLoading = true
        })
        .addCase(create.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(create.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(fetch.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(fetch.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetch.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(completeGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(completeGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(completeGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(editGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(editGoal.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(editGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer