import axios from 'axios'
 
const apiClient = axios.create({
  baseURL: 'http://localhost:621', // CHANGE BACK
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
    const events = apiClient.get('/api/events/today');
    if (events.code === "ERR_BAD_REQUEST") {
      return -1;
    }
    else return events;
  },
  getEvent(id) {
    return apiClient.get(`/api/events/by-id/${id}`);
  },
  getSchool(id) {
    return apiClient.get(`/api/schools/by-id/${id}`);
  },
  getSchools() {
    return apiClient.get(`/api/schools/`);
  },
  newEvent(jsonData) {
    return apiClient.post('/api/events/new-event', jsonData)
  },
  getLeagues() {
    return apiClient.get('/api/leagues')
  },
  newLeague(jsonData) {
    return apiClient.post('/api/leagues/new-league', jsonData)
  },
  getUserPerms(id) {
    return apiClient.get(`/api/users/get-perms/${id}`)
  }
}