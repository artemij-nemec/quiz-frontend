import { branchActionTypes } from "../actions/branchActionTypes"

export const branchActions = {
  setBranchesList: branchesList => ({
    type: branchActionTypes.SET_BRANCHES_LIST,
    payload: branchesList
  }),
  setCurrentBranch: currentBranch => ({
    type: branchActionTypes.SET_CURRENT_BRANCH,
    payload: currentBranch
  }),
  setCurrentQuestionId: currentQuestionId => ({
    type: branchActionTypes.SET_CURRENT_QUESTION_ID,
    payload: currentQuestionId
  }),
  addAnswer: answer => ({
    type: branchActionTypes.ADD_ANSWER,
    payload: answer
  }),
  updateAnswer: answer => ({
    type: branchActionTypes.UPDATE_ANSWER,
    payload: answer
  }),
  setAnswersCollected: answersCollected => ({
    type: branchActionTypes.SET_ANSWERS_COLLECTED,
    payload: answersCollected
  }),
  clearAnswers: () => ({ type: branchActionTypes.CLEAR_ANSWERS })
}
