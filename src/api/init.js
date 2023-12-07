import axios from 'axios'

const baseURL = "http://192.168.29.67:4000"

// Create an axios instance
const api = axios.create({
  baseURL
})


export default api
