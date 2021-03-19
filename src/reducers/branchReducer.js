import { branchActionTypes } from "../actions/branchActionTypes"

let initialState = {
  branchesList: [],
  currentBranch: null,
  currentQuestionId: 0,
  answers: [],
  answersCollected: false
}

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case branchActionTypes.SET_BRANCHES_LIST:
      return {
        ...state,
        branchesList: action.payload
      }
    case branchActionTypes.SET_CURRENT_BRANCH:
      return {
        ...state,
        currentBranch: action.payload
      }
    case branchActionTypes.SET_CURRENT_QUESTION_ID:
      return {
        ...state,
        currentQuestionId: action.payload
      }
    case branchActionTypes.ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload]
      }
    case branchActionTypes.UPDATE_ANSWER:
      return {
        ...state,
        answers: state.answers.map(a => {
          if (a.questionId === action.payload.questionId) {
            a.answerId = action.payload.answerId
          }
          return a
        })
      }
    case branchActionTypes.CLEAR_ANSWERS:
      return {
        ...state,
        answers: []
      }
    case branchActionTypes.SET_ANSWERS_COLLECTED:
      return {
        ...state,
        answersCollected: action.payload
      }
    default:
      return state
  }
}

export default branchReducer
