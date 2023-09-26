import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal, completeGoal, editGoal } from '../features/goals/goalSlice'
import {FaTimesCircle, FaPencilAlt} from 'react-icons/fa'
import { BsCheckLg } from "react-icons/bs";

function GoalItem({goal}) {
  const [editText, setEditText] = useState('')
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()

  let cName = 'goal'
  if (goal.completed){
    cName = 'goalcomplete'
  } else{
    cName = 'goal'
  }

  const complete = () => {
    dispatch(completeGoal(goal._id))
  }

  const edit = () => {
    setEditing(!editing)
  }

  const onSubmit = e => {
    e.preventDefault()
    const goalData = {
      id: goal._id,
      text: editText
    }
    dispatch(editGoal(goalData))
    setEditText('')
  }

  let cNameText = 'show'
  let cNameEdit = 'hide'
  if (editing){
    cNameText = 'hide'
    cNameEdit = 'show'
  } else{
    cNameText = 'show'
    cNameEdit = 'hide'
  }

  return (
    <div className={cName}>
        <div>
        {new Date(goal.createdAt).toLocaleString('en-GB')}
        </div>
        <h3 className={cNameText}>{goal.text}</h3>

        <section className = {cNameEdit}>
          <form onSubmit={onSubmit}>
            <div className='form-group2'>
                <input type='text' name='text' 
                id='text' value={editText} 
                onChange={(e)=>setEditText(e.target.value)}/>
            </div>
            <div className='form-group2'>
                <button className='btn btn-block' type='submit'>
                    Edit Goal
                </button>
            </div>
          </form>
        </section>

        <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
          <FaTimesCircle/> 
        </button>
        <button onClick={complete} className='check'>
          <BsCheckLg/> 
        </button>
        <button onClick={edit} className='edit'>
          <FaPencilAlt/> 
        </button>


    </div>
  )
}

export default GoalItem