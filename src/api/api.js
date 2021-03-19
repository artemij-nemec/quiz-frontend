import Axios from "axios"

const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_SERVER_ADDRESS
})

export const API = {
  async getBranches() {
    const response = await axiosInstance.get(`/branches`)
    return response.data
  },
  async getBranch(id) {
    const response = await axiosInstance.get(`/branch/${id}`)
    return response.data
  },
  async getResults(answers) {
    const response = await axiosInstance.post(`/results`, { answers })
    return response.data
  }
}
