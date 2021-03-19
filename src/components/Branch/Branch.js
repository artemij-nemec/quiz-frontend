import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { branchActions } from '../../actions/branchActions'
import { API } from '../../api/api'
import Error from '../Common/Error/Error'
import Preloader from '../Common/Preloader/Preloader'
import Result from '../Result/Result'
import MainPageLink from '../ui/MainPageLink'
import './Branch.css'
import Question from './Question'


const Branch = ({ match }) => {
  const branch = useSelector(state => state.currentBranch)
  const answersCollected = useSelector(state => state.answersCollected)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const getBranch = async id => {
      try {
        const data = await API.getBranch(id)
        if (data.success && data.result) {
          dispatch(branchActions.setCurrentBranch(data.result))
        }
        else {
          setError('Quiz not found')
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Unknown Error')
      }
    }

    if (!branch) {
      getBranch(match.params.id)
    }
  }, [match.params.id])

  return (
    <div>
      {error
        ? <Error message={error} />
        : !branch
          ? <Preloader />
          : <div>
            <h2 className='branch-header'>{branch.name}</h2>
            <div className='branch-wrapper'>
              {answersCollected
                ? <Result />
                : <Question questions={branch.Questions} />
              }
            </div>
            <MainPageLink />
          </div>
      }
    </div>
  )
}

export default Branch
