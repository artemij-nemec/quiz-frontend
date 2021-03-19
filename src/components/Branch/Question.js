import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { branchActions } from '../../actions/branchActions'
import notFoundImage from '../../assets/not_found.jpg'
import './Question.css'

const Question = ({ questions }) => {
  const questionId = useSelector(state => state.currentQuestionId)
  const answers = useSelector(state => state.answers)
  const question = questions[questionId]
  const selectedAnswerId = answers.find(a => a.questionId === questionId)?.answerId
  const [currentAnswerId, setCurrentAnswerId] = useState(null)
  const dispatch = useDispatch()
  const onAnswerClick = () => {
    const lastIndex = questions.length - 1
    const isAnswerExists = answers.find(a => a.questionId === questionId)
    const answer = {
      questionId,
      answerId: currentAnswerId
    }
    dispatch(isAnswerExists ? branchActions.updateAnswer(answer) : branchActions.addAnswer(answer))
    if (questionId < lastIndex) {
      dispatch(branchActions.setCurrentQuestionId(questionId + 1))
    }
    if (questionId === lastIndex) {
      dispatch(branchActions.setAnswersCollected(true))
    }
    const nextAnswer = answers.find(a => a.questionId === questionId + 1)?.answerId
    setCurrentAnswerId(nextAnswer | null)
  }
  const prevQuestionHandler = () => {
    setCurrentAnswerId(answers.find(a => a.questionId === questionId - 1)?.answerId)
    dispatch(branchActions.setCurrentQuestionId(questionId - 1))
  }

  return (
    <div>
      <h3>{questionId + 1} - {question?.text}</h3>
      <div className='answers-container'>
        {question?.Answers.map(answer => {
          return (
            <div key={answer.id} className='answer'>
              <label>
                <input
                  className='answer-radio'
                  name='answers'
                  type='radio'
                  value={answer.id}
                  onChange={(e) => setCurrentAnswerId(parseInt(e.currentTarget.value))}
                  defaultChecked={answer.id === selectedAnswerId}
                />
                <img
                  className='answer-illustration'
                  src={answer.image || notFoundImage}
                  alt={answer.text}
                />
              </label>
              <span className='answer-wrapper'>{answer.text}</span>
            </div>
          )
        })}
      </div>
      <div className='button-wrapper'>
        {questionId > 0 &&
          <button
            onClick={prevQuestionHandler}
            className='button'
          >Back</button>
        }
        <button
          onClick={onAnswerClick}
          disabled={!currentAnswerId}
          className='button answer-button'
        >Next</button>
      </div>
    </div>
  )
}

export default Question
