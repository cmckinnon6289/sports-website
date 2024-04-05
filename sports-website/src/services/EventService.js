import axios from 'axios'
 
const apiClient = axios.create({
  baseURL: 'https://sports-database.onrender.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
 
export default {
  allEvents() {
    return apiClient.get('/api/events/all-events');
  },
  todaysEvents() {
    return apiClient.get('/api/events/today');
  },
  getSchool(id) {
    return apiClient.get(`/api/schools/by-id/${id}`);
  },
  getSchools() {
    return apiClient.get(`/api/schools/`);
  },
  newEvent(jsonData) {
    return apiClient.post('/api/events/new-event', jsonData)
  }
}