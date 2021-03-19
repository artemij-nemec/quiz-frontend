import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { branchActions } from '../../actions/branchActions'
import { API } from '../../api/api'
import Preloader from '../Common/Preloader/Preloader'
import defaultImage from '../../assets/default_image.png'
import notFoundImage from '../../assets/not_found.jpg'
import './BranchesList.css'
import Error from '../Common/Error/Error'

const BranchesList = () => {
  const branches = useSelector(state => state.branchesList)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const getBranches = async () => {
      try {
        const data = await API.getBranches()
        if (data.success && data.result) {
          dispatch(branchActions.setBranchesList(data.result))
        }
        else {
          setError('Something went wrong')
        }
      } catch (error) {
        setError('Something went wrong')
      }
    }

    if (branches?.length <= 0) {
      getBranches()
    }
  }, [])

  useEffect(() => {
    //clear state
    dispatch(branchActions.setCurrentQuestionId(0))
    dispatch(branchActions.setAnswersCollected(false))
    dispatch(branchActions.setCurrentBranch(null))
    dispatch(branchActions.clearAnswers())
  })
  let branchesList = branches.map(b => {
    return (
      <NavLink className='branch-item'
        to={`/branch/${b.id}`}
        key={b.id}
      >
        <img
          src={b.image || notFoundImage}
          alt={b.name}
        />
        <div>{b.name}</div>
      </NavLink>
    )
  })
  branchesList.push(<NavLink
    key='default'
    className='branch-item'
    to='/default-branch'
  >
    <img
      src={defaultImage}
      alt='Can not choose'
    />
    <div>Can not choose</div>
  </NavLink>)

  return (
    error
      ? <Error message={error} showLink={false} />
      : branches.length <= 0
        ? <Preloader />
        : <div className='branches-list-wrapper'>
          {branchesList}
        </div>
  )
}

export default BranchesList
